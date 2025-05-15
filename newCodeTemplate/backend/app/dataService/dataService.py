# -*- coding: utf-8 -*-
import json
import pandas as pd
import os


class DataService(object):
    def __init__(self):
        print('=================================================')
        return


    def get_stations_by_district(self,district):
        data = pd.read_csv("./app/data/station_info.csv")
        data = data[data["district"]==district]

        result = json.loads(data.to_json(orient="records"))

        return result
    
    def get_district_info(self,district):
        data = pd.read_csv("./app/data/district_info.csv")
        data = data[data["district"]==district]

        result = json.loads(data.to_json(orient="records"))
        result = result[0]

        return result
    
    def get_mapview_data(self,district):
        folder = "./app/data/MapView/{}/".format(district)

        result = []
        for file in os.listdir(folder):
            file_path = folder + file
            with open(file_path, "r", encoding="utf-8") as f:
                station_info = json.load(f)

            result.append(station_info) 
                   
        return result
    
    def get_station_info(self,station):
        with open("./app/data/DataView/{}.json".format(station),'r') as f:
            result = json.load(f)

        return result


if __name__ == '__main__':
    dataService = DataService()




