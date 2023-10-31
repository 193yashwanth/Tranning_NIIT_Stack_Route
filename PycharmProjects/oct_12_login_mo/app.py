from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/Login'
mongo = PyMongo(app)
CORS(app)

# @app.route('/api/login', methods=['GET'])
# def login_d():
#     data = list(Login.find())
#     for i in data:
#         i['_id'] = str(i['_id'])
#     return jsonify(data), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = mongo.db.users.find_one({'email': data['email']})
    if user and user['password'] == data['password']:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Login failed'})

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user = {
        'email': data['email'],
        'password': data['password']
    }
    mongo.db.users.insert_one(user)
    return jsonify({'message': 'Signup successful'})

if __name__ == '__main__':
    app.run(debug=True)
