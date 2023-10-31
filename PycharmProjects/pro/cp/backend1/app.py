from flask import Flask, request, jsonify, send_from_directory
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

app.config['UPLOAD_FOLDER'] = 'uploads'

client = MongoClient('mongodb://localhost:27017')
db = client.gipher

users = db.userdata
gifs = db.gifdata
favourites = db.favouritesdata
channels = db.Channels
joinchannel = db.joinchannel
feedback_collection = db.feedback_collection

@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    try:
        data = request.get_json()
        email = data.get('email')
        username = data.get('username')
        review = data.get('review')

        if email and username and review:
            feedback_data = {
                'email': email,
                'username': username,
                'review': review
            }
            feedback_collection.insert_one(feedback_data)
            return jsonify({"message": "Feedback submitted successfully!"})
        else:
            return jsonify({"error": "Incomplete feedback data."})
    except Exception as e:
        print(str(e))
        return jsonify({"error": "An error occurred while processing your request."})


# Method to add a new user
@app.route('/users/register', methods=['POST'])
def add_user():
    username = request.form.get('username')
    password = request.form.get('password')
    profile_picture = request.files['profile_picture']
    print(request.files)

    if not username or not password or not profile_picture:
        return jsonify({'message': 'Invalid request data!'}), 409

    if users.find_one({'username': username}):
        return jsonify({'message': 'User already exists!'}), 409

    profile_picture_url = handle_uploaded_image(profile_picture)
    hashed_password = generate_password_hash(password, method='sha256')

    users.insert_one({'username': username, 'password': hashed_password, 'profile_picture': profile_picture_url})
    return jsonify({'message': 'Registration successful','username': username}), 201



# Method to login into a user
@app.route('/users/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return jsonify({'message': "Couldn't verify"}), 401

    user = users.find_one({'username': username})

    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid Credentials!'}), 401

    return jsonify({'message': 'Login successful!','username': username}), 200

# Method to get user profile by username
@app.route('/users/<username>', methods=['GET'])
def get_user_profile(username):
    user = users.find_one({'username': username}, {'_id': False})

    if user:
        return jsonify({'user': user}), 200
    else:
        return jsonify({'message': 'User not found'}), 404


# Method to update user profile by username
@app.route('/users/<username>', methods=['PUT'])
def update_user_profile(username):

    new_username = request.form.get('username')  # Assuming you can update the username
    new_profile_picture = request.files.get('profile_picture')  # Assuming you can update the profile picture

    # Check if the user exists
    user = users.find_one({'username': username})
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Update the username if provided
    if new_username:
        users.update_one({'username': username}, {'$set': {'username': new_username}})

    # Update the profile picture if provided
    if new_profile_picture:
        # Handle the uploaded image
        profile_picture_url = handle_uploaded_image(new_profile_picture)

        # Update the profile picture URL in the database
        users.update_one({'username': username}, {'$set': {'profile_picture': profile_picture_url}})

    return jsonify({'message': 'Profile updated successfully'}), 200


# Method to delete a user profile by username
@app.route('/users/<username>', methods=['DELETE'])
def delete_user_profile(username):
    # Check if the user exists
    user = users.find_one({'username': username})
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Delete the user's profile picture file (optional, if needed)
    if 'profile_picture' in user and user['profile_picture']:
        # Extract filename from the URL
        filename = user['profile_picture'].split('/')[-1]
        file_path = os.path.join('uploads', filename)
        if os.path.exists(file_path):
            os.remove(file_path)

    # Delete the user's profile
    users.delete_one({'username': username})

    return jsonify({'message': 'Profile deleted successfully'}), 200




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
        gif = gifs.find_one({'_id': gif_id})
        if gif:
            new_count = gif.get('count', 0) + 1
            gifs.update_one({'_id': gif_id}, {'$set': {'count': new_count}})
            return jsonify({'count': new_count}), 200
        else:
            return jsonify({'error': 'GIF not found'}), 404

    except Exception as e:
        return jsonify({'error': 'Error incrementing count'}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    except FileNotFoundError:
        return jsonify({'message': 'File not found'}), 404

@app.route("/channels", methods=["GET"])
def get_data():
    data = list(channels.find())
    return jsonify(data)

@app.route("/channels/<string:_id>", methods=["GET"])
def get_gif_data(_id):
    try:
        data = channels.find_one({"_id": int(_id)})
        if data is not None:
            # data.pop("_id", None)
            return jsonify(data)
        else:
            return jsonify({"error": "Not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/channels", methods=["GET", "POST"])
def handle_channels():
    if request.method == "GET":
        data = list(channels.find())
        return jsonify(data)
    elif request.method == "POST":
        try:
            data = request.get_json()
            data['_id'] = str(data.get('_id'))
            data['gif'] = data.get('gif', [])
            result = channels.insert_one(data)
            return jsonify({"_id": str(result.inserted_id)}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@app.route('/channels/joinchannels/<string:username>', methods=['GET'])
def get_channel_username(username):
    user = users.find_one({'username': str(username)})
    if not user:
        return jsonify({'message': 'User not found!'}), 404

    channel_data = joinchannel.find({'username': username})
    channel_data_list = []

    for i in channel_data:
        cha = channels.find_one({'_id': i['_id']})

        if cha:
            channel_data_list.append({
                'id': str(cha['_id']),
                'img': cha['img'],
                'gif': cha['gif'],
                'category': cha['category']
            })

    return jsonify(channel_data_list), 200


@app.route('/joinchannels/add', methods=['POST'])
def channel_to_join():
    try:
        data = request.get_json()
        cha_id = int(data.get('cha_id'))
        username = data.get('username')

        if not cha_id or not username:
            return jsonify({'error': 'Invalid request data. Both cha_id and username are required.'}), 400

        user = users.find_one({'username': username})
        channel = channels.find_one({'_id': int(cha_id)})

        if not user:
            return jsonify({'error': 'User not found.'}), 404
        if not channel:
            return jsonify({'error': 'channel not found.'}), 404

        if joinchannel.find_one({'username': username, '_id': cha_id}):
            return jsonify({'error': 'User already in channel.'}), 409

        joinchannel.insert_one({'username': username, '_id': cha_id})
        return jsonify({'message': 'User added to channel'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/joinchannels/remove', methods=['DELETE'])
def remove_user_from_cha():
    data = request.get_json()
    cha_id = data.get('cha_id')
    username = data.get('username')

    if not cha_id or not username:
        return jsonify({'message': 'Invalid request data!'}), 400

    if not users.find_one({'username': str(username)}):
        return jsonify({'message': 'User not found!'}), 404

    if not joinchannel.find_one({'_id': int(cha_id)}):
        return jsonify({'message': 'channel not found!'}), 404

    result = joinchannel.delete_one({'username': username, '_id': int(cha_id)})

    if result.deleted_count == 0:
        return jsonify({'message': 'user not found in channel!'}), 404

    return jsonify({'message': 'user removed from channel'}), 200

if __name__ == '__main__':
    app.run(debug=True)