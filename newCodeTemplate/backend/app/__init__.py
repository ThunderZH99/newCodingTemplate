# -*- coding: UTF-8 -*-
from flask import Flask
from flask_cors import CORS
from app.dataService.dataService import DataService

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

# flask_cors: Cross Origin Resource Sharing (CORS), making cross-origin AJAX possible.
CORS(app)

dataService = DataService()

from app.routes import index