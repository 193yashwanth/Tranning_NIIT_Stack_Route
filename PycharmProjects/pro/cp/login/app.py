from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client.Users
collection = db.details

@app.route('/signin', methods=['POST'])
def handle_signin():
    if request.method == 'POST':
        user_data = request.json
        user = collection.find_one({"email": user_data.get('email')})
        if user:
            if user_data.get('password') == user['password']:
                return jsonify({"message": "Sign-in successful"}), 200
            else:
                return jsonify({"message": "Incorrect password"}), 401
        else:
            return jsonify({"message": "User not found"}, 401)


@app.route('/detail', methods=['GET', 'POST'])
def handle_detail():
    if request.method == 'GET':
        details = list(collection.find())
        for person in details:
            person['_id'] = str(person['_id'])
        return jsonify(details), 200
    elif request.method == 'POST':
        new_person = request.json
        result = collection.insert_one(new_person)
        new_person_id = str(result.inserted_id)
        return jsonify({"message": "person added successfully", "id": new_person_id}), 201

@app.route('/detail/<string:user>', methods=['GET', 'PUT', 'DELETE'])
def handle_single_user(user):
    if request.method == 'GET':
        details = collection.find_one({"username": user})
        if details:
            details['_id'] = str(details['_id'])
            return jsonify(details), 200
        else:
            return jsonify({"message": "User not found"}), 404

    if request.method == 'PUT':
        updated_data = request.json
        updated_result = collection.find_one_and_update({"username": user}, {"$set": updated_data},return_document=True)
        if updated_result:
            return jsonify({"message": "person updated successfully", "id": updated_result['_id']}), 201
        else:
            return jsonify({"message": "User not found"}), 404

    if request.method == 'DELETE':
        deleted_user = collection.delete_one({"username": user})
        if deleted_user.deleted_count > 0:
            return jsonify({"message": "person deleted successfully"}), 200
        else:
            return jsonify({"message": "User not found"}), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
