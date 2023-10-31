from flask import Flask, jsonify, request
from pymongo import MongoClient


app = Flask(__name__)

client = MongoClient('mongodb://localhost:27017/')
db = client.details
collection = db.customers

@app.route('/customers', methods=['GET', 'POST'])
def handle_customers():
    if request.method == 'GET':
        customerss = list(collection.find())
        for customers in customerss:
            customers['_id'] = str(customers['_id'])
        return jsonify(customerss), 200
    elif request.method == 'POST':
        new_customers = request.json
        result = collection.insert_one(new_customers)
        new_customers_id = str(result.inserted_id)
        return jsonify({"message": "customers added successfully", "id": new_customers_id}), 201


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
