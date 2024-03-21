from django.contrib import admin

from commerce.models import Buy, Buy_details, Categories, Location, PostalCode, Products, User

# Register your models here.

class ProductsAdmin(admin.ModelAdmin):
    list_display = [
        'product_id',
        'category_code', 
        'productName', 
        'description', 
        'price',
        'quantity',
        'rate',
        'image'
    ]

admin.site.register(Products, ProductsAdmin)

class CategoriesAdmin(admin.ModelAdmin):
    list_display = [
        "category_id",
        "category"
    ]

admin.site.register(Categories, CategoriesAdmin)

class LocationAdmin(admin.ModelAdmin):
    list_display = [
        "country",
        "city",
        "address",
        "number"
    ]

admin.site.register(Location, LocationAdmin)

class PostalCodeAdmin(admin.ModelAdmin):
    list_display = [
        "postal_number"
    ]
    
admin.site.register(PostalCode, PostalCodeAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = [
        'location_code',
        'postal_code',
        'userType',
        'mail',
        'username',
        'password'
    ]

admin.site.register(User, UserAdmin)

class BuyAdmin(admin.ModelAdmin):
    list_display = [
        'user_code',
        'total_price',
        'buy_date'
    ]
    
admin.site.register(Buy, BuyAdmin)

class Buy_detailsAdmin(admin.ModelAdmin):
    list_display = [
        'product_code',
        'buy_code'
    ]

admin.site.register(Buy_details, Buy_detailsAdmin)