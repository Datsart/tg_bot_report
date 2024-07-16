import telebot


class Settings:
    tg_bot_token = '7288692579:AAHwZkS2aYriBJnnHNchC9gPx7S9gNQRllM'
    # список юзеров которым доступно приложение (без собаки имя юзера)
    list_users = ['datsenko_artem123', 'RayVik', 'sergeyskiba', 'palxlan']
    # урл нашей АПИ
    our_url_api = 'http://83.239.206.206:5556/test'
    # бот
    bot = telebot.TeleBot(tg_bot_token)
