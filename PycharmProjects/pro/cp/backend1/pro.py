@app.route('/channels/members/<string:username>', methods=['GET'])
def get_channel_username(username):
    user = users.find_one({'username': str(username)})
    if not user:
        return jsonify({'message': 'User not found!'}), 404

    channel_data = favourites.find({'username': username})
    channel_data_list = []

    for channel in channel_data:
        cha = channel.find_one({'_id': channel['_id']})

        if cha:
            channel_data_list.append({
                'id': str(cha['_id']),
                'title': cha['title'],
                'url': cha['url'],
                'category': cha['category']
            })

    return jsonify(channel_data_list), 200