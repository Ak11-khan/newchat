<?php

namespace App\Http\Controllers;
use App\Events\UserStatusEvent;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Group;
use App\Events\MessageEvent;
use Psy\Command\WhereamiCommand;

class UserController extends Controller
{

   public function loadDashboard(){

    // Log::info('Event sent: UserStatusEvent');
    // event(new UserStatusEvent('151'));
    $users= User::whereNotIn('id',[auth()->user()->id])->get();
    return view('dashboard', compact('users'));
   }
   public function searchUsers(Request $request)
   {
    // $searchTerm = $request->input('search');
    // $users = User::where('name', 'LIKE', "%$searchTerm%")->get();
    // return response()->json($users);
    $department = $request->input('department');

    // Query users based on department
    $users = User::whereHas('employee', function ($query) use ($department) {
        $query->where('department', $department);
    })->get();

    return response()->json($users);
   }



//    public function saveChat(Request $request)
//    {
//     try {
//      $chat= Chat::create([
//         'sender_id'=> $request->sender_id,
//         'receiver_id' =>$request->receiver_id,
//         'message' =>$request->message

//      ]);

//        event(new MessageEvent($chat));

//         return response()->json(['success' => true, 'data' => $chat ]);

//     } catch(\Exception $e){

//         return response()->json(['success' => false, 'msg' => $e->getMessage() ]);
//     }
//     }

//today save-chat

public function saveChat(Request $request)
{
    try {
        // Get the sender ID from the request
        $senderId = $request->sender_id;

        // Get the array of receiver IDs from the request
        $receiverIds = $request->receiver_ids;

        // Get the message from the request
        $message = $request->message;

        // Loop through each receiver ID and save a chat for each one
        foreach ($receiverIds as $receiverId) {
            $chat = Chat::create([
                'sender_id' => $senderId,
                'receiver_id' => $receiverId,
                'message' => $message
            ]);

            // Fire the event for each chat created
            event(new MessageEvent($chat));
        }

        return response()->json(['success' => true, 'msg' => 'Message sent successfully']);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'msg' => $e->getMessage()]);
    }
}
//end today save-chat


    public function loadChats(Request $request){
        try {
        $chats = Chat::with(['sender', 'receiver'])

        ->where(function($query) use ($request){
            $query->Where('sender_id','=', $request->sender_id )
            ->orWhere('sender_id','=', $request->receiver_id);
           })->where(function($query) use ($request){
            $query->Where('receiver_id','=', $request->sender_id)
            ->orWhere('receiver_id','=', $request->receiver_id);
           })->get();



               return response()->json(['success' => true, 'data' => $chats ]);

           } catch(\Exception $e){

               return response()->json(['success' => false, 'msg' => $e->getMessage() ]);
           }
    }


    public function loadGroups(){
    //   all group creators show
       $groups= Group::where('creator_id',auth()->user()->id)->get();

        return view('groups',compact('groups'));
    }

    //try catch for ajax
    public function createGroup(Request $request){
        try {

            $imageName= '';
            if($request->image){
                $imageName = time().'.'.$request->image->extension();
                $request->image->move(public_path('images'),$imageName);
                $imageName = 'images/'.$imageName;
            }
                 Group::insert([
                'creator_id' => auth()->user()->id,//retrieve id from auth
                'name' => $request->name,
                'image' => $imageName,
                'join_limit' => $request->limit

            ]);
            return response()->json(['success' => true, 'msg' =>  $request->name.'Group has been created successfully' ]);


            } catch(\Exception $e){

                return response()->json(['success' => false, 'msg' => $e->getMessage() ]);
            }
    }

//today
    // Modify the server-side endpoint to handle sending messages to multiple users
public function sendMessage(Request $request)
{
    $message = $request->input('message');
    $selectedUserIds = $request->input('selectedUserIds');

    // Broadcast the message to each selected user
    foreach ($selectedUserIds as $userId) {
        // Implement your logic to send the message to each user
        // For example, you might use Laravel Echo to broadcast the message to each user's chat window
        broadcast(new MessageEvent($message))->toOthers();
    }

    return response()->json(['msg' => 'Message sent successfully']);
}

}