from flask import Flask, render_template, request, abort
import os

app = Flask(__name__, template_folder='./static', static_folder='./static')

# Хранение токенов пользователей (синхронизировано с ботом)
user_tokens = {
    'datsenko_artem123': 'E9k1Lvj8XhZH6_u7oQpI5g'
}


@app.route('/app', methods=['GET'])
def login():
    token = request.args.get('token')
    if not token or token not in user_tokens.values():
        abort(403)  # Доступ запрещен
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8000)), debug=True)
