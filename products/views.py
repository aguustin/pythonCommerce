from django.shortcuts import render
from rest_framework import viewsets
from .serializer import CategoriesSerializer
from .serializer import ProductsSerializer
from .models import Categories, Products

# Create your views here.
class CategoriesView(viewsets.ModelViewSet):
        serializer_class = CategoriesSerializer
        queryset = Categories.objects.all(),
        
class ProductsView(viewsets.ModelViewSet):
        serializer_class = ProductsSerializer
        queryset = Products.objects.all(),