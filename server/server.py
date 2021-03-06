from flask import Flask, request,jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

empty_rooms = []
volunteers = []
linked_rooms = {}
room_messages_log = {}

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/users/new', methods=['POST'])
def add_new_user():
    user = request.form.getlist('user')[0]
    print(user)
    empty_rooms.append(user)
    room = {}
    room["room_name"] = user
    room_messages_log[user] = []
    return jsonify(room)

@app.route('/users/new_volunteer', methods=['POST'])
def add_new_volunteer():
    user = request.form.getlist('user')
    volunteers.append(user)
    return jsonify("OK")

@app.route('/rooms/empty', methods=['GET'])
def get_rooms():
    return jsonify(rooms = empty_rooms)

@app.route('/rooms/join', methods=['POST'])
def join_room():
    incoming_data = request.form
    room = incoming_data['room']
    user = incoming_data['user']
    if empty_rooms.count(room) == 1:
        empty_rooms.remove(room)
        linked_rooms[room] = user
        return jsonify()
    else:
        return jsonify()

@app.route('/user/<user>/rooms', methods=['GET'])
def get_user_rooms(user):
    if len(linked_rooms.keys()) > 0:
        rooms_filter = filter(lambda k: linked_rooms[k] == user, linked_rooms.keys())
        rooms = list(rooms_filter)
    else:
        rooms = []
    return jsonify(rooms = rooms)

@app.route('/room/<room>/message', methods=['GET', 'POST'])
def update_messages(room):
    if request.method == 'GET':
        outgoing_messages = room_messages_log[room]
        #room_messages_log[room] = {}
        return jsonify(messages = outgoing_messages)
    else:
        incoming_data = request.form
        incoming_message = incoming_data['message']
        sender = incoming_data['user']
        message_data = {}
        message_data['sender'] = sender
        message_data['message'] = incoming_message
        room_messages = room_messages_log[room]
        if not room_messages:
            room_messages = [message_data]
        else:
            room_messages.append(message_data)
        room_messages_log[room] = room_messages
        return jsonify()



if __name__ == '__main__':
    app.run()