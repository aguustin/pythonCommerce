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
        data = json.loads(request.body)
        #userType = data.get('userType')
        mail = data.get('mail')
        username = data.get('username')
        password = data.get('password')

        if mail is not None and not User.objects.filter(mail__icontains=mail):

            country =  data.get('country')
            city =  data.get('city')
            address =  data.get('address')
            number =  data.get('addressNumber')

            PostalCodes = PostalCode()
            postal_n = data.get('cPostal')

            print("entro")
                
            Locations = Location.objects.create(country=country, city=city, address=address, number=number)
            Locations.save()

            PostalCodes = PostalCode.objects.create(postal_number=postal_n)
            PostalCodes.save()

            usersData = User.objects.create(location_code=Locations, postal_code=PostalCodes, userType=2, mail=mail, username=username, password=password)
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
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        getmail = data.get('mail')
        getPass = data.get('password')
        data = list(User.objects.filter(mail=getmail).values())
        findPass = User.objects.filter(password=getPass).values()
   
        if(data and findPass):
            return JsonResponse(data, safe=False)
        else:
            return 'Ha ocurrido un error'
        

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