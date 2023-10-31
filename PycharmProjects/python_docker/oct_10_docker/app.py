from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
api = Api(app)

client = MongoClient("mongodb://db:27017/")
db = client.books_db
books = db.books

parser = reqparse.RequestParser()
parser.add_argument('title', type=str, required=True, help="Title cannot be blank!")
parser.add_argument('author', type=str, required=True, help="Author cannot be blank!")


class BookResourc(Resource):
    def get(self, book_id=None):
        if book_id:
            book = books.find_one({"_id": ObjectId(book_id)})
            if book:
                book['_id'] = str(book['_id'])
                return book, 200
            return {"message": "Book not found"}, 404
        else:
            all_books = list(books.find())
            for book in all_books:
                book['_id'] = str(book['_id'])
            return all_books, 200

    def post(self):
        args = parser.parse_args()
        result = books.insert_one({"title": args['title'], "author": args['author']})
        return {"id": str(result.inserted_id), "title": args['title'], "author": args['author']}, 201

    def put(self, book_id):
        args = parser.parse_args()
        books.update_one({"_id": ObjectId(book_id)}, {"$set": {"title": args['title'], "author": args['author']}})
        return {"id": book_id, "title": args['title'], "author": args['author']}, 200

    def delete(self, book_id):
        books.delete_one({"_id": ObjectId(book_id)})
        return {"message": "Book deleted"}, 200

api.add_resource(BookResourc, '/book', '/book/<string:book_id>')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
