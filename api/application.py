from flask import Flask,request
from flask_cors import CORS
import room_handler
import tenant_handler

application = Flask(__name__)
cors = CORS(application)

@application.route("/")
def home():
    return "home"

#hand request about adding of rooms admin web app
@application.route("/rooms",methods=['GET','POST'])
def rooms():
    handler=room_handler.RoomHandler()
    return  handler.handle_request(request)

#handle request for bookings mostly client app
@application.route("/tenants",methods=['GET','POST'])
def tenants():
    handler=tenant_handler.TenantHandler()
    return handler.handle_request(request)    

if __name__=="__main__":
    application.run(host='0.0.0.0',debug=False)
