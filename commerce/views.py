from pickle import FALSE
from django.http import JsonResponse
from django.shortcuts import render
from commerce.models import Products, User
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
# Create your views here.

class GetAllProducts(ListView):
    model = Products
    def get(self, request, *args, **kwargs):
        data = Products.objects.all().values()
        return JsonResponse(list(data), safe=False)

class AccountInfo(ListView, CreateView):
    model = User
    def get(self, request, *args, **kwargs):
        data = []
        if(request.GET['userId']):
            res = request.GET['userId']
            data[Products.objects.all(res)]
            return JsonResponse(data, safe=False)
        else:
            data['error'] = 'Ha ocurrido un error'
            return data
    def post(self, request, *args, **kwargs):
        data = []
        data[request.POST['crearteAccount']]
        return JsonResponse(data, safe=False)

class CreateProduct(CreateView):
    model = Products
    def post(self, request, *args, **kwargs):
        data = []
        res = request.POST['crearteProduct']

class UpdateCartInfo(UpdateView):
    model = Products
    def put(self, request, *args, **kwargs):
        data = []
        res = request.PUT['buyInfo']
       # if(res):
                   