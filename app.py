from flask import Flask, render_template
import os

app = Flask(__name__, template_folder='./static', static_folder='./static')


@app.route('/app', methods=['GET', 'POST'])
def login():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
    # ssl_context = (os.path.join('', 'ssl', 'fullchain.pem'), os.path.join('', 'ssl', 'privkey.pem'))
    # app.run(host='0.0.0.0', port=5000, ssl_context=ssl_context)
