from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

def handle_uploaded_image(profile_picture):
    # Ensure the 'uploads' directory exists
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    # Save the uploaded file
    filename = secure_filename(profile_picture.filename)
    profile_picture.save(os.path.join('uploads', filename))

    # Return the URL to the saved file
    return f'/uploads/{filename}'


app = Flask(__name__)
CORS(app)


client = MongoClient('mongodb://localhost:27017')
db = client.gipher

users = db.userdata
gifs = db.gifdata
favourites = db.favouritesdata


# Method to add a new user
@app.route('/users/register', methods=['POST'])
def add_user():
    username = request.form.get('username')
    password = request.form.get('password')
    profile_picture = request.files['profile_picture']
    print(request.files)

    if not username or not password or not profile_picture:
        return jsonify({'message': 'Invalid request data!'}), 400

    if users.find_one({'username': username}):
        return jsonify({'message': 'Username already exists!'}), 409

    profile_picture_url = handle_uploaded_image(profile_picture)

    users.insert_one({'username': username, 'password': password, 'profile_picture': profile_picture_url})
    return jsonify({'message': 'Registration successful'}), 201



# Method to login into a user
@app.route('/users/login', methods=['POST'])
def login():
    auth = request.get_json()
    username = auth['username']
    password = auth['password']

    if not username or not password:
        return jsonify({'message': "Couldn't verify"}), 401

    user = users.find_one({'username': username, 'password': password})

    if not user:
        return jsonify({'message': 'Invalid Credentials!'}), 401
    return jsonify({'message': 'Login successful!'}), 200


# Method to add a profile picture
@app.route('/users/profile', methods=['PUT'])
def update_profile(current_user):
    data = request.get_json()
    username = current_user['username']
    profile_picture = data['profile_picture']

    users.update_one({'username': username}, {'$set': {'profile_picture': profile_picture}})
    return jsonify({'message': 'Profile updated successfully!'})


# Method to delete a profile
@app.route('/users/profile', methods=['DELETE'])
def account_delete():
    username = request.args.get('username')

    users.remove_one({'username': username})
    return jsonify({'message': 'Account deleted!'}), 200


# Method to get all the gifs
@app.route('/gif', methods=['GET'])
def get_gifs():
    gifs_collection = gifs.find()
    gifs_list = []

    for gif in gifs_collection:
        gifs_list.append({
            'id': str(gif['_id']),
            'title': gif['title'],
            'url': gif['url']
        })

    return jsonify(gifs_list), 200


# Method to search a gif by id

@app.route('/gif/<gif_id>', methods=['GET'])
def gifs_by_id(gif_id):
    try:
        gif = gifs.find_one({'_id': int(gif_id)})

        if not gif:
            return jsonify({'message': 'GIF not found!'}), 404

        return jsonify({
            'id': str(gif['_id']),
            'title': gif['title'],
            'url': gif['url']
        }), 200
    except Exception as e:
        return jsonify({'message': 'Invalid GIF ID'}), 400



# Method to search a gif by category
@app.route('/gif/<category>', methods=['GET'])
def gifs_by_category(category):
    gif = gifs.find_one({'category': category})

    if not gif:
        return jsonify({'message': 'GIF not found!'}), 404
    return jsonify({
        'id': str(gif['_id']),
        'title': gif['title'],
        'url': gif['url']
    }), 200


# Method for adding GIF to favourites
@app.route('/favourites/add', methods=['POST'])
def gif_to_fav():
    data = request.get_json()
    gif_id = data['gif_id']             # '_id' from gifdata collection should be passed to here
    user_id = data['user_id']           # '_id' from userdata collection should be passed to here

    if favourites.find_one({'user_id': user_id, 'gif_id': gif_id}):
        return jsonify({'message': 'GIF already in favourites!'}), 405

    favourites.insert_one({'user_id': user_id, 'gif_id': gif_id})
    return jsonify({'message': 'GIF added to favourites!'}), 201


# Method to view favourites
@app.route('/favourites/<user_id>', methods=['GET'])
def view_fav(user_id):
    favourites_data = favourites.find_one({'user_id': user_id})
    favourites_data_list = []

    for favourite in favourites_data:
        gif = gifs.find_one({'_id': favourite['gif_id']})

        if gif:
            favourites_data_list.append({
                'id': str(gif['_id']),
                'title': gif['title'],
                'url': gif['url']
            })
    return jsonify(favourites_data_list), 200


if __name__ == '__main__':
    app.run(debug=True)
