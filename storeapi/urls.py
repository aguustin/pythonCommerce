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
    path('account/', views.AccountInfo.as_view()),
    path('getAllProducts/', views.GetAllProducts.as_view()),
    path('CreateProduct/', csrf_exempt(views.CreateProduct.as_view()), name="createProduct"),
    path('updateCartInfo/', views.UpdateCartInfo.as_view()),
    path('GetUserCart/<int:userId>/', views.GetUserCart.as_view(), name="GetUserCart")
]
