<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'image'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function employee()
    {
        return $this->hasOne(Employee::class);
    }

    // public function department()
    // {
    //     return $this->employee->belongsTo(Department::class);
    // }
    public function latestDepartment()
    {
        // Assuming 'user_id' is the foreign key in the 'employees' table
        $latestEmployee = Employee::where('user_id', $this->id)->latest()->first();
        return $latestEmployee ? $latestEmployee->department : null;
        //if ($latestEmployee) {
        // If $latestEmployee exists (i.e., not null)
        //return $latestEmployee->department;
        //} else {
        // If $latestEmployee is null
        //return null;
        //}
    }
}