from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId




app = Flask(__name__)
CORS(app)


client = MongoClient("mongodb://localhost:27017")

db = client.task_db
collection = db.items

# new_document = {
#     "id": 2,
#     "title": "Mens Casual Premium Slim Fit T-Shirts ",
#     "price": 22.3,
#     "category": "men's clothing",
#     "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
# }
# ir = collection.insert_one(new_document)
# print("Inserted document ID:", ir.inserted_id)
#
# cursor = collection.find()
# for document in cursor:
#     print(document)

@app.route('/task', methods=['GET'])
def get_task():
    task = list(collection.find())
    for i in task:
        i['_id'] = str(i['_id'])  # Convert objectId to string
    return jsonify(task), 200


@app.route('/task/<task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    update_result = collection.update_one({'_id': ObjectId(task_id)}, {'$set': data})
    if update_result.modified_count > 0:
        return jsonify({"message": "task updated successfull"}), 200
    else:
        return jsonify({"message": "task not found"}), 404


@app.route('/task', methods=['POST'])
def create_task():
    data = request.get_json()
    insert_result = collection.insert_one(data)
    return jsonify({"message": "task created successfully",
                    "id": str(insert_result.inserted_id)}), 201

@app.route('/task/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    delete_result = collection.delete_one({'_id': ObjectId(task_id)})  # Assuming you're using ObjectId
    if delete_result.deleted_count > 0:
        return jsonify({"message": "task deleted successfully"}), 200
    else:
        return jsonify({"message": "task not found"}), 404


@app.route('/task/<task_id>', methods=['GET'])
def get_task_by_id(task_id):
    task_id = int(task_id)
    task = collection.find_one({'_id': ObjectId(task_id)})
    if task:
        # task['id'] = str(task['id'])
        task['_id'] = str(task['_id'])
        return jsonify(task), 200
    else:
        return jsonify({"message": "task not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)