import pymongo
from bson.binary import Binary
from bson.json_util import dumps
from dotenv import load_dotenv
import data_models
import os

#load connection string
load_dotenv()

class TenantHandler:
	def __init__(self):
		self.client=pymongo.MongoClient(os.getenv("MONGO_URL"))
		self.database=self.client["Campus_Africa"]
		self.collection=self.database["Tenants"]
		self.rooms=self.database["Rooms"]

	def handle_request(self,request):
		if request.method=="GET":
			tenant_id=request.args.get("id")
			parameters={"tenant_id":tenant_id}
			return self.get_data(parameters)

		elif request.method=="POST":
			return self.post_data(request.get_json())
		
	
	#get a tenant just using their id
	def get_data(self,parameters):
		if parameters!=None:
			query={"tenant_id":parameters["tenant_id"]}
			doc=self.collection.find(query)
			return dumps(doc)
      
	#post create a new tenant
	def post_data(self,parameters):
		if parameters!=None:
			try:
					query = { "tenant_id":parameters["tenant_id"]}
					doc=self.collection.find(query)
					if doc.count()==0:
							tenant=data_models.Tenant(parameters["tenant_id"],parameters["email"],parameters["number"],parameters["name"],parameters["surname"],parameters["gender"]
							,parameters["room"],False)
							tenant=tenant.to_map()
							self.collection.insert_one(tenant)
							print(parameters["pop"])
							self.rooms.update_one({"room":parameters["room"]},{"$set":{"tenant_id":parameters["tenant_id"],"occupied":True}})
							return parameters
					
					#must implement proper error handling
					else:
							return "duplicate"

			except:
						return "tenant insert error"
		
	def upload_pop(self,data,tenant_id):
		try:
			myquery = { "tenant_id": tenant_id}
			newvalues = { "$set": { "pop": Binary(data.read())}}
			self.collection.update_one(myquery, newvalues)
			return "uploaded"
		except:
			return "could not upload proof of payment"

	def get_pop(self):
		try:
			myquery = { "tenant_id": "9904085693081"}
			doc=self.collection.find(myquery)
			
			if doc.count()==1:
				pop=doc[0]["pop"]
				f = open("sample.pdf", "wb")
				f.write(pop)
				f.close()
			return "pop found"
			
		except:
			return "error retieving pop"