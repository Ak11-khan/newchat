<?php

namespace App\Http\Controllers;
use App\Events\UserStatusEvent;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\User;
use App\Models\Group;
use App\Models\Employee;
use App\Events\MessageEvent;
use Illuminate\Support\Facades\Auth;
use Psy\Command\WhereamiCommand;
class EmployeeController extends Controller
{

//     public function loadMessages(Request $request)
//     {
//         $users= User::whereNotIn('id',[auth()->user()->id])->get();
//  // Retrieve the authenticated user
//  $user = Auth::user();
// //  print_r($user);
//  $userId = $user->id;

//  // Find the employee record for the user
//  $messages = Employee::where('employee_id', $userId)->get();

//  // If employee record not found, you may want to handle it accordingly
// //  if (!$employee) {
// //      // Handle the case where employee record doesn't exist
// //      // For example, you might want to return an error message or redirect to a different page
// //      return redirect()->back()->with('error', 'Employee record not found.');
// //  }

// //  // Fetch messages where the current user is either the sender or receiver


//  // Pass data to the view
//  return view('dashboard', compact('messages','users'));
// }

public function loadMessages(){

    // Log::info('Event sent: UserStatusEvent');
    // event(new UserStatusEvent('151'));
    $users= User::whereNotIn('id',[auth()->user()->id])->get();
    return view('dashboard', compact('users'));
   }

}