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

@app.route('/product', methods=['GET'])
def get_product():
    product = list(collection.find())
    for i in product:
        i['_id'] = str(i['_id'])  # Convert objectId to string
    return jsonify(product), 200


@app.route('/product/<product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    update_result = collection.update_one({'_id': ObjectId(product_id)}, {'$set': data})
    if update_result.modified_count > 0:
        return jsonify({"message": "product updated successfull"}), 200
    else:
        return jsonify({"message": "product not found"}), 404


@app.route('/product', methods=['POST'])
def create_product():
    data = request.get_json()
    insert_result = collection.insert_one(data)
    return jsonify({"message": "product created successfully",
                    "id": str(insert_result.inserted_id)}), 201

@app.route('/product/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    delete_result = collection.delete_one({'_id': ObjectId(product_id)})  # Assuming you're using ObjectId
    if delete_result.deleted_count > 0:
        return jsonify({"message": "product deleted successfully"}), 200
    else:
        return jsonify({"message": "product not found"}), 404


@app.route('/product/<product_id>', methods=['GET'])
def get_product_by_id(product_id):
    product_id = ObjectId(product_id)
    product = collection.find_one({'_id': ObjectId(product_id)})
    if product:
        # product['id'] = str(product['id'])
        product['_id'] = str(product['_id'])
        return jsonify(product), 200
    else:
        return jsonify({"message": "Product not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)