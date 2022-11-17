# Global variables
# ##############################
import os

test = os.getcwd()

_current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = "D:/coding/codeTemplate/backend/app/data"

# data folder
DATA_FOLDER = os.path.join(_current_dir, '../data/')  
# image folder
IMAGE_FOLDER = DATA_FOLDER

# video folder
VIDEO_FOLDER = '{}/video'.format(root_dir)

# video folder
POSE_FOLDER = '{}/Test/kpts'.format(DATA_FOLDER)