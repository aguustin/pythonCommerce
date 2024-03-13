from pickle import FALSE
from django.http import JsonResponse
from django.shortcuts import render
from commerce.models import Products, User
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.views.decorators.csrf import csrf_exempt
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
        data.append(request.POST['createAccount'])
        return JsonResponse(data, safe=False)

class CreateProduct(CreateView):
    model = Products
    def post(self, request, *args, **kwargs):
        res = request.POST.get('createProduct', False)
        Products.objects.create(res)
        return JsonResponse(res, safe=False)


class UpdateCartInfo(UpdateView):
    model = Products
    def put(self, request, *args, **kwargs):
        data = [request.PUT['buyInfo']]
        Products.objects.update(data)
        return JsonResponse(data, safe=False)
       # if(res):
                   