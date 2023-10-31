from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

notifications = []

@app.route('/add_notification', methods=['POST'])
def add_notification():
    data = request.get_json()
    notifications.append(data)
    # message = data.get('message')
    # notifications.append({'message': message, 'type': 'success'})
    return jsonify({'message': 'Notification added successfully'})
@app.route('/get_notifications', methods=['GET'])
def get_notifications():
    return jsonify(notifications)
@app.route('/register_user', methods=['POST'])
def register_user():
    data = request.get_json()
    notifications.append(data)
    # username = data.get('username')
    # You can add user registration logic here
    # Assuming registration is successful, send a success notification
    # add_notification({'message': 'User registered successfully', 'type': 'success'})
    return jsonify({'message': 'User registered successfully'})

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    notifications.append(data)
    # book_id = data.get('book_id')
    # You can add logic to add the book to the cart here
    # Assuming the book is successfully added, send a success notification
    # add_notification({'message': 'Book added to cart successfully', 'type': 'success'})
    return jsonify({'message': 'Book added to cart successfully'})

if __name__ == '__main__':
    app.run(debug=True)