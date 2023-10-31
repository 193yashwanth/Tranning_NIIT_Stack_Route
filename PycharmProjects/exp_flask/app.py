from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client.books
collection = db.books

@app.route('/book', methods=['GET', 'POST'])
def handle_book():
    if request.method == 'GET':
        books = list(collection.find())
        for book in books:
            book['_id'] = str(book['_id'])
        return jsonify(books), 200
    elif request.method == 'POST':
        new_book = request.json
        result = collection.insert_one(new_book)
        new_book_id = str(result.inserted_id)
        return jsonify({"message": "Book added successfully", "id": new_book_id}), 201

@app.route('/book/<string:id>', methods=['PUT', 'DELETE'])
def change_book(id):
    if request.method == 'PUT':
        update_book = request.json
        result = collection.update_one({"_id": int(id)}, {"$set": update_book})
        if result.modified_count > 0:
            return jsonify({"message": "Book updated successfully", "id": id}), 200
        else:
            return jsonify({"message": "Book not found or not updated", "id": id}), 404
    elif request.method == 'DELETE':
        result = collection.delete_one({"_id": int(id)})
        if result.deleted_count > 0:
            return jsonify({"message": "Book deleted successfully", "id": id}), 200
        else:
            return jsonify({"message": "Book not found or not deleted", "id": id}), 404


if __name__ == "__main__":
    app.run(debug=True)
