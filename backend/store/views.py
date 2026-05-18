from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import stripe
from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests

from .models import Category, Product, Profile, Address, DeliveryConfig, Order, OrderItem
from .serializers import (
    CategorySerializer, ProductSerializer, ProfileSerializer, 
    AddressSerializer, DeliveryConfigSerializer, OrderSerializer, UserSerializer
)

stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', 'sk_test_placeholder')

# -------------------------------------------------------------
# PRODUCTS & CATEGORIES
# -------------------------------------------------------------
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category__slug', 'category', 'in_offer']
    search_fields = ['name', 'description']
    ordering_fields = ['order', 'selling_price', 'rating', 'id']

# -------------------------------------------------------------
# AUTHENTICATION
# -------------------------------------------------------------
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    name = request.data.get('name', '')
    
    if not username or not email or not password:
        return Response({'error': 'Please provide username, email and password'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
    user = User.objects.create_user(username=username, email=email, password=password, first_name=name)
    Profile.objects.create(user=user)
    
    tokens = get_tokens_for_user(user)
    return Response({'tokens': tokens, 'user': UserSerializer(user).data})

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({'error': 'Please provide email and password'}, status=status.HTTP_400_BAD_REQUEST)
        
    try:
        user = User.objects.get(email=email)
        user = authenticate(username=user.username, password=password)
    except User.DoesNotExist:
        user = None
        
    if user is not None:
        tokens = get_tokens_for_user(user)
        return Response({'tokens': tokens, 'user': UserSerializer(user).data})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

from django.utils.crypto import get_random_string

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def google_auth(request):
    token = request.data.get('token')

    if not token:
        return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # ✅ VERIFY TOKEN WITH CLIENT ID (IMPORTANT)
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )

        email = idinfo['email']
        name = idinfo.get('name', '')

        # ✅ safer than try/except
        user = User.objects.filter(email=email).first()

        if not user:
            username = email.split('@')[0]
            base_username = username
            counter = 1

            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1

            user = User.objects.create_user(
                username=username,
                email=email,
                password=get_random_string(12),  # ✅ FIXED
                first_name=name
            )

            Profile.objects.create(user=user)

        tokens = get_tokens_for_user(user)

        return Response({
            'tokens': tokens,
            'user': UserSerializer(user).data
        })

    except ValueError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    return Response(UserSerializer(request.user).data)


# -------------------------------------------------------------
# PROFILE & ADDRESSES
# -------------------------------------------------------------
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile

class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# -------------------------------------------------------------
# DELIVERY & ORDERS
# -------------------------------------------------------------
class DeliveryConfigView(generics.RetrieveAPIView):
    serializer_class = DeliveryConfigSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        config, created = DeliveryConfig.objects.get_or_create(id=1)
        return config

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        address_id = request.data.get('address_id')
        items = request.data.get('items', [])
        
        if not address_id or not items:
            return Response({'error': 'Address and items are required'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            address = Address.objects.get(id=address_id, user=request.user)
        except Address.DoesNotExist:
            return Response({'error': 'Invalid address'}, status=status.HTTP_400_BAD_REQUEST)
            
        config, _ = DeliveryConfig.objects.get_or_create(id=1)
        
        total_price = 0
        total_weight = 0
        order_items_data = []
        
        for item in items:
            product = Product.objects.get(id=item['product_id'])
            quantity = item['quantity']
            
            if quantity > product.stock:
                return Response({'error': f'Insufficient stock for {product.name}. Only {product.stock} left.'}, status=status.HTTP_400_BAD_REQUEST)
                
            price = product.selling_price
            
            total_price += price * quantity
            total_weight += product.weight * quantity
            
            order_items_data.append({
                'product': product,
                'quantity': quantity,
                'price': price
            })
            
        delivery_fee = 0
        if float(total_price) <= float(config.free_delivery_threshold) or float(total_weight) >= float(config.max_weight_for_free):
            delivery_fee = float(config.standard_delivery_charge)
            
        final_total = float(total_price) + delivery_fee
        
        import uuid
        order_number = f"ORD-{uuid.uuid4().hex[:6].upper()}"
        
        order = Order.objects.create(
            user=request.user,
            address=address,
            order_number=order_number,
            total_amount=final_total,
            delivery_fee=delivery_fee
        )
        
        for item_data in order_items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=item_data['price']
            )
            
            # Reduce stock immediately to reserve it
            product.stock -= quantity
            product.save()
            
        try:
            # Create Stripe line items
            line_items = []
            for item_data in order_items_data:
                line_items.append({
                    'price_data': {
                        'currency': 'gbp',
                        'product_data': {
                            'name': item_data['product'].name,
                        },
                        'unit_amount': int(item_data['price'] * 100),
                    },
                    'quantity': item_data['quantity'],
                })
            
            # Add delivery fee as a line item if applicable
            if delivery_fee > 0:
                line_items.append({
                    'price_data': {
                        'currency': 'gbp',
                        'product_data': {
                            'name': 'Delivery Fee',
                        },
                        'unit_amount': int(delivery_fee * 100),
                    },
                    'quantity': 1,
                })

            frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:5173')
            
            import time
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,
                mode='payment',
                success_url=f"{frontend_url}/order-success/{order.order_number}?session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=f"{frontend_url}/checkout?cancelled=true&order_id={order.id}",
                metadata={'order_id': order.id, 'order_number': order.order_number},
                expires_at=int(time.time()) + 1800  # minimum 30 minutes
            )
            order.stripe_payment_intent_id = session.id  # Store session ID
            order.save()
            
            return Response({
                'order': OrderSerializer(order, context={'request': request}).data,
                'url': session.url
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def verify_payment(self, request):
        session_id = request.data.get('session_id')
        if not session_id:
            return Response({'error': 'Session ID is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            session = stripe.checkout.Session.retrieve(session_id)
            if session.payment_status == 'paid':
                order_id = getattr(session.metadata, 'order_id', None)
                if not order_id and hasattr(session.metadata, 'get'):
                    order_id = session.metadata.get('order_id')
                    
                order = Order.objects.get(id=order_id, user=request.user)
                
                if order.payment_status != 'paid':
                    order.payment_status = 'paid'
                    order.status = 'confirmed'
                    order.save()
                    
                    # Stock is already reduced in create()
                            
                return Response({'status': 'success', 'order': OrderSerializer(order, context={'request': request}).data})
            else:
                return Response({'status': 'pending'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['POST'])
    def cancel_order(self, request, pk=None):
        try:
            order = self.get_object()
            if order.payment_status == 'pending':
                order.payment_status = 'failed'
                order.status = 'cancelled'
                order.save()
                
                # Restore stock
                for order_item in order.items.all():
                    if order_item.product:
                        order_item.product.stock += order_item.quantity
                        order_item.product.save()
                        
            return Response({'status': 'cancelled'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# -------------------------------------------------------------
# WEBHOOKS
# -------------------------------------------------------------
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = getattr(settings, 'STRIPE_WEBHOOK_SECRET', '')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        return HttpResponse(status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        order_id = session.get('metadata', {}).get('order_id')
        if order_id:
            try:
                order = Order.objects.get(id=order_id)
                if order.payment_status != 'paid':
                    order.payment_status = 'paid'
                    order.status = 'confirmed'
                    order.save()
            except Order.DoesNotExist:
                pass

    elif event['type'] in ['checkout.session.expired', 'checkout.session.async_payment_failed']:
        session = event['data']['object']
        order_id = session.get('metadata', {}).get('order_id')
        if order_id:
            try:
                order = Order.objects.get(id=order_id)
                if order.payment_status != 'paid':
                    order.payment_status = 'failed'
                    order.status = 'cancelled'
                    order.save()
                    
                    # Restore stock
                    for order_item in order.items.all():
                        if order_item.product:
                            order_item.product.stock += order_item.quantity
                            order_item.product.save()
            except Order.DoesNotExist:
                pass

    return HttpResponse(status=200)

stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', 'sk_test_placeholder')
