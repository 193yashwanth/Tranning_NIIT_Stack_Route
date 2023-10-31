from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash


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

    if not username or not password or not profile_picture:
        return jsonify({'message': 'Invalid request data!'}), 400

    if users.find_one({'username': username}):
        return jsonify({'message': 'User already exists!'}), 409

    profile_picture_url = handle_uploaded_image(profile_picture)
    hashed_password = generate_password_hash(password, method='sha256')

    username = users.insert_one(
        {'username': username, 'password': hashed_password, 'profile_picture': profile_picture_url}).inserted_id
    return jsonify({'message': 'Registration successful', 'username': str(username)}), 201


# Method to login a user
@app.route('/users/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return jsonify({'message': "Couldn't verify"}), 400

    user = users.find_one({'username': username})

    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid Credentials!'}), 401

    return jsonify({'message': 'Login successful'}), 200


# Method to update a user's profile
@app.route('/users/profile', methods=['PUT'])
def update_profile():
    data = request.get_json()
    username = data.get('username')
    profile_picture = data.get('profile_picture')

    if not username or not profile_picture:
        return jsonify({'message': 'Invalid request data!'}), 400

    user = users.find_one({'username': username})

    if not user:
        return jsonify({'message': 'User not found!'}), 404

    users.update_one({'username': username}, {'$set': {'profile_picture': profile_picture}})
    return jsonify({'message': 'Profile updated successfully'}), 200


# Method to delete a user's account
@app.route('/users/profile', methods=['DELETE'])
def account_delete():
    username = request.args.get('username')

    if not username:
        return jsonify({'message': 'Invalid request data!'}), 400

    result = users.delete_one({'username': username})

    if result.deleted_count == 0:
        return jsonify({'message': 'User not found!'}), 404

    return jsonify({'message': 'Account deleted'}), 200


# Method to get all the GIFs
@app.route('/gifs', methods=['GET'])
def get_gifs():
    gifs_collection = gifs.find()
    gifs_list = []

    for gif in gifs_collection:
        gifs_list.append({
            'id': str(gif['_id']),
            'title': gif['title'],
            'url': gif['url'],
            'category': gif['category'],
            "count": gif['count']
        })

    return jsonify(gifs_list), 200


# Method to add a GIF to favorites
@app.route('/favourites/add', methods=['POST'])
def gif_to_fav():
    try:
        data = request.get_json()
        gif_id = int(data.get('gif_id'))
        username = data.get('username')

        if not gif_id or not username:
            return jsonify({'error': 'Invalid request data. Both gif_id and username are required.'}), 400

        user = users.find_one({'username': username})
        gif = gifs.find_one({'_id': int(gif_id)})

        if not user:
            return jsonify({'error': 'User not found.'}), 404
        if not gif:
            return jsonify({'error': 'GIF not found.'}), 404

        if favourites.find_one({'username': username, '_id': gif_id}):
            return jsonify({'error': 'GIF already in favorites.'}), 409

        favourites.insert_one({'username': username, '_id': gif_id})
        return jsonify({'message': 'GIF added to favorites'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/gifs/<gif_id_or_category>', methods=['GET'])
def gifs_by_id_or_category(gif_id_or_category):
    if gif_id_or_category.isdigit():
        gif = gifs.find_one({'_id': int(gif_id_or_category)})
        if gif:
            return jsonify({
                'id': str(gif['_id']),
                'title': gif['title'],
                'url': gif['url'],
                'category': gif['category'],
                'count': int(gif['count'])
            }), 200
        else:
            return jsonify({'message': 'GIF not found!'}), 404
    else:
        gifs_list = list(gifs.find({'category': gif_id_or_category}))
        if gifs_list:
            response_data = []
            for gif in gifs_list:
                response_data.append({
                    'id': str(gif['_id']),
                    'title': gif['title'],
                    'url': gif['url'],
                    'category': gif['category'],
                    'count': int(gif['count'])
                })
            return jsonify(response_data), 200
        else:
            return jsonify({'message': 'No GIFs found in this category'}), 404


# Method to view a user's favorites
@app.route('/favourites/<username>', methods=['GET'])
def view_fav(username):
    user = users.find_one({'username': str(username)})

    if not user:
        return jsonify({'message': 'User not found!'}), 404

    favorites_data = favourites.find({'username': username})
    favorites_data_list = []

    for favorite in favorites_data:
        gif = gifs.find_one({'_id': favorite['_id']})

        if gif:
            favorites_data_list.append({
                'id': str(gif['_id']),
                'title': gif['title'],
                'url': gif['url'],
                'category': gif['category']
            })

    return jsonify(favorites_data_list), 200

# Method to remove a GIF from favorites
# Method to remove a GIF from favorites
@app.route('/favourites/remove', methods=['DELETE'])
def remove_gif_from_fav():
    data = request.get_json()
    gif_id = data.get('gif_id')
    username = data.get('username')

    if not gif_id or not username:
        return jsonify({'message': 'Invalid request data!'}), 400

    if not users.find_one({'username': str(username)}):
        return jsonify({'message': 'User not found!'}), 404

    if not gifs.find_one({'_id': int(gif_id)}):
        return jsonify({'message': 'GIF not found!'}), 404

    result = favourites.delete_one({'username': username, '_id': int(gif_id)})

    if result.deleted_count == 0:
        return jsonify({'message': 'GIF not found in favorites!'}), 404

    return jsonify({'message': 'GIF removed from favorites'}), 200


@app.route('/gifs/incrementCount/<int:gif_id>', methods=['POST'])
def increment_count(gif_id):
    try:
        # Find the GIF by its _id and increment the count field
        gif = gifs.find_one({'_id': gif_id})

        if gif:
            new_count = gif.get('count', 0) + 1

            # Update the count in the document
            gifs.update_one({'_id': gif_id}, {'$set': {'count': new_count}})

            # Return the updated count as JSON
            return jsonify({'count': new_count}), 200
        else:
            return jsonify({'error': 'GIF not found'}), 404

    except Exception as e:
        return jsonify({'error': 'Error incrementing count'}), 500





if __name__ == '__main__':
    app.run(debug=True)
