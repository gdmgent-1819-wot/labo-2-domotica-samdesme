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
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (173, 216, 230)
YELLOW = (255, 255, 0)
DARK_RED = (139, 0, 0)
DARK_GREEN = (0, 100, 0)
DARK_BLUE = (0, 255, 0)
DARK_YELLOW = (189, 216, 230)
WHITE = (255,255,255)

serviceAccountKey = '../wot-labo2-samdesme-firebase-adminsdk-53u5f-93c77bb6c6.json'
databaseURL = "https://wot-labo2-samdesme.firebaseio.com/"

try:
    firebase_cred = credentials.Certificate(serviceAccountKey)
    firebase_admin.initialize_app(firebase_cred, {
    'databaseURL': databaseURL
    })
    firebase_ref_values = db.reference('values')

except:
    print('Unable to initialize Firebase: {}'.format(sys.exc_info()[0]))
    sys.exit(1)


def get_values():
    colorVal = firebase_ref_values.get()
    i = 0
    arr = []
    if colorVal is not None:
        for item, value in colorVal.items():
            print(value)
            for val in range(0, 64):
                letter = value[val]
                if letter == "rd":
                    color = RED
                elif letter == "gr":
                    color = GREEN
                elif letter == "bl":
                    color = BLUE
                elif letter == "y":
                    color = YELLOW
                elif letter == "darkrd":
                    color = DARK_RED
                elif letter == "darkbl":
                    color = DARK_BLUE
                elif letter == "darkg":
                    color = DARK_GREEN
                elif letter == "darky":
                    color = DARK_YELLOW
                else:
                    color = WHITE
                            
                arr.append(color)
                  
        sense_hat.set_pixels(arr)
        sleep(1)
           

    else:
        sense_hat.show_message("404")
try:
    # SenseHat
    sense_hat = SenseHat()
    sense_hat.set_imu_config(False, False, False)
except:
    print('Unable to initialize the Sense Hat library: {}'.format(sys.exc_info()[0]))
    sys.exit(1)
    
def main():
    while True:
        get_values()
            
        
if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        print('Interrupt received! Stopping the application...')
    finally:
        print('Cleaning up the mess...')
        sense_hat.clear()
        sys.exit(0)