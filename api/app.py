from flask import Flask, render_template, send_from_directory, request, jsonify
import telebot
from flask_cors import CORS
import json
import requests

app = Flask(__name__, static_folder='../templates', template_folder='../templates')
CORS(app)


def send_errors(chat_id, name):
    bot = telebot.TeleBot('7288692579:AAHwZkS2aYriBJnnHNchC9gPx7S9gNQRllM')
    bot.send_message(chat_id, f'Здравствуйте {name}')


def get_data(chat_id, data):
    bot = telebot.TeleBot('7288692579:AAHwZkS2aYriBJnnHNchC9gPx7S9gNQRllM')
    bot.send_message(chat_id, f'{data}')


def send_data(chat_id, data):
    url = "http://83.239.206.206:5556/test"

    payload = json.dumps({
        "global_filters": {
            "build__id": []
        },
        "liter__id": [],
        "period_start": "2024-06-01",
        "period_end": "2024-06-30",
        "data": data,
    })
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.post(url, headers=headers, data=payload)

    bot = telebot.TeleBot('7288692579:AAHwZkS2aYriBJnnHNchC9gPx7S9gNQRllM')
    bot.send_message(chat_id, f'{response.json()}')


@app.route('/app', methods=['GET', 'POST'])
def login():
    list_users = ['datsenko_artem123', 'RayVik', 'sergeyskiba']
    url_for_post = '/post_response'
    url_for_post_test_api = '/test'
    return render_template('index.html', list_users=list_users, url_for_post=url_for_post,
                           url_for_post_test_api=url_for_post_test_api)


@app.route('/post_response', methods=['GET', 'POST'])
def take_info():
    data = request.get_json()  # ответ с фронта
    send_errors(chat_id=int(data['chat_id']), name=str(data['name']))
    return data


@app.route('/test', methods=['POST'])
def func():
    data = request.get_json()
    bot = telebot.TeleBot('7288692579:AAHwZkS2aYriBJnnHNchC9gPx7S9gNQRllM')
    bot.send_message(int(data['chat_id']), f'Ожидайте')
    url = "http://83.239.206.206:5556/test"
    payload = json.dumps({
        "global_filters": {
            "build__id": []
        },
        "liter__id": [],
        "period_start": "2024-06-01",
        "period_end": "2024-06-30",
        "data": data,
    })
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.post(url, headers=headers, data=payload, timeout=(60, 60))
    bot.send_message(int(data['chat_id']), f'{response.json()}')
    return data


# Маршрут для файла app.js
@app.route('/app.js')
def serve_js():
    return send_from_directory('..', 'app.js')


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
