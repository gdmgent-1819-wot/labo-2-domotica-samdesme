from sense_hat import SenseHat
from time import time, sleep
import os
import sys
import random
from math import floor, ceil
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# constants
COLOR_RED = (255, 0, 0)
COLOR_GREEN = (0, 255, 0)
COLOR_BLUE = (0, 0, 255)
COLOR_YELLOW = (255, 255, 0)


serviceAccountKey = "./../../keys/arcadekey.json"
databaseURL = "https://wot-labo2-samdesme.firebaseio.com/"