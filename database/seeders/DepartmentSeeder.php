<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define department data
        $departments = [
            ['name' => 'Sales'],
            ['name' => 'HVAC'],
            ['name' => 'Electricians'],
            ['name' => 'Tech'],
            // Add more departments as needed
        ];

        // Insert department data into the departments table
        DB::table('departments')->insert($departments);
    }
}