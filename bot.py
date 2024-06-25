import telebot
from telebot import types
import requests

token = '7288692579:AAHwZkS2aYriBJnnHNchC9gPx7S9gNQRllM'

bot = telebot.TeleBot(token)

# Список разрешенных пользователей
# указываем ник без собаки!!!
ALLOWED_USERS = ['']


def is_user_allowed(username):
    return username in ALLOWED_USERS


def send_routes(chat_id):
    # кнопки
    # callback_data - на какой роут перекидывает при нажатии
    keyboard = types.InlineKeyboardMarkup()
    key_1 = types.InlineKeyboardButton(text='Кнопка 1', callback_data='/')
    keyboard.add(key_1)
    key_2 = types.InlineKeyboardButton(text='Кнопка 2', callback_data='button2')
    keyboard.add(key_2)
    key_3 = types.InlineKeyboardButton(text='Кнопка 3', callback_data='button3')
    keyboard.add(key_3)
    key_4 = types.InlineKeyboardButton(text='Кнопка 4', callback_data='button4')
    keyboard.add(key_4)
    key_5 = types.InlineKeyboardButton(text='Кнопка 5', callback_data='button5')
    keyboard.add(key_5)
    bot.send_message(chat_id, 'Кнопки', reply_markup=keyboard)


@bot.message_handler(content_types=['text'])
def services(message):
    if is_user_allowed(message.from_user.username):
        send_routes(message.chat.id)
    else:
        bot.send_message(message.chat.id, "Извините, у вас нет доступа к этому боту.")


@bot.callback_query_handler(func=lambda call: True)
def callback_query(call):
    if call.data == '/':
        response = requests.get('http://127.0.0.1:8000').json()  # Отправляем запрос к Flask серверу
        bot.send_message(call.message.chat.id, response['msg'])
        send_routes(call.message.chat.id)

    elif call.data == 'button2':
        bot.answer_callback_query(call.id, "Вы нажали кнопку 2")
    elif call.data == 'button3':
        bot.answer_callback_query(call.id, "Вы нажали кнопку 3")
    elif call.data == 'button4':
        bot.answer_callback_query(call.id, "Вы нажали кнопку 4")
    elif call.data == 'button5':
        bot.answer_callback_query(call.id, "Вы нажали кнопку 5")


bot.polling(none_stop=True, interval=0)
