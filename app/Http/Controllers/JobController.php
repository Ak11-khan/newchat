<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Job;

class JobController extends Controller
{

    public function search()
    {

    return view('jobs.search_job');

    }
}