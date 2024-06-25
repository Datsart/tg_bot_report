import json
from flask import Flask, request, jsonify
from random import randint

app = Flask(__name__)


@app.route('/')
def text():
    return jsonify({'msg': f'Your random number: {randint(1, 100)}'})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
