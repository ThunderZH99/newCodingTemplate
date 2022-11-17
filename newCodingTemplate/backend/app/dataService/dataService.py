# -*- coding: utf-8 -*-
import time
import json
import os
import sys
import cv2

try:
    import GlobalVariable as GV
except ImportError:
    import app.dataService.GlobalVariable as GV

class DataService(object):
    def __init__(self):
        self.GV = GV
        print('=================================================')
        return

    def initialization(self, video_id):
        self.video_id = video_id
        result = {'test': 'test'}
        return result

    def test(self):
        print(self.GV.test)

    def get_line_chart_data(self):
        with open('{}/lineChartData.json'.format(GV.DATA_FOLDER), 'r') as rf:
            result = json.load(rf)
        return result

    def get_daily_data(self):
        # url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=000002.SHZ&outputsize=full&apikey=M15904HIK3NOBPVR"
        # r = requests.get(url)
        with open('{}/StockDataDaily.json'.format(GV.DATA_FOLDER), 'r') as rf:
            result = json.load(rf)
        return result 



if __name__ == '__main__':
    dataService = DataService()




