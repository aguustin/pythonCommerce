from pickle import FALSE
from django.http import HttpResponse, JsonResponse, QueryDict
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
        print("asdasdasdasdasdasd", category)
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

class UpdateCartInfo(UpdateView):
    model = Products
    def put(self, request, *args, **kwargs):

        if request.method == 'PUT':
            put_values = QueryDict(request.body)  #no estoy pudiendo traer los datos, no viene nada (creo que es eso)
            print(put_values)
            data={
                "user_id":put_values.get('userId'),
                "category_id":put_values.get('categoryId'),
                "title": put_values.get('title'),
                "description":put_values.get('description'),
                "price":put_values.get('price'),
                "rate":put_values.get('rate'),
                "image":put_values.get('image'),
            }
            Products.objects.update(**data)
            return JsonResponse(data, safe=False)
        else:
            return HttpResponse(204)
    

class GetUserCart(ListView):
    model = Products
    def get(self, userId, *args, **kwargs):
        data = Products.objects.get(user_id=userId)
        return HttpResponse(data)   
        #return HttpResponse(200)                