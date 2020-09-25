from flask import Flask,request
from flask_mail import Mail,Message
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
@application.route("/tenants",methods=['GET','POST','PATCH'])
def tenants():
    handler=tenant_handler.TenantHandler()
    return handler.handle_request(request)
      
@application.route("/tenants/upload/pop",methods=['GET','POST','PATCH'])
def upload_pop():
    handler=tenant_handler.TenantHandler()
    tenant_id=request.args.get("id")
    uploaded_file = request.files["file"]
    result=handler.upload_pop(uploaded_file,tenant_id)
    if result=="uploaded":
        # msg = Message("Hello",sender="nkambule773@gmail.com",recipients=[email])
        # msg.body = "testing"
        # msg.html = "<b>testing</b>"
        # mail.send(msg)
        return "uploaded"

    else:
        return "upload failure"

@application.route("/tenants/get/pop",methods=['GET'])
def get_pop():
    handler=tenant_handler.TenantHandler()
    return handler.get_pop()
    

if __name__=="__main__":
    application.run(host='0.0.0.0',debug=False)
