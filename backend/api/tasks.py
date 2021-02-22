import requests
from datetime import datetime, timedelta
from .models import Alert, Currency
from django.conf import settings

def task():
    headers = {'X-CoinAPI-Key': settings.X-CoinAPI-Key}

    prices = {}

    for currency in Currency.objects.all():

        price_today = requests.get('https://rest.coinapi.io/v1/exchangerate/{}}/USD'.format(currency.code), headers=headers).json()['rate']
        yesterday = datetime.strftime(datetime.now() - timedelta(1), '%Y-%m-%d') + 'T00:00:00'
        price_yesterday = requests.get('https://rest.coinapi.io/v1/exchangerate/{}/USD?time={}'.format(currency.code, yesterday), headers=headers).json()['rate']

        prices[currency.code] = {
            'today': price_today,
            'yesterday': price_yesterday
        }
        # print(price_today)
        # print(price_yesterday)
        # print(percentage_change)


    for alert in Alert.objects.all():
        price_today = prices[alert.currency.code]['today']
        price_yesterday = prices[alert.currency.code]['yesterday']
        percentage_change = ((price_today - price_yesterday)/price_yesterday) * 100 

        if (type == 'FIXED'):
            if (alert.direction == 'DOWN' and price_today<alert.amount):
                print('send mail to {} because price is below {} USD'.format(alert.user, alert.amount))
            
            if (alert.direction == 'UP' and price_today>alert.amount):
                print('send mail to {} because price is above {} USD'.format(alert.user, alert.amount))
            

        if (type == 'PERCENTAGE'):
            if (alert.direction == 'DOWN' and percentage_change <= -alert.amount):
                print('send mail to {} because price got down by {} %'.format(alert.user, alert.amount))
            
            if (alert.direction == 'UP' and percentage_change >= alert.amount):
                print('send mail to {} because price got up by {} %'.format(alert.user, alert.amount))
            
