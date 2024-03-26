from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from commerce import views

router = routers.DefaultRouter()
#router.register(r'updateCartInfo', views.UpdateCartInfo.as_view(), 'updateCartInfo')

urlpatterns = [
    #path('docs/', include_docs_urls(title='store API')),
    #path('admin/', admin.site.urls),
]