from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client.vehicle
collection = db.cars

# new_collection = {
#     "Model": "VXI AMT",
#     "Regno": "TS04 3542",
#     "Price": 1900000,
#     "BrandName": "Bmw"
# }
# a = collection.insert_one(new_collection)
#
# print("all documents in db:")
# curses = collection.find()
# for i in curses:
#     print(i)

# uq = {"BrandName": "Bmw"}
# ud = {"$set": {"Price": 23000000}}
# ur = collection.update_one(uq, ud)
#
# print("all documents in db:")
# curses = collection.find()
# for i in curses:
#     print(i)

dq = {"BrandName": "asdf"}
dr = collection.delete_one(dq)

print("all documents in db:")
curses = collection.find()
for i in curses:
    print(i)