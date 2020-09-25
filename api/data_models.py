import json
import pymongo


# modeling a unit /actually this does not really need to exist
# class Unit:
# 	def __init__(self,unit,gender,type):
# 		self.unit=unit
# 		self.type=type
# 		self.gender=gender


# 	def __str__(self):
# 		json=str({"unit":self.unit,"gender":self.gender,"type":self.type})
# 		return json

# 	def unit_map(self):
# 		map=({"unit":self.unit,"gender":self.gender,"type":self.type})
# 		return map


#modeling room
class Room:

	def __init__(self,room,unit_type):
		self.unit=room[:-1]
		self.unit_type=unit_type
		self.room=room
		self.occupied=False
		self.tenant_id="-1"

	def __str__(self):
		json=str({"unit":self.unit,"unit type":self.unit_type,"room":self.room,"occupied":self.occupied,"tenant_id":self.tenant_id})
		return json
	
	def to_map(self):
		json={"unit":self.unit,"unit type":self.unit_type,"room":self.room,"occupied":self.occupied,"tenant_id":self.tenant_id}
		return json

#modeling tenant
class Tenant:

	def __init__(self,tenant_id,email,number,name,surname,gender,room,approved):
		self.tenant_id=tenant_id
		self.email=email
		self.number=number
		self.name=name
		self.surname=surname
		self.gender=gender
		self.room=room
		self.approved=approved

	def __str__(self):
		json=str({"tenant_id":self.tenant_id,"email":self.email,"number":self.number,"name":self.name,"surname":self.surname,"gender":self.gender,"room":self.room})
		return json
	
	def to_map(self):
		json={"tenant_id":self.tenant_id,"email":self.email,"number":self.number,"name":self.name,"surname":self.surname,"gender":self.gender,"room":self.room}
		return json

