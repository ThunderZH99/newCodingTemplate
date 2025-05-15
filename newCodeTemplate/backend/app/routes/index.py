'''
    The RESTful style api server
'''

from app import app
from app import dataService

import json

from flask import request

# ################################################################################ route
@app.route('/')
def index():
    print('main url!')
    return json.dumps('/')
    # return render_template('index.html')

@app.route('/test')   # 请求该数据的URL
def test():
    result = {"test":123}
    return json.dumps(result)  # 返回json格式的数据给前端

@app.route('/postTest',methods=['POST'])   #注明接收post请求
def _get_post_data():
    post_request = request.json   #post请求的原始数据比较复杂,用.json方式直接获得我们需要的内容
    print("收到post请求:", post_request)
    result = {"test":'post'}
    return json.dumps(result)  # 返回json格式的数据给前端

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
