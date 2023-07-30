from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import *

# from .views import RegistrationView,LoginView,InvoiceList,Itemadd,ItemwithId,NewItemAdd,ResetPssword
# # urlpatterns=[
# #     path("users/register",csrf_exempt(RegistrationView.as_view()),name="Registration"),
# #     path("users/login",csrf_exempt(LoginView.as_view()),name="login"),
# #     path("users/resetpassword",csrf_exempt(ResetPssword.as_view()),name="reset-password"),
# #     path("invoices",InvoiceList.as_view(),name="invoice-list"),
# #     path("invoices/new",csrf_exempt(Itemadd.as_view()),name="item-add"),
# #     path("invoices/<int:invoice_id>",ItemwithId.as_view(),name="item-with-id"),
# #     path("invoices/<int:invoice_id>/items",csrf_exempt(NewItemAdd.as_view()),name="ner-item-add")

# # ]


urlpatterns=[
    path("users/signup",csrf_exempt(SignupView.as_view()),name="Registration"),
    path("users/signin",csrf_exempt(LoginView.as_view()),name="login"),
    path("users/resetpassword/",csrf_exempt(ResetPasswordView.as_view()),name="reset-password"),
    path("invoices",InvoiceActions.as_view(),name="all-invoices"),
    path("invoices/new",InvoiceActions.as_view(),name="add-new-invoice"),
    path("invoices/<int:invoice_id>",SpecificInvoices.as_view(),name="sepcific_invoice"),
    path("invoices/<int:invoice_id>/items",SpecificInvoices.as_view(),name="add-item")

]