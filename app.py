from flask import Flask, render_template, send_from_directory, request, session, redirect, url_for

app = Flask(__name__, static_folder='static', template_folder='static')
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'  # Пример случайного сгенерированного ключа

ALLOWED_USERS = {'user1', 'user2', 'user3'}


@app.route('/app', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in ALLOWED_USERS and password == 'your_password_here':
            session['username'] = username  # Устанавливаем сессию для авторизованного пользователя
            return redirect(url_for('serve_js'))  # Перенаправляем на страницу с JavaScript
        else:
            return render_template('index.html', error='Invalid credentials')
    else:
        if 'username' in session:
            return redirect(
                url_for('serve_js'))  # Если пользователь уже авторизован, перенаправляем на страницу с JavaScript
        else:
            return render_template('index.html')


@app.route('/app.js')
def serve_js():
    if 'username' in session:
        return send_from_directory('.', 'app.js')
    else:
        return redirect(url_for('login'))  # Если пользователь не авторизован, перенаправляем на страницу входа


@app.route('/logout')
def logout():
    session.pop('username', None)  # Удаляем сессию пользователя при выходе
    return redirect(url_for('login'))  # Перенаправляем на страницу входа после выхода


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
