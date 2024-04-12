$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// $(document).ready(function(){
    $(document).ready(function() {
        $('#searchForm').submit(function(event) {
            event.preventDefault(); // Prevent the form from submitting normally

            // Get the search term from the input field
            const searchTerm = $('#searchInput').val();

            // Send AJAX request to the server
            $.ajax({
                url: '/search',
                type: 'GET',
                data: { search: searchTerm },
                dataType: 'json',
                success: function(data) {
                    // Update UI with search results
                    $('#searchResults').empty();
                    $.each(data, function(index, user) {
                        const userElement = $('<div>').text(user.name);
                        $('#searchResults').append(userElement);
                        console.log("userElement");
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        });
    });

    // $(document).ready(function() {
    //     // Event listener for user list item click
    //     $('.user-list').click(function() {
    //         // Hide all other user list items
    //         $('.user-list').not(this).hide();

    //         // Show only the clicked user list item
    //         $(this).show();
    //     });
    // });

    $(document).ready(function() {
        $('#searchInput').on('input', function() {
            // Get the search term from the input field
            const searchTerm = $(this).val().toLowerCase();

            // Hide all user list items
            $('.user-list').hide();

            // Show only the user list items that match the search term
            $('.user-list').each(function() {
                const userName = $(this).text().toLowerCase();
                if (userName.includes(searchTerm)) {
                    $(this).show();
                }
            });
        });
    });
// });
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



    //chat groiup script
    // prevent default not refresh page when click on submit button

    $(document).ready(function(){
     $('#createGroupForm').submit(function(e){
        e.preventDefault();

        $.ajax({
            url:"/create-group",
            type:"POST",
            data:new FormData(this),
            contentType:false,
            cache:false,
            processData:false,
            success:function(res){
                alert(res.msg);
                if(res.success){
                    location.reload();
                }
            }
        })
     });
    });
