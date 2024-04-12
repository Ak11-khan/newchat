require('./bootstrap');





import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

// Echo.listen('UserStatusEvent',(e)=>{
//     console.log('UserStatusEvent received:', e);
// })


// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;



// });
// import Echo from "laravel-echo";

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true,
// });


// import Echo from 'laravel-echo';





// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     wsHost: window.location.hostname,
//     wsPort: 6001,
//     forceTLS:false,
//     disableStats: true

// });

import Echo from "laravel-echo";

window.Pusher = require("pusher-js");

window.Echo = new Echo({
    broadcaster: "pusher",
    key: '5f2c60dc61d0394bd18f',
    WsPort:6001,
    cluster: 'us2',
    // encrypted: false,
    forceTLS:false,
    disableStats:true
});



// Echo.connector.pusher.connection.bind('error', function(err) {
//     console.log(err);
// });

// Echo.connector.pusher.connection.bind('connected', function() {
//     console.log('Successfully connected!');
// });

// console.log(window.Echo);

// console.log('test real time file');
// console.log(window.Echo.connector);
// console.log(window.Echo.connector.pusher);
// console.log(window.Echo.channel);

// Echo.channel('status-update')
// .listen('UserStatusEvent', (e) => {
//     console.log('Received UserStatusEvent:', e);
// });
// Fire an event
// Fire a public event
// Subscribe to the channel and listen for the UserStatusEvent
// document.addEventListener('DOMContentLoaded', function() {
//     window.Echo.channel('status-update')
//         .listen('UserStatusEvent', (event) => {
//             // Log the received event data
//             console.log('Received UserStatusEvent:', event.message);

//             // Handle the event data as needed
//             // For example, update the UI or perform other actions
//         });
//     });
// Check if window.Echo is defined and initialized
// if (window.Echo) {
//     console.log('Laravel Echo initialized successfully:', window.Echo);

//     // Check if connector is available
//     if (window.Echo.connector) {
//         console.log('Connector:', window.Echo.connector);

//         // Check if Pusher object is available
//         if (window.Echo.connector.pusher) {
//             console.log('Pusher:', window.Echo.connector.pusher);

//             // Check if channel method is available
//             if (window.Echo.channel) {
//                 console.log('Channel method available:', window.Echo.channel);
//             } else {
//                 console.log('Channel method is not available.');
//             }
//         } else {
//             console.log('Pusher object is not available.');
//         }
//     } else {
//         console.log('Connector object is not available.');
//     }
// } else {
//     console.log('Laravel Echo is not initialized.');
// }
// console.log('test');
// //join use because of presence channel
//     Echo.join('status-update')

//     .here((users)=>{
//         console.log('Users currently present:', users);
//     })

//     .joining(()=>{

//     })
//     .leaving(()=>{

//     })
//      .listen('UserStatusEvent', (e) => {
//      console.log('Received UserStatusEvent:', e);

//     });

