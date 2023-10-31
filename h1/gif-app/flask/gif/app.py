from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client.Users
collection = db.gif_data

@app.route('/gif', methods=['GET', 'POST'])
def handle_gif():
    if request.method == 'GET':
        gif = list(collection.find())
        for person in gif:
            person['_id'] = str(person['_id'])
        return jsonify(gif), 200
    elif request.method == 'POST':
        new_gif = request.json
        result = collection.insert_one(new_gif)
        new_gif_id = str(result.inserted_id)
        return jsonify({"message": "gif added successfully", "id": new_gif_id}), 201

@app.route('/gif/<string:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_single_gif(id):
    if request.method == 'GET':
        gif = collection.find_one({"_id": ObjectId(id)})
        if gif:
            gif['_id'] = str(gif['_id'])
            return jsonify(gif), 200
        else:
            return jsonify({"message": "gif not found"}), 404

    if request.method == 'PUT':
        updated_data = request.json
        updated_result = collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": updated_data}, return_document=True)
        if updated_result:
            updated_result['_id'] = str(updated_result['_id'])
            return jsonify({"message": "gif updated successfully", "id": updated_result['_id']}), 201
        else:
            return jsonify({"message": "gif not found"}), 404

    if request.method == 'DELETE':
        deleted_gif = collection.delete_one({"_id": ObjectId(id)})
        if deleted_gif.deleted_count > 0:
            return jsonify({"message": "gif deleted successfully"}), 200
        else:
            return jsonify({"message": "gif not found"}), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
