from django.db import models
from django.forms import model_to_dict

# Create your models here.

class User(models.Model):
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

class Categories(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Categories'
        ordering = ['id']
    
class Products(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rate = models.DecimalField(max_digits=3, decimal_places=1)
    count = models.IntegerField()
    image = models.ImageField(upload_to='productsImages/', max_length=200)

    def __str__(self):
        return self.title

    def toJSON(self):
        item = model_to_dict(self)
        return item
    
    class Meta:
        db_table = 'Products'
        ordering = ['id']