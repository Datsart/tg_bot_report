from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext

# Вставьте свой токен здесь
TOKEN = '7147479868:AAEIJKh9iq4dApecwsUbUKQUAPzOW3_ja8E'

def start(update: Update, context: CallbackContext) -> None:
    update.message.reply_text('Привет! Вот ссылка на наше мини-приложение: https://your-domain.com')

def main():
    # Создаем экземпляр Updater и передаем ему токен вашего бота
    updater = Updater(token=TOKEN, use_context=True)

    # Получаем диспетчера для регистрации обработчиков
    dispatcher = updater.dispatcher

    # Регистрируем обработчики команд
    dispatcher.add_handler(CommandHandler("start", start))

    # Запускаем бота
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
