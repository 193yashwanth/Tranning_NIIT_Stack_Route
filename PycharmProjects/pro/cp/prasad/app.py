from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

notifications = []

# Route for adding a notification via POST request
@app.route('/add_notification', methods=['POST'])
def add_notification():
    data = request.get_json()
    notifications.append(data)
    return jsonify({'message': 'Notification added successfully'})

# Route for getting notifications via GET request
@app.route('/get_notifications', methods=['GET'])
def get_notifications():
    return jsonify(notifications)

# Route for user registration via POST request
@app.route('/register_user', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    add_notification({'message': 'User registered successfully', 'type': 'success'})
    return jsonify({'message': 'User registered successfully'})

# Route for adding a book to the cart via POST request
@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    book_id = data.get('book_id')
    add_notification({'message': 'Book added to cart successfully', 'type': 'success'})
    return jsonify({'message': 'Book added to cart successfully'})

if __name__ == '__main__':
    app.run(debug=True)
