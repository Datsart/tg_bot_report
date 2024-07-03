import telebot

# Замените 'YOUR TOKEN HERE' на токен вашего бота
TOKEN = '7288692579:AAHwZkS2aYriBJnnHNchC9gPx7S9gNQRllM'

# Список разрешенных пользователей
ALLOWED_USERS = {'', 'user2', 'user3'}

bot = telebot.TeleBot(TOKEN)


@bot.message_handler(commands=['start'])
def handle_start(message):
    user = message.from_user.username
    if user not in ALLOWED_USERS:
        bot.send_message(message.chat.id, "Access denied.")
        return

    bot.send_message(message.chat.id, "Hello, you have access!")


@bot.message_handler(func=lambda message: message.text.startswith('/') or message.text.startswith('!'))
def handle_text(message):
    pass  # Игнорируем команды и специальные символы


def main():
    bot.polling(none_stop=True)


if __name__ == '__main__':
    main()
