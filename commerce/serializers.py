from rest_framework import serializers
from .models import Buy_details, Categories, Location, PostalCode, Products, Buy, User

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model: Categories
        field = ['category']

class ProductsSerializer(serializers.ModelSerializer):

    category_code = CategoriesSerializer()  # Serialize the related Categories object

    class Meta:
        model = Products
        fields = ['id', 'category_code', 'productName', 'description', 'price', 'quantity', 'rate', 'image']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model: Location
        fields = ['id', 'country', 'city', 'address' , 'number']

class PostalCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model: PostalCode
        fields = ['id', 'postal_number']

class UserSerializer(serializers.ModelSerializer):

    location_code = LocationSerializer()
    postal_code = PostalCodeSerializer()

    class Meta:
        model: User
        fields = ['id', 'location_code', 'postal_code', 'userType', 'mail', 'username', 'password']

class BuySerializer(serializers.ModelSerializer):
    product_code = ProductsSerializer()  # Serialize the related Products object
    user_code = UserSerializer()  # Assuming you only need the ID of the user
    
    class Meta:
        model = Buy
        fields = ['id', 'user_code', 'product_code', 'total_price', 'buy_date']

class Buy_detailsSerializer(serializers.ModelSerializer):
    product_code = ProductsSerializer()  # Assuming you only need the ID of the user
    buy_code = BuySerializer()
    
    class Meta:
        model = Buy_details
        fields = ['id', 'product_code', 'buy_code']