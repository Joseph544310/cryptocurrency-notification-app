import requests
from datetime import datetime, timedelta
from .models import Alert, Currency
from django.conf import settings
from django.core.mail import send_mail
from celery import shared_task

@shared_task
def send_notifications():

    X_COINAPI_KEY= '941715D1-BD5A-46A8-B9C2-AF89194239ED'
    EMAIL_HOST_USER = 'crypto.notifications.django@gmail.com'
    EMAIL_HOST_PASSWORD = 'Seelk-Hacking-Game!'

    # Mail
    subject = 'Notification regarding cryptocurrency exchange rate'
    from_email = EMAIL_HOST_USER
    headers = {'X-CoinAPI-Key': X_COINAPI_KEY}

    # Time
    yesterday = datetime.strftime(datetime.now() - timedelta(1), '%Y-%m-%d') + 'T00:00:00'

    # API Data
    prices = {}

    for currency in Currency.objects.all():

        price_today = requests.get('https://rest.coinapi.io/v1/exchangerate/{}/USD'.format(currency.code), headers=headers).json()['rate']
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

        if (alert.type == 'FIXED'):
            if (alert.direction == 'DOWN' and price_today < alert.amount):
                message = 'Hello {}, this is to notify you that {} price is below {} USD'.format(alert.user, alert.currency.name, alert.amount)
                send_mail(subject, message, from_email, [alert.user.email], auth_user=EMAIL_HOST_USER, auth_password=EMAIL_HOST_PASSWORD)         
            
            if (alert.direction == 'UP' and price_today > alert.amount):
                message = 'Hello {}, this is to notify you that {} price is above {} USD'.format(alert.user, alert.currency.name, alert.amount)
                send_mail(subject, message, from_email, [alert.user.email], auth_user=EMAIL_HOST_USER, auth_password=EMAIL_HOST_PASSWORD)
            
        if (alert.type == 'PERCENTAGE'):
            if (alert.direction == 'DOWN' and percentage_change <= -alert.amount):
                message = 'Hello {}, this is to notify you that {} price got down by {} %'.format(alert.user, alert.currency.name, alert.amount)
                send_mail(subject, message, from_email, [alert.user.email], auth_user=EMAIL_HOST_USER, auth_password=EMAIL_HOST_PASSWORD)
            
            if (alert.direction == 'UP' and percentage_change >= alert.amount):
                message = 'Hello {}, this is to notify you that {} price got up by {} %'.format(alert.user, alert.currency.name, alert.amount)
                send_mail(subject, message, from_email, [alert.user.email], auth_user=EMAIL_HOST_USER, auth_password=EMAIL_HOST_PASSWORD)
            