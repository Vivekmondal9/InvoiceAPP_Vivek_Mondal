from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self,username,password,**extra_field):
        if not username:
            raise ValueError('Username is required!!')
        user=self.model(username=username,**extra_field)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self,username,password,**extra_field):
        extra_field.setdefault('is_staff',True)
        extra_field.setdefault('is_superuser',True)
        return self.create_user(username,password,**extra_field)
    

class User(AbstractUser):
    id=models.AutoField(primary_key=True)
    first_name=models.CharField(max_length=500)
    last_name=models.CharField(max_length=500)
    email=models.EmailField(unique=True)
    username=models.CharField(max_length=200,unique=True)
    phone=models.CharField(max_length=20)
    password=models.CharField(max_length=20)

    USERNAME_FIELD='username'

    objects=UserManager()


class Invoices(models.Model):
    invoice_id=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE ,related_name='user')
    client_name=models.CharField(max_length=500)
    date=models.DateField()


class Items(models.Model):
    id=models.AutoField(primary_key=True)
    invoice=models.ForeignKey(Invoices,on_delete=models.CASCADE,related_name='items')
    description=models.CharField(max_length=500)
    rate=models.FloatField()
    quantity=models.IntegerField()    






