<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard',[UserController::class,'loadDashboard'])->middleware(['auth'])->name('dashboard');




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::post('/save-chat',[UserController::class, 'saveChat']);
Route::post('/load-Chats',[UserController::class, 'loadChats']);
Route::get('/search', [UserController::class, 'searchUsers']);


// groups route

Route::get('/groups',[UserController::class,'loadGroups'])->middleware(['auth'])->name('groups');
Route::post('/create-group', [UserController::class, 'createGroup'])->middleware(['auth'])->name('create.group');


// message route

// Route::get('/message',[EmployeeController::class,'loadEmployee'])->middleware(['auth'])->name('message');
// Route::get('/update-employee',[EmployeeController::class,'createEmployee'])->middleware(['auth'])->name('createEmployee');

Route::get('/employees', [EmployeeController::class, 'indexEmployees'])->middleware(['auth'])->name('employees.index');
// Route::post('/employees-store', [EmployeeController::class, 'storeEmployee'])->middleware(['auth'])->name('employees.store');
Route::post('/employees-store', [EmployeeController::class, 'storeEmployee'])->name('employees.store');

// Route::delete('/employees/{id}', [EmployeeController::class, 'destroyEmployee'])->name('employees.destroy');
// Route::get('/employees/create', [EmployeeController::class, 'createEmployee'])->name('employees.create');

// Routes for department management
// Route::get('/departments', [EmployeeController::class, 'indexDepartments'])->name('departments.index');

//Route to handle sending messages to multiple users
Route::post('/send-messages', [UserController::class,'sendMessages'])->middleware(['auth'])->name('send.messages');