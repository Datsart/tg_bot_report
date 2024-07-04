from flask import Flask, render_template, send_from_directory, request, jsonify

app = Flask(__name__, static_folder='static', template_folder='static')


@app.route('/app', methods=['GET', 'POST'])
def login():
    list_users = ['datsenko_artem123']
    url_for_post = request.url_root + 'post_response'

    return render_template('index.html', list_users=list_users, url_for_post=url_for_post)


@app.route('/post_response', methods=['GET', 'POST'])
def take_info():
    data = request.get_json()  # ответ с фронта
    print(data)
    return jsonify(data)


# Маршрут для файла app.js
@app.route('/app.js')
def serve_js():
    return send_from_directory('.', 'app.js')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
