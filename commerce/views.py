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
    

class GetAllUsers(ListView):
    model = User
    def get(self, request, *args, **kwargs):
        data = User.objects.all().values()
        return JsonResponse(list(data), safe=False)
    

class GetUserInfo(ListView):
    model = User
    def get(self, request, userMail, **kwargs):
        
        if request.method == 'GET':
            data = User.objects.filter(mail=userMail).values()
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
    model = User
    model = Products
    model = Categories
    def post(self, request, *args, **kwargs):
        post_values = request.POST
        category = request.POST.get('category')
        Categories.objects.create(title=category)
        
        #data = {
           # "product_id": post_values.get('user_id'),
           # "category_id": post_values.get('category_id'),
           # "userType": post_values.get('user_type'),
           # "mail": post_values.get('mail'),
           # "username": post_values.get('username'),
       # }
       # User.objects.create(**data)

        data = {
            "category_id": post_values.get('categoryId'),
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
    model = User
    def post(self, request, *args, **kwargs):
        post_values = request.POST
        if request.method == 'POST':
            data={
                "product_id":post_values.get('productId'),
                "userType": post_values.get(''),
                "mail": post_values.get(''),
                "username": post_values.get('')
          
            }
            User.objects.create(**data)
            return JsonResponse(data, safe=False)
        else:
            return HttpResponse(204)
        
        #"id": 3,
        #"category_id": 4,
       # "title": "pruebaC",
       # "description": "desc prueba C",
       # "price": "22.00",
       # "rate": "5.0",
       # "count": 20,
       # "image": "productsImages/prueba_9odlpXk.jpg"
class DeleteProduct(DeleteView):
    model = User
    def delete(self, request, *args, **kwargs):
        productId = request.POST.get('productId')
        User.objects.filter(product_id=productId).delete()
        return HttpResponse(200)