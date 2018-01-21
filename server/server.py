from flask import Flask, request,jsonify

app = Flask(__name__)


empty_rooms = []
volunteers = []
linked_rooms = {}
room_unread_messages = {}

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/users/new', methods=['POST'])
def add_new_user():
    user = request.get_json()['user']
    empty_rooms.append(user)
    room = {}
    room["room_name"] = user
    return jsonify(room)

@app.route('/users/new_volunteer', methods=['POST'])
def add_new_volunteer():
    user = request.get_json()['user']
    volunteers.append(user)
    return jsonify("OK")

@app.route('/rooms/get_empty', methods=['GET'])
def get_rooms():
    return jsonify(empty_rooms)

@app.route('/rooms/join', methods=['POST'])
def join_room():
    incoming_data = request.get_json()
    room = incoming_data['room']
    user = incoming_data['user']
    if empty_rooms.count(room) == 1:
        empty_rooms.remove(room)
        linked_rooms[room] = user
        room_unread_messages[room] = []
        return jsonify("OK")
    else:
        return jsonify("NO")


@app.route('/room/<room>/message', methods=['GET', 'POST'])
def update_messages(room):
    if request.method == 'GET':
        outgoing_messages = room_unread_messages[room]
        room_unread_messages[room] = {}
        return jsonify(outgoing_messages)
    else:
        incoming_data = request.get_json()
        incoming_message = incoming_data['message']
        sender = incoming_data['user']
        message_data = {}
        message_data['sender'] = sender
        message_data['message'] = incoming_message
        room_messages = room_unread_messages[room]
        if not room_messages:
            room_messages = [message_data]
        else:
            room_messages.append(message_data)
        room_unread_messages[room] = room_messages
        return jsonify('OK')



if __name__ == '__main__':
    app.run()