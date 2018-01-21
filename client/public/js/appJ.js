var username = "";
var room = "";

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
    output = "<div id=\"" + room + "\"<ons-list-item tappable>";
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
        rooms = JSON.parse(data);
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
function getAssignedRooms(user){
    $.ajax({
        url: "http://localhost:5000//user/"+ user + "/rooms",
        type: "GET"
    }).done(function(data){
        rooms = JSON.parse(data);
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
        // Navigate to chat UI
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
    }).done(function (data) {
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
function sendMessage(room, message, user) {
    $.ajax({
        url: "http://localhost:5000/room/" + room + "/message",
        type: "POST",
        data: {
            "user": user,
            "message": message
        }
    }).done(function (data) {
        // TODO: Clear textfield
    });
}

function checkUsername(callback){
  username = $("#username>input").value;
  if(typeof username == "undefined"){
    username = makeId();
    $("#username>input").value = username;
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
            document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Get help'}});
          });
        });
      };
     
      page.querySelector('#push-button2').onclick = function() 
      {
        checkUsername(function(){
          createVolunteer(username, function(){
            document.querySelector('#myNavigator').pushPage('page3.html', {data: {title: 'Volunteer'}});

          });
        });
      };

    } else if (page.id === 'page2' || page.id ==='page3') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
  });