import requests
from datetime import datetime, timedelta
from .models import Alert, Currency
from django.conf import settings
from django.core.mail import send_mail
from celery.task.schedules import crontab
from celery.decorators import periodic_task

@periodic_task(run_every=(crontab(day='*/1')), name="send_notifications", ignore_result=True)
def task():
    # Mail
    subject = 'Notification regarding cryptocurrency exchange rate'
    from_email = settings.EMAIL_HOST_USER
    headers = {'X-CoinAPI-Key': settings.X_CoinAPI_Key}

    # API Data
    prices = {}

    for currency in Currency.objects.all():

        price_today = requests.get('https://rest.coinapi.io/v1/exchangerate/{}/USD'.format(currency.code), headers=headers).json()['rate']
        yesterday = datetime.strftime(datetime.now() - timedelta(1), '%Y-%m-%d') + 'T00:00:00'
        price_yesterday = requests.get('https://rest.coinapi.io/v1/exchangerate/{}/USD?time={}'.format(currency.code, yesterday), headers=headers).json()['rate']

        prices[currency.code] = {
            'today': price_today,
            'yesterday': price_yesterday
        }

    # Checking to see who should be sent a notification
    for alert in Alert.objects.all():
        price_today = prices[alert.currency.code]['today']
        price_yesterday = prices[alert.currency.code]['yesterday']
        percentage_change = ((price_today - price_yesterday)/price_yesterday) * 100 

        if (type == 'FIXED'):
            if (alert.direction == 'DOWN' and price_today < alert.amount):
                message = 'Hello {}, this is to notify you that {} price is below {} USD'.format(alert.user, alert.currency.name, alert.amount))
                send_mail(subject, message, from_email, [alert.user.email], fail_silently=True])
            
            if (alert.direction == 'UP' and price_today > alert.amount):
                message = 'Hello {}, this is to notify you that {} price is above {} USD'.format(alert.user, alert.currency.name, alert.amount))
                send_mail(subject, message, from_email, [alert.user.email], fail_silently=True])
            
        if (type == 'PERCENTAGE'):
            if (alert.direction == 'DOWN' and percentage_change <= -alert.amount):
                message = 'Hello {}, this is to notify you that {} price got down by {} %'.format(alert.user, alert.currency.name, alert.amount))
                send_mail(subject, message, from_email, [alert.user.email], fail_silently=True])
            
            if (alert.direction == 'UP' and percentage_change >= alert.amount):
                message = 'Hello {}, this is to notify you that {} price got up by {} %'.format(alert.user, alert.currency.name, alert.amount))
                send_mail(subject, message, from_email, [alert.user.email], fail_silently=True])
            
