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
    $searchTerm = $request->input('search');
    $users = User::where('name', 'LIKE', "%$searchTerm%")->get();
    return response()->json($users);
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
                'creator_id' => auth()->user()->id,
                'name' => $request->name,
                'image' => $imageName,
                'join_limit' => $request->limit

            ]);
            return response()->json(['success' => true, 'msg' =>  $request->name.'Group has been created successfully' ]);


            } catch(\Exception $e){

                return response()->json(['success' => false, 'msg' => $e->getMessage() ]);
            }
    }
}