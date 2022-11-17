'''
    The RESTful style api server
'''
from pprint import pprint

from app import app
from app import dataService

import json
import numpy as np
import os
import re
import logging
import mimetypes
import subprocess

from flask import send_file, request, jsonify, render_template, send_from_directory, Response
from flask_cors import cross_origin

LOG = logging.getLogger(__name__)

MB = 1 << 20
BUFF_SIZE = 10 * MB
# ################################################################################ route
@app.route('/')
def index():
    print('main url!')
    return json.dumps('/')
    # return render_template('index.html')

@app.route('/test')
def test():
    return json.dumps('test')

@app.route('/linechart')
def _get_line_chart():
    result = dataService.get_line_chart_data()
    return json.dumps(result)

@app.route('/stock/daily')
def _get_volume_chart():
    result = dataService.get_daily_data()
    return json.dumps(result)

@app.route('/videoInfo/<video_id>')
def _get_video_info(video_id):
    result = dataService.get_video_info(video_id)
    return json.dumps(result)

if __name__ == '__main__':
    pass
