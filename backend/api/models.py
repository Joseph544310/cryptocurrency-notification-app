from django.db import models
from django.contrib.auth.models import User

class Currency(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=100)

class Alert(models.Model):
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE, default=1)
    direction = models.CharField(choices=[('UP', 'Up'), ('DOWN', 'Down')], max_length=100, default='UP')
    type = models.CharField(choices=[('PERCENTAGE', 'Percentage'), ('FIXED', 'Fixed')], max_length=100, default='DOWN')
    amount = models.FloatField(default=0.0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='alerts')