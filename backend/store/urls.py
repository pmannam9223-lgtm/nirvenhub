from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet, AddressViewSet, OrderViewSet,
    register_user, login_user, google_auth, current_user,
    ProfileView, DeliveryConfigView, stripe_webhook
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'addresses', AddressViewSet, basename='address')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register_user, name='register'),
    path('auth/login/', login_user, name='login'),
    path('auth/google/', google_auth, name='google_auth'),
    path('auth/me/', current_user, name='current_user'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('delivery-config/', DeliveryConfigView.as_view(), name='delivery_config'),
    path('webhook/stripe/', stripe_webhook, name='stripe_webhook'),
]
