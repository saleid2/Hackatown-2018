"user strict";


/**
 * 
 * @param {string} name New user name
 * @returns {string} name of newly created room
 */
function createUser(name) {
    $.ajax({
        url: "http://localhost:5000/users/new",
        type: "POST",
        data: {
            "user": name
        }
    }).done(function (data) {
        room_name = JSON.parse(data)["room"];
        // TODO: Redirect to chat interface.
    });
}

function createVolunteer(name) {
    $.ajax({
        url: "http://localhost:5000/users/new_volunteer",
        type: "POST",
        data: {
            "user": name
        }
    }).done(function (data) {
        // TODO: Redirect to room list
    });
}

function getEmptyRooms() {
    $.ajax({
        url: "http://localhost:5000/rooms/empty",
        type: "GET"
    }).done(function (data) {
        rooms = JSON.parse(data);
        rooms.forEach(element => {
            // TODO: Add clickable room element to join
        });
    });
}

function joinRoom(room, user) {
    $.ajax({
        url: "http://localhost:5000/rooms/join",
        type: "POST",
        data: {
            "user": user,
            "room": room
        }
    }).done(function (data) {
        // TODO : Get messages
    });
}

function getRoomMessages(room) {
    $.ajax({
        url: "http://localhost:5000/room/" + room + "/message",
        type: "GET"
    }).done(function(data){
        messages = JSON.parse(data);
        messages.forEach(element => {
            user = element["sender"];
            message = element["message"]
            // TODO: Add message to display
        });
    })
}

function sendMessage(room, message, user){
    $.ajax({
        url: "http://localhost:5000/room/" + room + "/message",
        type: "POST",
        data: {
            "user": user,
            "message": message
        }
    }).done(function(data){
        // TODO: Clear textfield
    });
}