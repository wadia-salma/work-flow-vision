<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $positions = ['Développeur', 'Designer', 'Chef de Projet', 'Marketing Manager'];

        foreach ($users as $index => $user) {
            Employee::create([
                'user_id' => $user->id,
                'team_id' => ($index % 3) + 1, // Répartir les employés entre les 3 équipes
                'position' => $positions[$index % count($positions)],
            ]);
        }
    }
} 