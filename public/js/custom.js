/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./resources/js/custom.js ***!
  \********************************/
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

// $(document).ready(function(){
// $(document).ready(function() {
//     $('#searchForm').submit(function(event) {
//         event.preventDefault(); // Prevent the form from submitting normally

//         // Get the search term from the input field
//         const searchTerm = $('#searchInput').val();

//         // Send AJAX request to the server
//         $.ajax({
//             url: '/search',
//             type: 'GET',
//             data: { search: searchTerm },
//             dataType: 'json',
//             success: function(data) {
//                 // Update UI with search results
//                 $('#searchResults').empty();
//                 $.each(data, function(index, user) {
//                     const userElement = $('<div>').text(user.name);
//                     $('#searchResults').append(userElement);
//                     console.log("userElement");
//                 });
//             },
//             error: function(xhr, status, error) {
//                 console.error('Error:', error);
//             }
//         });
//     });
// });

//today
$(document).ready(function () {
  $('#searchForm').submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the search term from the input field
    var searchTerm = $('#searchInput').val();

    // Get the department selection
    var department = $('#departmentSelect').val();

    // Send AJAX request to the server
    $.ajax({
      url: '/search',
      type: 'GET',
      data: {
        search: searchTerm,
        department: department
      },
      dataType: 'json',
      success: function success(data) {
        // Update UI with search results
        $('#searchResults').empty();
        $.each(data, function (index, user) {
          var userElement = $('<div>').text(user.name);
          $('#searchResults').append(userElement);
        });
      },
      error: function error(xhr, status, _error) {
        console.error('Error:', _error);
      }
    });
  });
});

// message based on search
$('#sendMessageForm').submit(function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the message text from the input field
  var message = $('#messageInput').val();

  // Get the IDs of the selected users
  var selectedUserIds = [];
  $('.user-checkbox:checked').each(function () {
    selectedUserIds.push($(this).val());
  });

  // Send AJAX request to the server
  $.ajax({
    url: '/send-message',
    type: 'POST',
    data: {
      message: message,
      selectedUserIds: selectedUserIds
    },
    dataType: 'json',
    success: function success(response) {
      alert(response.msg);
    },
    error: function error(xhr, status, _error2) {
      console.error('Error:', _error2);
    }
  });
});

//for specific user send message
// Define an array to store selected user IDs
var selectedUserIds = [];

// Event listener for when a user is clicked
$('.user-list').click(function () {
  var userId = $(this).data('id');

  // Toggle selection
  if (selectedUserIds.includes(userId)) {
    // Deselect user
    selectedUserIds = selectedUserIds.filter(function (id) {
      return id !== userId;
    });
  } else {
    // Select user
    selectedUserIds.push(userId);
  }
  console.log(selectedUserIds); // For debugging - remove in production
});

//end today

$(document).ready(function () {
  $('#searchInput').on('input', function () {
    // Get the search term from the input field
    var searchTerm = $(this).val().toLowerCase();

    // Hide all user list items
    $('.user-list').hide();

    // Show only the user list items that match the search term
    $('.user-list').each(function () {
      var userName = $(this).text().toLowerCase();
      if (userName.includes(searchTerm)) {
        $(this).show();
      }
    });
  });
});
// });
//message container
$(document).ready(function () {
  $('.user-list').click(function () {
    // empty chat container
    $('#chat-container').html('');
    var getUserId = $(this).attr('data-id');
    receiver_id = getUserId;
    $('.start-head').hide();
    $('.chat-section').show();
    loadOldChats();
  });

  //     $('#chat-form').submit(function(e){
  //       e.preventDefault();

  //       var message = $('#message').val();

  //        $.ajax({
  //          url:"/save-chat",
  //          type:"POST",
  //          data:{
  //              sender_id:sender_id,
  //              receiver_id:receiver_id,
  //              message:message
  //          },
  //              success:function(res){
  //                 if(res.success){
  //                    $('#message').val('');

  //                    let chat = res.data.message;

  //                    let html =
  //                    `<div class=" current-user-chat">
  //                               <h4>`+chat+`</h4>
  //                                </div>`;

  //                     $('#chat-container').append(html);
  //                     // console.log(chat);
  //                     scrollChat();

  //                 }else{
  //                   alert(res.msg);
  //                 }

  //              }
  //       });
  //     });
  //  });

  //todays chat-form for /save-chat route

  $('#chat-form').submit(function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get the selected receiver IDs
    var receiverIds = [];
    $('.user-checkbox:checked').each(function () {
      receiverIds.push($(this).val());
    });

    // Get the message
    var message = $('#message').val();

    // Send AJAX request to save the chat
    $.ajax({
      url: "/save-chat",
      type: "POST",
      data: {
        sender_id: sender_id,
        receiver_ids: receiverIds,
        // Pass the array of receiver IDs
        message: message
      },
      success: function success(res) {
        console.log(res); // Log the entire response object
        if (res.success) {
          $('#message').val('');
          var chat = res.data.message;
          var html = "<div class=\"current-user-chat\">\n                            <h4>".concat(chat, "</h4>\n                        </div>");
          $('#chat-container').append(html);
          scrollChat();
        } else {
          alert(res.msg);
          console.log(res);
        }
      },
      error: function error(xhr, status, _error3) {
        console.error('Error:', _error3);
      }
    });
  });
});
// end todays chat-form for /save-chat route

// loadOldChats

function loadOldChats() {
  $.ajax({
    url: "/load-Chats",
    type: "POST",
    data: {
      sender_id: sender_id,
      receiver_id: receiver_id
    },
    success: function success(res) {
      if (res.success) {
        $('#message').val('');
        var chats = res.data;
        var html = "";
        for (var i = 0; i < chats.length; i++) {
          var addClass = '';
          if (chats[i].sender_id == sender_id) {
            addClass = "current-user-chat";
            // console.log(addClass);
          } else {
            addClass = "distance-user-chat";
          }
          html += "<div class=\"" + addClass + "\">\n                           <h4>" + chats[i].message + "</h4>\n                            </div>\n                            ";
        }
        // let html = ``;
        // for (let i = 0; i < chats.length; i++) {
        //     let addClass = chats[i].sender_id == sender_id ? "current-user-chat" : "distance-user-chat";
        //     let userImage = chats[i].sender_id == sender_id ? chats[i].sender.image : chats[i].receiver.image;
        //     let userName = chats[i].sender_id == sender_id ? "You" : chats[i].receiver.name;

        //     html += `
        //         <div class="${addClass}">
        //             <div class="message-info">
        //                 <img src="${userImage}" alt="User Image" class="rounded-full user-image">
        //                 <h4>${userName}</h4>
        //                 <span class="message-timestamp">${chats[i].created_at}</span>
        //             </div>
        //             <h4>`+chats[i].message+`</h4>
        //         </div>
        //     `;
        // }
        $('#chat-container').append(html);
        scrollChat();
      } else {
        alert(res.msg);
      }
    }
  });
}

// scroll msg

function scrollChat() {
  $('#chat-container').animate({
    scrollTop: $('#chat-container').offset().top + $('#chat-container')[0].scrollHeight
  }, 0);
}

//Echo start
Echo.join('status-update').here(function (users) {
  for (var x = 0; x < users.length; x++) {
    if (sender_id != users[x]['id']) {
      $('#' + users[x]['id'] + '-status').removeClass('offline-status');
      $('#' + users[x]['id'] + '-status').addClass('online-status');
      $('#' + users[x]['id'] + '-status').text('●');
    }
  }
  console.log(users);
  console.log(sender_id);
  // console.log([x]);
}).joining(function (user) {
  $('#' + user.id + '-status').removeClass('offline-status');
  $('#' + user.id + '-status').addClass('online-status');
  $('#' + user.id + '-status').text('●');
  console.log('join', user.name);
}).leaving(function (user) {
  $('#' + user.id + '-status').addClass('offline-status');
  $('#' + user.id + '-status').removeClass('online-status');
  $('#' + user.id + '-status').text('●');
  console.log('left', user.id);
}).error(function (error) {
  console.error(error);
});
window.Echo.channel('status-update').listen('UserStatusEvent', function (e) {
  console.log('Received UserStatusEvent:', e);
});
// });
// console.log('After joining channel');

window.Echo["private"]('broadcast-message')

// window.Echo.channel('broadcast-message')
.listen('.getChatMessage', function (data) {
  console.log('Received:', data);
  if (sender_id == data.chat.receiver_id && receiver_id == data.chat.sender_id) {
    var html = "\n        <div class=\" distance-user-chat\">\n        <h4>" + data.chat.message + "</h4>\n        </div>\n        ";

    //  html += `</h4>`;

    //  html += `<div><img src="" class="round-full user-image">
    //  </div>`;

    $('#chat-container').append(html);
    scrollChat();
  }
});

//chat group script
// prevent default not refresh page when click on submit button

$(document).ready(function () {
  $('#createGroupForm').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "/create-group",
      type: "POST",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function success(res) {
        alert(res.msg);
        if (res.success) {
          location.reload();
        }
      }
    });
  });
});
$(document).ready(function () {
  $('#createEmployeeForm').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "/employees-store",
      type: "POST",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function success(res) {
        console.log(res); // Log the response object to the console
        alert(res.msg);
        if (res.success) {
          location.reload();
        }
      }
    });
  });
});
/******/ })()
;