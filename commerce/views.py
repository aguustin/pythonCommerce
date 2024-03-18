import json
from pickle import FALSE
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from commerce.models import Categories, Products, User
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.core.serializers import serialize
# Create your views here.

class GetAllProducts(ListView):
    model = Products
    def get(self, request, *args, **kwargs):
        data = Products.objects.all().values()
        return JsonResponse(list(data), safe=False)
    

class GetUserInfo(ListView):
    model = Products
    def get(self, request, userId, **kwargs):
        
        if request.method == 'GET':
            data = Products.objects.filter(user_id=userId).values()
            return JsonResponse(list(data), safe=False)
        else:
            return 'Ha ocurrido un error'
    def post(self, request, *args, **kwargs):
        data = []

        if request.POST.get('password') == request.POST.get('confirmPassword'):
        #data.append(request.POST['createAccount'])
            data = {
                "userType": request.POST.get('userType'),
                "mail": request.POST.get('mail'),
                "username": request.POST.get('username'),
                "password": request.POST.get('password'),
            }
            User.objects.create(**data)
            return JsonResponse(data, safe=False)
        else:
            print("Las contraseñas no coinciden")
            return HttpResponse(204)              


class CreateProduct(CreateView):
    model = Products
    model = Categories
    def post(self, request, *args, **kwargs):
        post_values = request.POST
        category = request.POST.get('category')
        Categories.objects.create(title=category)
        
        data = {
            "user_id": post_values.get('user_id'),
            "category_id": post_values.get('category_id'),
            "title": post_values.get('title'),
            "description": post_values.get('description'),
            "price": post_values.get('price'),
            "rate": post_values.get('rate'),
            "count": post_values.get('count'),
            "image": post_values.get('image'),
        }
        Products.objects.create(**data)
        return HttpResponse(200)


class UpdateCartInfo(CreateView):
    model = Products
    def post(self, request, *args, **kwargs):
        post_values = request.POST
        if request.method == 'POST':
            data={
                "user_id":post_values.get('userId'),
                "category_id":post_values.get('categoryId'),
                "title": post_values.get('title'),
                "description":post_values.get('description'),
                "price":post_values.get('price'),
                "rate":post_values.get('rate'),
                "count":post_values.get('count'),
                "image":post_values.get('image'),
            }
            Products.objects.create(**data)
            return JsonResponse(data, safe=False)
        else:
            return HttpResponse(204)
        
class DeleteProduct(DeleteView):
    model = Products
    def delete(self, request, *args, **kwargs):
        productId = request.POST.get('productId')
        Products.objects.filter(id=productId).delete()
        return HttpResponse(200)