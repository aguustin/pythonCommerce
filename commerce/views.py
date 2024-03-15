from pickle import FALSE
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from commerce.models import Categories, Products, User
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

class GetAllProducts(ListView):
    model = Products
    def get(self, request, *args, **kwargs):
        data = Products.objects.all().values()
        return JsonResponse(list(data), safe=False)

class AccountInfo(ListView, CreateView):
    model = User
    def get(self, request, *args, **kwargs):
        data = []
        if(request.GET['userId']):
            res = request.GET['userId']
            data[Products.objects.all(res)]
            return JsonResponse(data, safe=False)
        else:
            data['error'] = 'Ha ocurrido un error'
            return data
    def post(self, request, *args, **kwargs):
        data = []
        data.append(request.POST['createAccount'])
        return JsonResponse(data, safe=False)

class CreateProduct(CreateView):
    model = Products
    model = Categories
    def post(self, request, *args, **kwargs):
        post_values = request.POST
        category = request.POST.get('category')
        Categories.objects.create(title=category)
        data = {
            "user_id": 0,
            "category_id": 2,
            "title": post_values.get('title'),
            "description": post_values.get('description'),
            "price": post_values.get('price'),
            "rate": post_values.get('rate'),
            "count": post_values.get('count'),
            "image": post_values.get('image'),
            #"category": post_values.get('category')
        }

        Products.objects.create(**data)
        return HttpResponse(200)

class UpdateCartInfo(UpdateView):
    model = Products
    def put(self, request, *args, **kwargs):
        put_values = request.PUT
        data={
            "id":put_values.get('id'),
            "user_id":put_values.get('user_id'),
            "title": put_values.get('title'),
            "description":put_values.get('description'),
            "price":put_values.get('price'),
            "count":put_values.get('count'),
            "rate":put_values.get('rate'),
            "count":put_values.get('count'),
            "image":put_values.get('image'),
        }
        Products.objects.update(data)
        return JsonResponse(data, safe=False)
       # if(res):

class GetUserCart(ListView):
    model = Products
    def get(self, userId, *args, **kwargs):
        data = Products.objects.get(user_id=userId)
        return HttpResponse(data)   
        #return HttpResponse(200)                