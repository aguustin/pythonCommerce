from django.utils import timezone
from decimal import Decimal
import json
from pickle import FALSE
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
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

        data = User.objects.filter(mail=getmail).values()
        findPass = User.objects.filter(password=getPass).values()
   
        if data and findPass:
            return JsonResponse(list(data), safe=False)

        else:
            return HttpResponse(500)
        

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


class UpdateCartInfo(CreateView): #REVISAR TODOO ESTOOOOOOO
    model = User
    model = Products
    model = Buy
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        getUserId = data.get('userId')
        getProductId = data.get('productId')
        getCategoryName = data.get('productCategory')
        getProductName = data.get('productName')
        getDescription = data.get('description')
        getPrice = data.get('price')
        getQuantity = data.get('quantity')
        getRate = data.get('rate')
        getImage = data.get('image')

        findProductById = list(Products.objects.filter(pk=getProductId).values())
        findCategoryById = list(Categories.objects.filter(category=getCategoryName).values())
        print(findProductById)
        if(findProductById):
            print("entro a A")
            buy = Buy.objects.create(user_code=getUserId, product_code=getProductId, total_price=200, buy_date=timezone)
            buy.save()
            return HttpResponse(200)
        else:
            if(findCategoryById):
                print("entro a B")
                saveProduct = Products.objects.create(category_code=findCategoryById.id, productName=getProductName, description=getDescription, price=getPrice, quantity=getQuantity, rate=getRate, image=getImage)
                saveProduct.save()
                return HttpResponse(200)
            else:
                print("entro a C")
                saveCategory = Categories.objects.create(category=getCategoryName)
                saveCategory.save()
                saveProduct = Products.objects.create(category_code=saveCategory.id, productName=getProductName, description=getDescription, price=getPrice, quantity=getQuantity, rate=getRate, image=getImage)
                saveProduct.save()
       
    
class DeleteAllu(DeleteView): #funciona
    model = User
    def delete(self, request, *args, **kwargs):
        User.objects.all().delete()
        Products.objects.all().delete()
        Categories.objects.all().delete()
        Location.objects.all().delete()
        PostalCode.objects.all().delete()
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