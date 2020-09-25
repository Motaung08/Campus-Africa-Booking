import pymongo
from bson.json_util import dumps
from dotenv import load_dotenv
import data_models
import os

#load connection string
load_dotenv()

class RoomHandler:

	def __init__(self):
		self.client=pymongo.MongoClient(os.getenv("MONGO_URL"))
		self.database=self.client["Campus_Africa"]
		self.collection=self.database["Rooms"]

	def handle_request(self,request):		
		if request.method=="GET":
			room=request.args.get("room")
			unit_type=request.args.get("type")
			parameters={"occupied":False}

			if room!=None:
				parameters["room"]=room

			if unit_type!=None:
				parameters["unit type"]=unit_type

			return self.get_data(parameters)


		elif request.method=="POST":
			return self.post_data(request.get_json())

		elif request.method=="PATCH":
			return self.update_data(request.get_json())
	
	#get units possible filters type,occupation or combination of the 2
	def get_data(self,parameters):
		if parameters!=None:
			# type+occupation
			# type+occupation
			if "unit type" in parameters.keys() and "occupied" in parameters.keys():
				query={"unit type":parameters["unit type"],"occupied":parameters["occupied"]}
				doc=self.collection.find(query)
				return dumps(doc)	

			elif "room" in parameters.keys():
				query={"room":parameters["room"]}
				doc=self.collection.find(query)
				return dumps(doc)	
      #type
			elif "unit type" in parameters.keys() and "occupied" not in parameters.keys():
					query={"unit type":parameters["unit type"]}
					doc=self.collection.find(query)
					return dumps(doc)
			#occupation
			elif "unit type" not in parameters.keys() and "occupied" in parameters.keys():
					query={"occupied":parameters["occupied"]}
					doc=self.collection.find(query)
					return dumps(doc)
			else:
				return "Nothing in parameters"

	#post create a new room 
	def post_data(self,parameters):
		if parameters!=None:
			try:
					query = { "room":parameters["room"]}
					doc=self.collection.find(query)
					if doc.count()==0:
							room=data_models.Room(parameters["room"],parameters["unit type"])
							parameters=room.to_map()
							self.collection.insert_one(parameters)
							return str(parameters)
					
					#must implement proper error handling
					else:
							return "409 CONFLICT"

			except:
						return "500 Internal Server Error"
	
	#update an existing room (change status)
	def update_data(self,parameters):
		if parameters!=None:
			try:
					query = { "room":parameters["room"]}
					self.collection.update_one(query,parameters["tenant_id"])
			except:
					pass