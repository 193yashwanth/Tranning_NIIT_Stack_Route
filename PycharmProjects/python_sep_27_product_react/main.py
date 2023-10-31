from flask import Flask, jsonify, request
from flask_cors import CORS  # import Flask-CORS

app = Flask(__name__)
CORS(app)

products = [
    {"id": 1, "prodName": "car", "brand": "bmw" ,"price": 1800000},
    {"id": 2, "prodName": "bike", "brand": "KTM","price": 2400000},
    {"id": 3, "prodName": "mobile", "brand": "MI","price": 1600}
]

@app.route('/product', methods=['GET', 'POST'])
def product():
    if request.method == 'GET':
        return jsonify(products)
    elif request.method == 'POST':
        new_pro = request.json
        products.append(new_pro)
        return jsonify({"message": "product added successfully"}), 201

if __name__ == "__main__":
    app.run(debug=True)
