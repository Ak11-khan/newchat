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
  $('#chat-form').submit(function (e) {
    e.preventDefault();
    var message = $('#message').val();
    $.ajax({
      url: "/save-chat",
      type: "POST",
      data: {
        sender_id: sender_id,
        receiver_id: receiver_id,
        message: message
      },
      success: function success(res) {
        if (res.success) {
          $('#message').val('');
          var chat = res.data.message;
          var html = "<div class=\"text-3xl current-user-chat\">\n                              <h4>" + chat + "</h4>\n                               </div>";
          $('#chat-container').append(html);
          // console.log(chat);
          scrollChat();
        } else {
          alert(res.msg);
        }
      }
    });
  });
});
console.log('test');

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
      $('#' + users[x]['id'] + '-status').text('online');
    }
  }
  console.log(users);
  console.log(sender_id);
  // console.log([x]);
}).joining(function (user) {
  $('#' + user.id + '-status').removeClass('offline-status');
  $('#' + user.id + '-status').addClass('online-status');
  $('#' + user.id + '-status').text('online');
  console.log('join', user.name);
}).leaving(function (user) {
  $('#' + user.id + '-status').addClass('offline-status');
  $('#' + user.id + '-status').removeClass('online-status');
  $('#' + user.id + '-status').text('Offline');
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
    var html = "\n        <div class=\"text-3xl distance-user-chat\">\n        <h4>" + data.chat.message + "</h4>\n        </div>\n        ";

    //  html += `</h4>`;

    //  html += `<div><img src="" class="round-full user-image">
    //  </div>`;

    $('#chat-container').append(html);
    scrollChat();
  }
});
/******/ })()
;