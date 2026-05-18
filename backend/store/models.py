from django.db import models
from django.contrib.auth.models import User
from autoslug import AutoSlugField

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from='name', unique=True)
    image = models.ImageField(upload_to='categories/')

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='products/')
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    in_offer = models.BooleanField(default=False)
    rating = models.FloatField(default=0.0)
    reviewsCount = models.IntegerField(default=0)
    description = models.TextField()
    weight = models.DecimalField(max_digits=6, decimal_places=2, default=0.0, help_text="Weight in kg")
    quantity_description = models.CharField(max_length=255, blank=True, null=True, help_text="e.g. 1kg, pack of 5")
    stock = models.IntegerField(default=0, help_text="Available inventory")
    order = models.IntegerField(default=0, help_text="Display order")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    type = models.CharField(max_length=50, help_text="e.g., Home, Work")
    address = models.TextField()
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.type}"

class DeliveryConfig(models.Model):
    free_delivery_threshold = models.DecimalField(max_digits=10, decimal_places=2, default=50.00)
    max_weight_for_free = models.DecimalField(max_digits=6, decimal_places=2, default=20.00, help_text="Max weight in kg for free delivery")
    standard_delivery_charge = models.DecimalField(max_digits=6, decimal_places=2, default=5.99)

    class Meta:
        verbose_name = "Delivery Configuration"
        verbose_name_plural = "Delivery Configurations"

    def __str__(self):
        return "Delivery Settings"

class Order(models.Model):
    PAYMENT_STATUS = [("pending", "Pending"), ("paid", "Paid"), ("failed", "Failed")]
    STATUS_CHOICES = [
        ("processed", "Processed"), 
        ("confirmed", "Confirmed"),
        ("shipped", "Shipped"), 
        ("delivered", "Delivered"), 
        ("cancelled", "Cancelled"),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    order_number = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='processed')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.order_number

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name if self.product else 'Unknown'}"
