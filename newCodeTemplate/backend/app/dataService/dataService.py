# -*- coding: utf-8 -*-
import time
import json
import pandas as pd
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

    def get_stations_by_district(self,district):
        print("选择了",district)

        data = pd.read_csv("{}/station_info.csv".format(GV.DATA_FOLDER))
        data = data[data["district"]==district]

        result = json.loads(data.to_json(orient="records"))

        return result
    
    def get_district_info(self,district):
        data = pd.read_csv("{}/district_info.csv".format(GV.DATA_FOLDER))
        data = data[data["district"]==district]

        result = json.loads(data.to_json(orient="records"))
        result = result[0]

        return result
    
    def get_mapview_data(self,district):
        folder = "{}/{}/".format(GV.MAPVIEW_FOLDER,district)

        result = []
        for file in os.listdir(folder):
            file_path = folder + file
            with open(file_path, "r", encoding="utf-8") as f:
                station_info = json.load(f)

            result.append(station_info) 
                   
        
        return result
    
    def get_station_info(self,station):
        with open("{}/DataView/{}.json".format(GV.DATA_FOLDER,station),'r') as f:
            result = json.load(f)

        return result


if __name__ == '__main__':
    dataService = DataService()




