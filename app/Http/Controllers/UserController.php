<?php

namespace App\Http\Controllers;
use App\Events\UserStatusEvent;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;
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


   public function saveChat(Request $request)
   {
    try {
     $chat= Chat::create([
        'sender_id'=> $request->sender_id,
        'receiver_id' =>$request->receiver_id,
        'message' =>$request->message

     ]);

       event(new MessageEvent($chat));

        return response()->json(['success' => true, 'data' => $chat ]);

    } catch(\Exception $e){

        return response()->json(['success' => false, 'msg' => $e->getMessage() ]);
    }
    }


    public function loadChats(Request $request){
        try {
        $chats = Chat::where(function($query) use ($request){
            $query->Where('sender_id','=', $request->sender_id)
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
}