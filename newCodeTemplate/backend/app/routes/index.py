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

@app.route('/district-station/<district>')
def _get_stations_by_district(district):
    result = dataService.get_stations_by_district(district)
    return json.dumps(result)

@app.route('/district-info/<district>')
def _get_district_info(district):
    result = dataService.get_district_info(district)
    return json.dumps(result)

@app.route('/mapview/<district>')
def _get_mapview(district):
    result = dataService.get_mapview_data(district)
    return json.dumps(result)

@app.route('/station/<station>')
def _get_station_info(station):
    result = dataService.get_station_info(station)
    return json.dumps(result)

if __name__ == '__main__':
    pass
