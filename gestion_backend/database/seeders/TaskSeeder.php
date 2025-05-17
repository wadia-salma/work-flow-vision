<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $tasks = [
            [
                'project_id' => 1,
                'name' => 'Analyse des besoins',
                'description' => 'Analyser les besoins des utilisateurs',
                'status' => 'done',
                'priority' => 'high',
                'start_date' => now()->subDays(10),
                'end_date' => now()->subDays(5),
            ],
            [
                'project_id' => 1,
                'name' => 'Design des maquettes',
                'description' => 'Créer les maquettes du nouveau site',
                'status' => 'in_progress',
                'priority' => 'high',
                'start_date' => now()->subDays(5),
                'end_date' => now()->addDays(5),
            ],
            [
                'project_id' => 2,
                'name' => 'Architecture technique',
                'description' => 'Définir l\'architecture technique de l\'application',
                'status' => 'to_do',
                'priority' => 'medium',
                'start_date' => now(),
                'end_date' => now()->addDays(7),
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }
    }
} 