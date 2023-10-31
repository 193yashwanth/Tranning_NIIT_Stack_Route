from pymongo import MongoClient

# step 1: Establish a connection to MongoDB
# Replace 'your_mongodb_url' with your MongoDB connection string
client = MongoClient("mongodb://localhost:27017")

# Step 2: Access the database and collection
# Replace 'your_mongodb_url' and 'your_collection_name' with actual names
db = client.company
collection = db.employees

# CREATE Operation
# Insert a new document into the collection
# new_document = {
#     "name": "John Doe",
#     "age": 33,
#     "position": "Software Developer"
# }
# insert_result = collection.insert_one(new_document)
# print("Inserted document ID:", insert_result.inserted_id)
#
# # READ Operation
# # Find and print all documents in the collection
# print("All documents in the collection:")
# cursor = collection.find()
# for document in cursor:
#     print(document)

# UPDATE Operation
# Update a document in the collection
update_query = {"name": "John Doe"}
update_data = {"$set": {"position": "asw"}}
update_result = collection.update_one(update_query, update_data)
print("Matched", update_result.matched_count,
      "documents and modified", update_result.matched_count,
      "documents.")

print("All documents in the collection after update:")
cursor = collection.find()
for document in cursor:
    print(document)

# delete_query = {"name": "John Doe"}
# delete_result = collection.delete_one(delete_query)
# print("Deleted", delete_result.deleted_count, "document.")
#
# # READ Operation (after delete)
# # Find and print all documents in the collection
# print("All documents in the collection after delete:")
# cursor = collection.find()
# for document in cursor:
#     print(document)

# Step 3: close the connection
client.close()