from django.http import Http404, HttpResponseBadRequest, JsonResponse
from django.views import View
import json
from .serializer import *

from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Count



class SignupView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        userExist = User.objects.filter(email=data["email"])

        if not userExist:
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(
                    {"message": "Account has been Created."},
                    safe=False,
                    status=status.HTTP_201_CREATED,
                )
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(
            {"message": "User is already Registered!!"},
            safe=False,
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSeralizer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            refresh_token = RefreshToken.for_user(user)

            return JsonResponse(
                {
                    "refresh": str(refresh_token),
                    "access_token": str(refresh_token.access_token),
                },safe=False
            )
        return JsonResponse(serializer.errors,safe=False)








class ResetPasswordView(APIView):
    def put(self,request):
        data=json.loads(request.body)
        print(data["phone"])

        # print(data["password"])
        username=request.GET.get("username")
        try:
            user=User.objects.get(Q(username__iexact=username) & Q(phone__exact=data["phone"]))
            if user:
                user.set_password(data["password"])
                user.save()
                return JsonResponse({"message":"Password Updated Successfully"},safe=False,status=status.HTTP_201_CREATED)
            return JsonResponse({"message":"no such user"},safe=False,status=status.HTTP_400_BAD_REQUEST) 
        except Exception as e:
            return JsonResponse({"message":"No such username or Phone No. found"},status=status.HTTP_400_BAD_REQUEST)
        




class InvoiceActions(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = json.loads(request.body)
        data["user"] = request.user.id
        serializer = InvoicesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "Invoice Created"})
        return JsonResponse(serializer.errors, safe=False)

    def get(self, request):
        invoices = Invoices.objects.filter(user=request.user.id)
        serializer = InvoicesSerializer(invoices, many=True).data
        return JsonResponse(serializer, safe=False)


class SpecificInvoices(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, invoice_id):
        try:
            invoices = Invoices.objects.get(user=request.user.id, invoice_id=invoice_id)
            serializer = InvoicesSerializer(invoices).data
            return JsonResponse(serializer, safe=False)
        except:
            return JsonResponse({"message": "Invoice not found"})
        

    def post(self, request, invoice_id):
        data = json.loads(request.body)
        data["invoice"] = invoice_id
        serializer = ItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "Item added to invoice"})
        return JsonResponse(serializer.errors, safe=False)

