<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Task;
use Illuminate\Database\Seeder;

class EmployeeTaskSeeder extends Seeder
{
    public function run(): void
    {
        $employees = Employee::all();
        $tasks = Task::all();

        foreach ($tasks as $task) {
            // Assigner 1 à 3 employés aléatoires à chaque tâche
            $randomEmployees = $employees->random(rand(1, 3));
            foreach ($randomEmployees as $employee) {
                $employee->tasks()->attach($task->id, [
                    'assigned_date' => now(),
                ]);
            }
        }
    }
} 