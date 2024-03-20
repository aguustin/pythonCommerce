from django.db import models
from django.forms import model_to_dict

# Create your models here.

class Categories(models.Model):
    category_id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=30)

    def __str__(self):
        return self.category
    
    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Categories'
        ordering = ['category_id'],

class Products(models.Model):
    product_id = models.AutoField(primary_key=True)
    category_code = models.ForeignKey(Categories, on_delete=models.CASCADE, default="")
    productName = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2, default="")
    quantity = models.IntegerField()
    rate = models.DecimalField(max_digits=2, decimal_places=2, default="")
    image = models.ImageField(upload_to ='productsImages/')
    def __str__(self):
        return self.productName

    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Products'
        ordering = ['product_id']

class Location(models.Model):
    location_id = models.AutoField(primary_key=True)
    country = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    number = models.IntegerField()

    def __str__(self):
        return self.location_id
    
    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Location'
        ordering = ['location_id']

class PostalCode(models.Model):
    postal_id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.postal_id
    
    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'PostalCode'
        ordering = ['postal_id']

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
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
        ordering = ['user_id']

class Buy(models.Model):
    buy_id = models.AutoField(primary_key=True)
    user_code = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default="")
    buy_date = models.DateField()

    def __str__(self):
        return self.buy_id
    
    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Buy'
        ordering = ['buy_id']
    
class Buy_details(models.Model):
    buy_details_id = models.AutoField(primary_key=True)
    product_code = models.ForeignKey(Products, on_delete=models.CASCADE, default="")
    buy_code = models.ForeignKey(Buy, on_delete=models.CASCADE, default="")

    def __str__(self):
        return self.buy_details_id

    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Buy_details'
        ordering = ['buy_details_id']
