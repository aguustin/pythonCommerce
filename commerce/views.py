from django.utils import timezone
from decimal import Decimal
import json
from pickle import FALSE
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from requests import Response
from commerce.models import Buy, Buy_details, Categories, Location, PostalCode, Products, User
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.core.serializers import serialize

from commerce.serializers import Buy_detailsSerializer, BuySerializer, ProductsSerializer
# Create your views here.

class FillDatabase(CreateView):
    model = Products

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        print('datsss: ', data)
        for product in data:
            category = product.get('category')
            productName = product.get('title')
            description = product.get('description')
            price = product.get('price')
            rating_data = product.get('rating', {})
            quantity = rating_data.get('count')
            rate = rating_data.get('rate')
            image = product.get('image')
          
            category_instance, created = Categories.objects.get_or_create(category=category)

            # Create the product with the obtained category instance
            product_data = Products.objects.create(
                category_code=category_instance, 
                productName=productName, 
                description=description, 
                price=price, 
                quantity=quantity, 
                rate=rate, 
                image=image
            )

            product_data.save()
    
        return HttpResponse('200')


class CreateUser(CreateView): #funciona
    model = User
    model = Location
    model = PostalCode
   
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
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
                
            Locations = Location.objects.create(country=country, city=city, address=address, number=number)
            Locations.save()

            PostalCodes = PostalCode.objects.create(postal_number=postal_n)
            PostalCodes.save()
           
            usersData = User.objects.create(location_code=Locations, postal_code=PostalCodes, userType=2, mail=mail, username=username, password=password)
            usersData.save()

            return HttpResponse('200')
            

class GetAllProducts(ListView): #funciona
    model = Products
    def get(self, request, *args, **kwargs):
        data = Products.objects.all().values()
        return JsonResponse(list(data), safe=False)
    
class GetProductsByCategory(ListView):
    model = Categories
    model = Products
    def get(self, request, *args, **kwargs):
        categoryName = kwargs.get('category')
        getCategoryName = Categories.objects.filter(category=categoryName).values()
        first_id = getCategoryName.first().get('id')
        print("cat: ", first_id)
        data = Products.objects.filter(category_code=first_id).values()
        return JsonResponse(list(data), safe=False)
       
class GetProductById(ListView):
    model = Products
    def get(self, request, *args, **kwargs):
        productId = kwargs.get('id')
        data = Products.objects.select_related('category_code').get(id=productId)
        serializer = ProductsSerializer(data)
        print('serializer: ', serializer.data)
        return JsonResponse(serializer.data)

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
        #post_values = json.loads(request.body)
        category = request.POST.get('category')
        findCategory, created = Categories.objects.get_or_create(category=category) #esto no funciona
        image_file = request.FILES.get('image')
        stock = Decimal(request.POST.get('quantity').replace(',','.'))
        profits = Decimal(request.POST.get('profits').replace(',','.'))
        losses = (stock * profits)

        data = {
            "category_code": findCategory,
            "productName": request.POST.get('title'),
            "description": request.POST.get('description'),
            "price": request.POST.get('price'),
            "quantity": stock,
            "sales": 0,
            "profits": 0,
            "losses": losses,
            "rate": 1,
            "image": image_file,
        }
        print(data)
        Products.objects.create(**data)
    
        return HttpResponse(200)
    
class updateProduct(CreateView):  
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        get_product_data = data.get('product')
        print("update form: ", data)
        print("the pfs: ", data.get('pfs')) 
        print("newStock", data.get('newStock'))
        category = get_product_data.get('category_code_id')
        category_instance = Categories.objects.get(id=category)
        productId = get_product_data.get('id')
        product_instance = Products.objects.get(id=productId)
        product_instance.category_code = category_instance
        product_instance.productName = get_product_data.get('productName')
        product_instance.description = get_product_data.get('description')
        product_instance.price = get_product_data.get('price')
        product_instance.quantity = get_product_data.get('quantity')
        product_instance.losses = product_instance.losses + data.get('pfs')
        product_instance.save(update_fields=['category_code', 'productName', 'description', 'price', 'quantity', 'losses'])
        return HttpResponse(200)
        

class UpdateCartInfo(CreateView): 
    model = User
    model = Products
    model = Buy_details
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        getUserId = data.get('userId')
        getProductId = data.get('productId')
        getCategoryName = data.get('productCategoryName')
        print('category name ', getCategoryName)
        getProductName = data.get('productTitle')
        getDescription = data.get('productDescription')
        getPrice = data.get('productPrice')
        getQuantity = data.get('productQuantity')
        getRate = data.get('productRate')
        getImage = data.get('productImage')
        getSales = data.get('productSales') 

        actualQuantity = getQuantity - getSales 

        findUserById = list(User.objects.filter(pk=getUserId).values())
        findProductById = list(Products.objects.filter(productName=getProductName).values())
        findCategoryById = list(Categories.objects.filter(category=getCategoryName).values())
      
        if(findProductById):
            userId = findUserById[0]['id']
            user_instance = User.objects.get(id=userId)
            prodId = findProductById[0]['id']
            prod_instance = Products.objects.get(id=prodId)
            buy = Buy_details.objects.create(user_code=user_instance, product_code=prod_instance, sub_total=getPrice, buy_date=timezone.now())
            buy.save()
            prod_instance.quantity = actualQuantity 
            prod_instance.sales = prod_instance.sales + getSales 
            prod_instance.save(update_fields=['quantity', 'sales']) 
            return HttpResponse(200)
        else:
            if(findCategoryById):
                catId = findCategoryById[0]['id']
                category_instance = Categories.objects.get(id=catId)
                saveProduct = Products.objects.create(category_code=category_instance, productName=getProductName, description=getDescription, price=getPrice, quantity=getQuantity, sales=getSales, rate=getRate, image=getImage)
                saveProduct.save()
                return HttpResponse(200)
            else: 

                saveCategory = Categories.objects.create(category=getCategoryName)
                saveCategory.save()
                saveProduct = Products.objects.create(category_code=saveCategory.id, productName=getProductName, description=getDescription, price=getPrice, quantity=getQuantity, sales=getSales, rate=getRate, image=getImage)
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
        productId = kwargs.get('productId')
        Products.objects.filter(id=productId).delete()
        return HttpResponse(200)
        
class DeleteProductOnCart(DeleteView): #funciona
    model = User
    model = Products
    model = Buy_details
    def delete(self, request, *args, **kwargs):
        productId = kwargs.get('productId')
        print(productId)
        #product_instance = Products.objects.get(id=productId)
        #product_instance.sales = product_instance.sales - sales
        #product_instance.save(update_fields=['sales'])
        Buy_details.objects.filter(id=productId).delete()
       
        return HttpResponse(200)

class getAllBuys(ListView): 
    model = Buy_details
    def get(self, request, *args, **kwargs):
        data = Buy_details.objects.all().values()
        return JsonResponse(list(data), safe=False)
    
    
class getUserCartById(ListView): 
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        data = Buy_details.objects.filter(user_code=user_id, buy_code=None)
        serializer = Buy_detailsSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)
    
class orderByUser(CreateView):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        total = 0
        userId = data[0]['user_code']['id']
        user_instance = User.objects.get(id=userId)
        for item in data:
            total += Decimal(item['sub_total'])

        new_buy = Buy.objects.create(user_code=user_instance, total_price=total)

        for item in data:
            product_id = item['product_code']['id']
            product_instance = Products.objects.get(id=product_id)
            product_instance.profits = product_instance.profits + Decimal(item['sub_total'])
            product_instance.save(update_fields=['profits'])

            # Find the Buy_details with matching user, product, and no existing buy_code
            buy_details = Buy_details.objects.filter(
                user_code=user_instance,
                product_code_id=product_id,
                buy_code=None
            )  # Retrieve the first matching Buy_detail
                
            for buy_detail in buy_details:
                buy_detail.buy_code = new_buy
                buy_detail.save()

        return HttpResponse('200')