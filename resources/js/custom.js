$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

//message container
$(document).ready(function(){
    $('.user-list').click(function(){

        // empty chat container
        $('#chat-container').html('');

        var getUserId = $(this).attr('data-id');

        receiver_id = getUserId;

        $('.start-head').hide();
        $('.chat-section').show();

        loadOldChats();

    });

    $('#chat-form').submit(function(e){
      e.preventDefault();

      var message = $('#message').val();

       $.ajax({
         url:"/save-chat",
         type:"POST",
         data:{
             sender_id:sender_id,
             receiver_id:receiver_id,
             message:message
         },
             success:function(res){
                if(res.success){
                   $('#message').val('');

                   let chat = res.data.message;

                   let html =
                   `<div class=" current-user-chat">
                              <h4>`+chat+`</h4>
                               </div>`;

                    $('#chat-container').append(html);
                    // console.log(chat);
                    scrollChat();

                }else{
                  alert(res.msg);
                }

             }
      });
    });
 });

console.log('test');

// loadOldChats

function loadOldChats(){
   $.ajax({
        url:"/load-Chats",
        type:"POST",
        data:{ sender_id:sender_id,receiver_id:receiver_id },
        success:function(res){
            if(res.success){
                $('#message').val('');

                let chats = res.data;

                let html = ``;
                 for(let i=0;i<chats.length;i++){
                    let addClass = '';
                    if(chats[i].sender_id == sender_id){
                    addClass = "current-user-chat";
                    // console.log(addClass);
                    }
                    else{
                        addClass ="distance-user-chat";
                    }
                html +=
                `<div class="`+addClass+`">
                           <h4>`+chats[i].message+`</h4>
                            </div>
                            `;
                 }
                 $('#chat-container').append(html);
                 scrollChat();

             }else{
               alert(res.msg);
             }
        }
    })
}

// scroll msg

function scrollChat(){
   $('#chat-container').animate({
      scrollTop: $('#chat-container').offset().top +  $('#chat-container')[0].scrollHeight
   },0)
}

//Echo start
Echo.join('status-update')
.here((users) => {

    for (let x = 0; x < users.length; x++){
     if(sender_id != users[x]['id']){

        $('#'+users[x]['id']+'-status').removeClass('offline-status');
        $('#'+users[x]['id']+'-status').addClass('online-status');
        $('#'+users[x]['id']+'-status').text('online');
          }
    }
    console.log(users);
    console.log(sender_id);
    // console.log([x]);
})
.joining((user) => {

        $('#'+user.id+'-status').removeClass('offline-status');
        $('#'+user.id+'-status').addClass('online-status');
        $('#'+user.id+'-status').text('online');
        console.log('join', user.name);
})
.leaving((user) => {

        $('#'+user.id+'-status').addClass('offline-status');
        $('#'+user.id+'-status').removeClass('online-status');
        $('#'+user.id+'-status').text('Offline');
        console.log('left', user.id);

})
.error((error) => {
    console.error(error);
});

window.Echo.channel('status-update')
.listen('UserStatusEvent', (e) => {
    console.log('Received UserStatusEvent:', e);
});
// });
    // console.log('After joining channel');


    window.Echo.private('broadcast-message')

    // window.Echo.channel('broadcast-message')
    .listen('.getChatMessage', (data) => {
        console.log('Received:', data);

        if(sender_id == data.chat.receiver_id && receiver_id == data.chat.sender_id){
            let html = `
        <div class=" distance-user-chat">
        <h4>`+data.chat.message+`</h4>
        </div>
        `;


        //  html += `</h4>`;

        //  html += `<div><img src="" class="round-full user-image">
        //  </div>`;


        $('#chat-container').append(html);
        scrollChat();

        }
    });
