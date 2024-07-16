from flask import Flask, render_template, send_from_directory, request
import telebot
from flask_cors import CORS
import json
import requests
from settings import Settings

app = Flask(__name__, static_folder='../templates', template_folder='../templates')
CORS(app)


def hello_user_tg(chat_id, name):
    '''приветсвие юзера в тг сообщении'''
    Settings.bot.send_message(chat_id, f'Здравствуйте {name}')


@app.route('/app', methods=['GET', 'POST'])
def login():
    '''отрисовка веба'''
    # урлы на которые перекидываем работу приложения
    url_for_post = '/post_response'
    url_for_post_test_api = '/test'
    return render_template('index.html', list_users=Settings.list_users, url_for_post=url_for_post,
                           url_for_post_test_api=url_for_post_test_api)


@app.route('/post_response', methods=['GET', 'POST'])
def take_info():
    '''приветсвие юзера в ТГ сообщении'''
    data = request.get_json()  # ответ с фронта
    hello_user_tg(chat_id=int(data['chat_id']), name=str(data['name']))
    return data


@app.route('/test', methods=['POST'])
def func():
    '''отправка запроса на наше АПИ с моими данными из фронта'''
    data = request.get_json()

    # отправка СМС об ожидании отчета
    Settings.bot.send_message(int(data['chat_id']), f'Ожидайте')

    payload = json.dumps({
        "global_filters": {
            "build__id": []
        },
        "liter__id": [],
        "period_start": "2024-06-01",
        "period_end": "2024-06-30",
        "data": data,  # мои данные с фронта
    })
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.post(Settings.our_url_api, headers=headers, data=payload, timeout=(60, 60))

    # сообщение в ТГ с ответом с нашей АПИ - то есть отчет
    Settings.bot.send_message(int(data['chat_id']), f'{response.json()}')
    return data


# Маршрут для файла app.js
@app.route('/app.js')
def serve_js():
    return send_from_directory('..', 'app.js')


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
