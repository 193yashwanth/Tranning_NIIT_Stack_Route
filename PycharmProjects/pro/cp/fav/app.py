from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client.Users
collection = db.favorite

@app.route('/favorite', methods=['GET', 'POST'])
def handle_favorite():
    if request.method == 'GET':
        favorite = list(collection.find())
        for favorite in favorite:
            favorite['_id'] = str(favorite['_id'])
        return jsonify(favorite), 200
    elif request.method == 'POST':
        new_favorite = request.json
        result = collection.insert_one(new_favorite)
        new_favorite_id = str(result.inserted_id)
        return jsonify({"message": "favorite added successfully", "id": new_favorite_id}), 201

@app.route('/favorite/<string:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_single_favorite(id):
    if request.method == 'GET':
        favorite = collection.find_one({"_id": ObjectId(id)})
        if favorite:
            favorite['_id'] = str(favorite['_id'])
            return jsonify(favorite), 200
        else:
            return jsonify({"message": "favorite not found"}), 404

    if request.method == 'PUT':
        updated_data = request.json
        updated_result = collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": updated_data}, return_document=True)
        if updated_result:
            updated_result['_id'] = str(updated_result['_id']) 
            return jsonify({"message": "favorite updated successfully", "id": updated_result['_id']}), 201
        else:
            return jsonify({"message": "favorite not found"}), 404

    if request.method == 'DELETE':
        deleted_favorite = collection.delete_one({"_id": ObjectId(id)})
        if deleted_favorite.deleted_count > 0:
            return jsonify({"message": "favorite deleted successfully"}), 200
        else:
            return jsonify({"message": "favorite not found"}), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
