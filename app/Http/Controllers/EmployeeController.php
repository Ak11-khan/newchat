<?php

namespace App\Http\Controllers;
use App\Events\UserStatusEvent;
use App\Models\Chat;
use App\Models\Department;
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
   public function indexEmployees()
    {
        $departments = Department::all(); // Retrieve all departments
        $employees = Employee::where('user_id',auth()->user()->id)->get();
        return view('employees.index', compact('employees','departments'));
    }

    // public function createEmployee()
    // {
    //     return view('employees.create');
    // }

    public function storeEmployee(Request $request)
    {
        try {
            $request->validate([
                'department_id' => 'required'
            ]);

            Employee::create([
                'user_id' => auth()->user()->id,
                'department_id' => $request->department_id
            ]);

            return response()->json(['success' => true, 'msg' => 'Department assigned successfully']);
        } catch (\Exception $e) {
            // Log the exception for debugging purposes
            //    Log::info('user_id');

            // Return a generic error message to the user
            return response()->json(['success' => false, 'msg' => 'Failed to assign department. Please try again later.']);
        }
    }




    // public function indexDepartments()
    // {
    //     $departments = Department::all();
    //     return view('department.index', compact('departments'));
    // }


}