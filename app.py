from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder='static', template_folder='static')


@app.route('/app', methods=['GET', 'POST'])
def login():
    list_users = ['datsenko_artem123']
    return render_template('index.html', list_users=list_users)


# Маршрут для файла app.js
@app.route('/app.js')
def serve_js():
    return send_from_directory('.', 'app.js')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
