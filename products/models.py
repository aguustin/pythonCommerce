from django.db import models

# Create your models here.

class Categories(models.Model):
    name = models.CharField(max_length=50, blank=False, default='x')

    def __str__(self):
        return self.name
        
class Products(models.Model):
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, default='category')
    title = models.CharField(max_length=100, default='x')
    description = models.TextField()
    price = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    count = models.PositiveIntegerField(default=0)
    rate = models.DecimalField(default=0.0, max_digits=2, decimal_places=1)
    image = models.ImageField(upload_to='productsImages/', height_field=None, width_field=None, max_length=100, null=True)
       
    def __str__(self):
        return self.title