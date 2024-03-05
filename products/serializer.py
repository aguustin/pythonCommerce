from rest_framework import serializers
from .models import Categories
from .models import Products

        
class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__',
        
class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ('id', 'title', 'description', 'price', 'count', 'rate', 'image', 'category')
       