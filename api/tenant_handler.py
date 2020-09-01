import pymongo
from bson.json_util import dumps
from dotenv import load_dotenv
import data_models
import os

#load connection string
load_dotenv()

class TenantHandler:
	def handle_request(self,request):
		self.client=pymongo.MongoClient(os.getenv("MONGO_URL"))
		self.database=self.client["Campus_Africa"]
		self.collection=self.database["Tenants"]

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
      
	#post create a new unit 
	def post_data(self,parameters):
		if parameters!=None:
			try:
					query = { "tenant_id":parameters["tenant_id"]}
					doc=self.collection.find(query)
					if doc.count()==0:
							tenant=data_models.Tenant(parameters["tenant_id"],parameters["email"],parameters["number"],parameters["name"],parameters["surname"],parameters["gender"])
							parameters=tenant.to_map()
							self.collection.insert_one(parameters)
							return str(parameters)
					
					#must implement proper error handling
					else:
							return "409 CONFLICT"

			except:
						return "500 Internal Server Error"
	