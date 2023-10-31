from django.urls import path
from . import views

urlpatterns = [
    path('api/employee/', views.employee_list, name='employee_list'),
]