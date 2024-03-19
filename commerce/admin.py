from django.contrib import admin

from commerce.models import Categories, Products, User

# Register your models here.
class ProductsAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'category', 
        'title', 
        'description', 
        'price',
        'rate',
        'count',
        'image'
    ]

admin.site.register(Products, ProductsAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'product',
        'mail',
        'username',
        'password'
    ]

admin.site.register(User, UserAdmin)

class CategoriesAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'title'
    ]
    
admin.site.register(Categories, CategoriesAdmin)