from flask import Flask, render_template, send_from_directory, request
import telebot
from flask_cors import CORS

app = Flask(__name__, static_folder='static', template_folder='static')
CORS(app)


def send_errors(chat_id, name):
    bot = telebot.TeleBot('7288692579:AAHwZkS2aYriBJnnHNchC9gPx7S9gNQRllM')
    bot.send_message(chat_id, f'Здравствуйте {name}')


def get_data(chat_id, data):
    bot = telebot.TeleBot('7288692579:AAHwZkS2aYriBJnnHNchC9gPx7S9gNQRllM')
    bot.send_message(chat_id, f'{data}')


@app.route('/app', methods=['GET', 'POST'])
def login():
    list_users = ['datsenko_artem123', 'RayVik', 'sergeyskiba']
    url_for_post = '/post_response'
    # url_for_post_test_api = 'http://83.239.206.206:5556/test'
    url_for_post_test_api = '/test'
    return render_template('index.html', list_users=list_users, url_for_post=url_for_post,
                           url_for_post_test_api=url_for_post_test_api)


@app.route('/post_response', methods=['GET', 'POST'])
def take_info():
    data = request.get_json()  # ответ с фронта
    send_errors(chat_id=int(data['chat_id']), name=str(data['name']))
    return data


@app.route('/test', methods=['GET', 'POST'])
def func():
    data = request.get_json()
    get_data(chat_id=int(data['chat_id']), data=data)
    return data


# Маршрут для файла app.js
@app.route('/app.js')
def serve_js():
    return send_from_directory('.', 'app.js')


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
