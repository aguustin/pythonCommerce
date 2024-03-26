from django.db import models
from django.forms import model_to_dict
from storeapi import settings

# Create your models here.

class Categories(models.Model):
    category = models.CharField(max_length=30)

    def __str__(self):
        return self.category
    
    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Categories'
        ordering = ['id']


class Products(models.Model):
    category_code = models.ForeignKey(Categories, on_delete=models.CASCADE, default="")
    productName = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    price = models.IntegerField()
    quantity = models.IntegerField()
    rate = models.IntegerField()
    image = models.ImageField(upload_to='productsImages/')
    def __str__(self):
        return self.productName

    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Products'
        ordering = ['id']


class Location(models.Model):
    country = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    address = models.CharField(max_length=100)
    number = models.IntegerField()

    def __str__(self):
        return self.address
    
    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Location'
        ordering = ['id']


class PostalCode(models.Model):
    postal_number = models.IntegerField()

    def __str__(self):
        return str(self.postal_number)
    
    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'PostalCode'
        ordering = ['id']


class User(models.Model):
    location_code = models.ForeignKey(Location, on_delete=models.CASCADE, default="")
    postal_code = models.ForeignKey(PostalCode, on_delete=models.CASCADE, default="")
    userType = models.IntegerField()
    mail = models.EmailField(max_length=100)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    #birthday = models.DateField(auto_now_add=True, verbose_name="Creation Time")
    
    def __str__(self):
        return self.mail
    
    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'User'
        ordering = ['id']

class Buy(models.Model):
    user_code = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    product_code = models.ForeignKey(Products, on_delete=models.CASCADE, default="")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default="")
    buy_date = models.DateField(null=True)

    def __str__(self):
        return self.user_code
    
    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Buy'
        ordering = ['id']
    
class Buy_details(models.Model):
    product_code = models.ForeignKey(Products, on_delete=models.CASCADE, default="")
    buy_code = models.ForeignKey(Buy, on_delete=models.CASCADE, default="")

    def __str__(self):
        return self.buy_code 

    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Buy_details'
        ordering = ['id']
