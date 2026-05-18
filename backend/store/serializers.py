from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Product, Profile, Address, DeliveryConfig, Order, OrderItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = ['id', 'user', 'phone']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'user', 'type', 'address', 'is_default']
        read_only_fields = ['user']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    category_slug = serializers.ReadOnlyField(source='category.slug')
    discount_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'category', 'category_name', 'category_slug', 'name', 'image', 
            'original_price', 'selling_price', 'discount_percentage', 
            'in_offer', 'rating', 'reviewsCount', 'description',
            'weight', 'quantity_description', 'stock'
        ]

    def get_discount_percentage(self, obj):
        if obj.original_price > 0 and obj.original_price > obj.selling_price:
            discount = ((obj.original_price - obj.selling_price) / obj.original_price) * 100
            return round(discount)
        return 0

class DeliveryConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryConfig
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_details', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    address_details = AddressSerializer(source='address', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'address', 'address_details', 'order_number', 'status', 
            'payment_status', 'total_amount', 'delivery_fee', 
            'stripe_payment_intent_id', 'created_at', 'updated_at', 'items'
        ]
        read_only_fields = ['user', 'order_number', 'created_at', 'updated_at', 'stripe_payment_intent_id']
