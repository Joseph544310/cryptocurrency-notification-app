from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have a valid e-mail address')
 
        user = self.model(email=self.normalize_email(email),)
        user.set_password(password)
        user.save(using=self._db)
 
        return user
 
    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
 
        return user

 
class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
 
    USERNAME_FIELD = 'email'
 
    objects = UserManager()
 
    def __unicode__(self):
        return self.email
 
    def has_perm(self, perm, obj=None):
        return True
 
    def has_module_perms(self, app_label):
        return True
 
    def get_full_name(self):
        return self.email
 
    def get_short_name(self):
        return self.email


class Alert(models.Model):
    title = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)