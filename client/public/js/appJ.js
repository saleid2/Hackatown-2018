var username = "";
var room = "";
var update_interval;
var update_delay = 1000;

/**
 * Randomly generates a string in case the user doesn't enter one
 */
function makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/**
 * Generates the item to add to the list of available rooms
 * @param {string} room Room name
 */
function generateListItem(room){
    output = "<div id=\"" + room + "\"\\><ons-list-item tappable>";
    output += room;
    output += "</ons-list-item></div>"
    return output;
}

/**
 * Create new user
 * @param {string} name New user name
 */
function createUser(name, callback) {
    $.ajax({
        url: "http://localhost:5000/users/new",
        type: "POST",
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
            "user": name
        }
    }).done(callback);
}

/**
 * Create new volunteer
 * @param {string} name New volunteer name
 */
function createVolunteer(name, callback) {
    $.ajax({
        url: "http://localhost:5000/users/new_volunteer",
        type: "POST",
        data: {
            "user": name
        }
    }).done(function (data) {
        callback();
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
        rooms = data['rooms'];
        console.log(rooms);
        rooms.forEach(element => {
            domItem = generateListItem(element);
            $("#empty_rooms").append(domItem);
            $("#"+element).click(function(){
                joinRoom(element);
            });
        });
    });
}

/**
 * Fetches a list of rooms assigned to current user
 * @param {string} user Username who's rooms must be fetched
 */
function getAssignedRooms(){
    $.ajax({
        url: "http://localhost:5000/user/"+ username + "/rooms",
        type: "GET"
    }).done(function(data){
        rooms = data['rooms'];
        rooms.forEach(element => {
            domItem = generateListItem(element);
            $("#volunteer_rooms").append(domItem);
            $("#"+element).click(function(){
                joinRoom(element);
            });
        });
    });
}

/**
 * Allow volunteer user to join a chat room
 * @param {string} selected_room Room that volunteer wants to join
 * @param {string} user Volunteer's username
 */
function joinRoom(selected_room) {
    $.ajax({
        url: "http://localhost:5000/rooms/join",
        type: "POST",
        data: {
            "user": username,
            "room": selected_room
        }
    }).done(function (data) {
        room = selected_room;
        document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Get help'}});
    });
}


function getFormattedSentMessage(message){
    output = "<div class=\"sent_msg\">";
    output += message;
    output += "</div>";
    return output;
}

function getFormattedReceivedMessage(message){
    output = "<div class=\"received_msg\">";
    output += message;
    output += "</div>";
    return output;
}


/**
 * Get recent messages from room
 * @param {string} room Room joined by volunteer
 */
function getRoomMessages(room) {
    $.ajax({
        url: "http://localhost:5000/room/" + room + "/message",
        type: "GET"
    }).done(function (data) {
        messages = data["messages"];
        if(messages && messages.length > 0){
            $("#chat_layout").empty();
            messages.forEach(element => {
                user = element["sender"];
                message = element["message"]
                console.log(message);
                if(user == username){
                    output = getFormattedSentMessage(message);
                }
                else {
                    output = getFormattedReceivedMessage(message);
                }
                $("#chat_layout").append(output);
            });
        }
    })
}

/**
 * Send message
 * @param {string} room Name of room
 * @param {string} message Message to send
 * @param {string} user User sending message
 */
function sendMessage() {
    var message = $("#typed_msg>input").val();
    $.ajax({
        url: "http://localhost:5000/room/" + room + "/message",
        type: "POST",
        data: {
            "user": username,
            "message": message
        }
    }).done(function (data) {
        $("#typed_msg>input").val('');
    });
}

function checkUsername(callback){
  username = $("#username>input").val();
  if(username == ""){
    username = makeId();
    $("#username>input").val(username);
  }
  console.log(username);
  callback();
}

document.addEventListener('init', function(event) {
    var page = event.target;
  
    if (page.id === 'page1') {
      page.querySelector('#push-button').onclick = function() 
      {
        checkUsername(function(){
          createUser(username, function(){
            room = username;
            document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Get help'}});
          });
        });
      };
     
      page.querySelector('#push-button2').onclick = function() 
      {
        checkUsername(function(){
          createVolunteer(username, function(){
              getEmptyRooms();
              getAssignedRooms();
            document.querySelector('#myNavigator').pushPage('page3.html', {data: {title: 'Volunteer'}});

          });
        });
      };

    } else if (page.id === 'page2' || page.id ==='page3') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
      if(page.id == "page2"){
        page.querySelector("#send_btn").onclick = sendMessage;
        update_interval = setInterval(function () {
            if(room != "")
                getRoomMessages(room);
        }, update_delay);
      }
    } 
  });