import telebot
from telebot import types
from settings import Settings
import secrets

token = f'{Settings.tg_bot_token}'

bot = telebot.TeleBot(token)
bot.remove_webhook()

# Список разрешенных пользователей, указываем ник без собаки!!!
ALLOWED_USERS = [f'{Settings.my_name}']

# Хранение токенов пользователей
user_tokens = {}


def is_user_allowed(username):
    return username in ALLOWED_USERS


@bot.message_handler(commands=['command1', 'command2'])
def create_second_menu(message):
    if is_user_allowed(message.from_user.username):
        if message.text == '/command1' or message.text == '/command2':
            second_menu(message.chat.id)
    else:
        bot.send_message(message.chat.id, "Извините, у вас нет доступа к этому боту.")


@bot.message_handler(commands=['start'])
def services(message):
    if is_user_allowed(message.from_user.username):
        # Генерация токена для пользователя
        token = secrets.token_urlsafe(16)
        user_tokens[message.from_user.username] = token
        bot.send_message(message.chat.id, f'Ваш токен для доступа к веб-странице: {token}')
        second_menu(message.chat.id)
    else:
        bot.send_message(message.chat.id, "Извините, у вас нет доступа к этому боту.")


# Состояние выбранных проектов из 2го и 3го меню
selected_projects = {
    'project_a': False,
    'project_b': False,
    'project_c': False,
    'apart_studio': False,
    'apart_1k': False,
    'apart_2k': False,
    'apart_3k': False,
}


def get_checkbox_text(project_key, project_name):
    return '✅ ' + project_name if selected_projects[project_key] else project_name


def second_menu(chat_id):
    keyboard = types.InlineKeyboardMarkup()
    key_1 = types.InlineKeyboardButton(text=get_checkbox_text('project_a', 'Проект А'),
                                       callback_data='toggle_project_a')
    keyboard.add(key_1)
    key_2 = types.InlineKeyboardButton(text=get_checkbox_text('project_b', 'Проект Б'),
                                       callback_data='toggle_project_b')
    keyboard.add(key_2)
    key_3 = types.InlineKeyboardButton(text=get_checkbox_text('project_c', 'Проект С'),
                                       callback_data='toggle_project_c')
    keyboard.add(key_3)
    key_4 = types.InlineKeyboardButton(text='Выбрать все', callback_data='select_all_second')
    keyboard.add(key_4)
    key_5 = types.InlineKeyboardButton(text='Далее', callback_data='second_next')
    keyboard.add(key_5)
    bot.send_message(chat_id, 'Меню проектов', reply_markup=keyboard)


def third_menu(chat_id):
    keyboard = types.InlineKeyboardMarkup()
    key_1 = types.InlineKeyboardButton(text=get_checkbox_text('apart_studio', 'Студия'),
                                       callback_data='toggle_apart_studio')
    keyboard.add(key_1)
    key_2 = types.InlineKeyboardButton(text=get_checkbox_text('apart_1k', '1к. квартира'),
                                       callback_data='toggle_apart_1k')
    keyboard.add(key_2)
    key_3 = types.InlineKeyboardButton(text=get_checkbox_text('apart_2k', '2к. квартира'),
                                       callback_data='toggle_apart_2k')
    keyboard.add(key_3)
    key_4 = types.InlineKeyboardButton(text=get_checkbox_text('apart_3k', '3к. квартира'),
                                       callback_data='toggle_apart_3k')
    keyboard.add(key_4)
    key_5 = types.InlineKeyboardButton(text='Выбрать все', callback_data='select_all_third')
    keyboard.add(key_5)
    key_6 = types.InlineKeyboardButton(text='Далее', callback_data='third_next')
    keyboard.add(key_6)
    key_7 = types.InlineKeyboardButton(text='Назад', callback_data='third_back')
    keyboard.add(key_7)
    bot.send_message(chat_id, 'Меню помещений', reply_markup=keyboard)


def four_menu(chat_id):
    keyboard = types.InlineKeyboardMarkup()
    key_1 = types.InlineKeyboardButton(text='Общая статистика', callback_data='general_statistic')
    keyboard.add(key_1)
    key_2 = types.InlineKeyboardButton(text='В разделе литера', callback_data='liter_statistic')
    keyboard.add(key_2)
    key_3 = types.InlineKeyboardButton(text='Назад', callback_data='four_back')
    keyboard.add(key_3)
    bot.send_message(chat_id, 'Как ищем', reply_markup=keyboard)


def select_period(chat_id):
    keyboard = types.InlineKeyboardMarkup()
    key_3 = types.InlineKeyboardButton(text='Назад', callback_data='select_period_back')
    keyboard.add(key_3)
    bot.send_message(chat_id, 'Выбрать период', reply_markup=keyboard)


@bot.callback_query_handler(func=lambda call: True)
def callback_query(call):
    if is_user_allowed(call.from_user.username):
        if call.data.startswith('toggle_project'):
            project_key = call.data.split('_')[-1]
            selected_projects[f'project_{project_key}'] = not selected_projects[f'project_{project_key}']
            second_menu(call.message.chat.id)
        elif call.data.startswith('toggle_apart'):
            project_key = call.data.split('_')[-1]
            selected_projects[f'apart_{project_key}'] = not selected_projects[f'apart_{project_key}']
            third_menu(call.message.chat.id)
        elif call.data == 'select_all_second':
            all_selected = all(selected_projects[key] for key in ['project_a', 'project_b', 'project_c'])
            for key in ['project_a', 'project_b', 'project_c']:
                selected_projects[key] = not all_selected
            second_menu(call.message.chat.id)
        elif call.data == 'select_all_third':
            all_selected = all(selected_projects[key] for key in ['apart_studio', 'apart_1k', 'apart_2k', 'apart_3k'])
            for key in ['apart_studio', 'apart_1k', 'apart_2k', 'apart_3k']:
                selected_projects[key] = not all_selected
            third_menu(call.message.chat.id)
        elif call.data == 'second_next':
            third_menu(call.message.chat.id)
        elif call.data == 'third_back':
            second_menu(call.message.chat.id)
        elif call.data == 'third_next':
            four_menu(call.message.chat.id)
        elif call.data == 'four_back':
            third_menu(call.message.chat.id)
        elif call.data == 'general_statistic' or call.data == 'liter_statistic':
            select_period(call.message.chat.id)
        elif call.data == 'select_period_back':
            four_menu(call.message.chat.id)
    else:
        bot.send_message(call.message.chat.id, "Извините, у вас нет доступа к этому боту.")


bot.polling(none_stop=True, interval=0)
