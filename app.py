from flask import Flask, render_template, send_from_directory, request, jsonify
import json
import telebot

app = Flask(__name__, static_folder='static', template_folder='static')


def send_errors(chat_id, name):
    bot = telebot.TeleBot('7288692579:AAHwZkS2aYriBJnnHNchC9gPx7S9gNQRllM')
    # доделать приветсвие
    bot.send_message(chat_id, f'Здравствуйте {name}')


@app.route('/app', methods=['GET', 'POST'])
def login():
    list_users = ['datsenko_artem123']
    url_for_post = '/post_response'
    return render_template('index.html', list_users=list_users, url_for_post=url_for_post)


@app.route('/post_response', methods=['GET', 'POST'])
def take_info():
    data = request.get_json()  # ответ с фронта
    print(data)
    send_errors(chat_id=data['chat_id'], name=data['name'])
    return json.loads(data)


# Маршрут для файла app.js
@app.route('/app.js')
def serve_js():
    return send_from_directory('.', 'app.js')


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)

