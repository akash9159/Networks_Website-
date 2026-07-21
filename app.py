from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object("config.Config")

CORS(app)

from routes import *

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )