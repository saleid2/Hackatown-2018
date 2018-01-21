
/**
 * Create new user
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

/**
 * Create new volunteer
 * @param {string} name New volunteer name
 */
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

/**
 * Get a list of empty rooms
 */
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

/**
 * Allow volunteer user to join a chat room
 * @param {string} room Room that volunteer wants to join
 * @param {string} user Volunteer's username
 */
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

/**
 * Get recent messages from room
 * @param {string} room Room joined by volunteer
 */
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

/**
 * Send message
 * @param {string} room Name of room
 * @param {string} message Message to send
 * @param {string} user User sending message
 */
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