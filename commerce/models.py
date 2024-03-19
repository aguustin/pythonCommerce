from django.db import models
from django.forms import model_to_dict

# Create your models here.

class Categories(models.Model):
    title = models.CharField(max_length=100, default="")
    def __str__(self):
        return self.title

    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Categories'
        ordering = ['id']
    
class Products(models.Model):
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, default="")
    description = models.CharField(max_length=500, default="")
    price = models.DecimalField(max_digits=10, decimal_places=2, default="")
    rate = models.DecimalField(max_digits=3, decimal_places=1, default="")
    count = models.IntegerField(default="")
    image = models.ImageField(upload_to='productsImages/', max_length=200, default="")

    def __str__(self):
        return self.title

    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Products'
        ordering = ['id']

class User(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, default="")
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