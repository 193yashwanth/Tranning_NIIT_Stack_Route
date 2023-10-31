from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")

db = client["person"]

collection = db["details"]


# Define routes for registration (POST) and retrieval (GET)


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    collection.insert_one(data)
    return jsonify({"message": "User registered successfully"})


@app.route('/users', methods=['GET'])
def get_users():
    users = list(collection.find())
    for user in users:
        user['_id'] = str(user['_id'])
    return jsonify(users), 200


if __name__ == '__main__':
    app.run(debug=True)