"""
URL configuration for storeapi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from commerce import views
from django.views.decorators.csrf import csrf_exempt

router = routers.DefaultRouter()
#router.register(r'updateCartInfo', views.UpdateCartInfo.as_view(), 'updateCartInfo')

urlpatterns = [
    path('docs/', include_docs_urls(title='store API')),
    path('admin/', admin.site.urls),
    path('createUser/', csrf_exempt(views.CreateUser.as_view()), name="createUser"),
    path('getAllProducts/', views.GetAllProducts.as_view()),
    path('getProductsByCategory/<str:category>/', views.GetProductsByCategory.as_view(), name="getProductsByCategory"),
    path('getProductById/<int:id>/', views.GetProductById.as_view(), name="getProductById"),
    path('getAllUsers/', views.GetAllUsers.as_view()),
    path('getAllBuys/', views.getAllBuys.as_view()),
    path('getUserCartById/<int:user_id>/', csrf_exempt(views.getUserCartById.as_view()), name="getUserCartById"),
    path('getUserInfo/', csrf_exempt(views.GetUserInfo.as_view()), name="getUserInfo"),
    path('uploadProduct/', csrf_exempt(views.CreateProduct.as_view()), name="uploadProduct"),
    path('updateProduct/', csrf_exempt(views.updateProduct.as_view()), name="updateProduct"),
    path('deleteProduct/<int:productId>', csrf_exempt(views.DeleteProduct.as_view()), name="deleteProduct"),
    path('updateCartInfo/', csrf_exempt(views.UpdateCartInfo.as_view()), name="updateCartInfo"),
    path('deleteCartProduct/<int:productId>', csrf_exempt(views.DeleteProductOnCart.as_view()), name="deleteCartProduct"),
    path('order/', csrf_exempt(views.orderByUser.as_view()), name="order"),
    path('deleteAll/', csrf_exempt(views.DeleteAllu.as_view()), name="updateCartInfo"),
    path('fillDatabase/', csrf_exempt(views.FillDatabase.as_view()), name="fillDatabase")
   # path('GetUserCart/<int:userId>/', views.GetUserInfo.as_view(), name="GetUserCart")
]