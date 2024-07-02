from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

TELEGRAM_BOT_TOKEN = '7147479868:AAEIJKh9iq4dApecwsUbUKQUAPzOW3_ja8E'
TELEGRAM_API_URL = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}'


@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    chat_id = data['message']['chat']['id']
    text = data['message']['text']

    if text == '/start':
        send_message(chat_id, "Добро пожаловать в наше мини-приложение!")
    elif text == '/webapp':
        send_webapp_button(chat_id)

    return jsonify({'status': 'ok'})


def send_message(chat_id, text):
    url = f'{TELEGRAM_API_URL}/sendMessage'
    payload = {'chat_id': chat_id, 'text': text}
    requests.post(url, json=payload)


def send_webapp_button(chat_id):
    url = f'{TELEGRAM_API_URL}/sendMessage'
    payload = {
        'chat_id': chat_id,
        'text': 'Откройте веб-приложение',
        'reply_markup': {
            'inline_keyboard': [[{
                'text': 'Открыть',
                'web_app': {'url': 'YOUR_WEB_APP_URL'}
            }]]
        }
    }
    requests.post(url, json=payload)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(port=5000)
