from decimal import Decimal
import json
from pickle import FALSE
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from commerce.models import Buy, Categories, Location, PostalCode, Products, User
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.core.serializers import serialize
# Create your views here.

class CreateUser(CreateView): #funciona
    model = User
    model = Location
    model = PostalCode

    def post(self, request, *args, **kwargs):
        userType = request.POST.get('userType')
        mail = request.POST.get('mail')
        username = request.POST.get('username')
        password = request.POST.get('password')

        if( not User.objects.filter(mail__icontains=mail)):

            country =  request.POST.get('country')
            city =  request.POST.get('city')
            address =  request.POST.get('address')
            number =  request.POST.get('number')

            PostalCodes = PostalCode()
            postal_n = request.POST.get('postal_number')

            if(country != '' and city != '' and address != ''):
               # if(Location.objects.filter(country__icontains=country) and Location.objects.filter(city__icontains=city) and Location.objects.filter(address__icontains=address) and Location.objects.filter(number__exact=number)):
                   # if(PostalCode.objects.filter(postal_number__exact=postal_n.exists())):
                        print("entro")
                
                        Locations = Location.objects.create(country=country, city=city, address=address, number=number)
                        Locations.save()

                        PostalCodes = PostalCode.objects.create(postal_number=postal_n)
                        PostalCodes.save()

                        usersData = User.objects.create(location_code=Locations, postal_code=PostalCodes, userType=userType, mail=mail, username=username, password=password)
                        usersData.save()

                        return HttpResponse(200)
            

class GetAllProducts(ListView): #funciona
    model = Products
    def get(self, request, *args, **kwargs):
        data = Products.objects.all().values()
        return JsonResponse(list(data), safe=False)
    

class GetAllUsers(ListView): #funciona
    model = User
    def get(self, request, *args, **kwargs):
        data = User.objects.all().values()
        return JsonResponse(list(data), safe=False)
    

class GetUserInfo(ListView): #funciona
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

        findCategory = Categories.objects.filter(category=category) #esto no funciona
        #findCategory.save()

        if(findCategory):
            data = {
                "category_code": findCategory,
                "productName": post_values.get('title'),
                "description": post_values.get('description'),
                "price": post_values.get('price'),
                "quantity": post_values.get('count'),
                "rate": post_values.get('rate'),
                "image": post_values.get('image'),
            }
            Products.objects.create(**data)
      
            return HttpResponse(200)
        else:
            categories = Categories.objects.create(category=category)
            categories.save()

            data = {
                "category_code": categories,
                "productName": post_values.get('title'),
                "description": post_values.get('description'),
                "price": post_values.get('price'),
                "quantity": post_values.get('count'),
                "rate": post_values.get('rate'),
                "image": post_values.get('image'),
            }
            Products.objects.create(**data)

            return HttpResponse(200)


class UpdateCartInfo(CreateView): #funciona
    model = User
    model = Products
    model = Buy
    def post(self, request, *args, **kwargs):
        post_values = request.POST
        getUserId = User.objects.get(pk=post_values.get('userId'))
        getProductId = Products.objects.get(pk=post_values.get('productId'))
        buy = Buy.objects.create(user_code=getUserId, product_code=getProductId, total_price=post_values.get('total_price'))
        buy.save()
        return HttpResponse(200)
    
        
class DeleteProduct(DeleteView): #funciona
    model = User
    def delete(self, request, *args, **kwargs):
        productId = request.POST.get('productId')
        User.objects.filter(product_id=productId).delete()
        return HttpResponse(200)
    

class getAllBuys(ListView): #funciona
    model = Buy
    def get(self, request, *args, **kwargs):
        data = Buy.objects.all().values()
        return JsonResponse(list(data), safe=False)
    
    
class getUserCartById(ListView): #funciona
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        print("user_id: ", user_id)
        data = Buy.objects.filter(user_code=user_id)
        return JsonResponse(list(data.values()), safe=False)