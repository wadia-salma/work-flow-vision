<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'team_id' => 1,
                'name' => 'Refonte du site web',
                'description' => 'Refonte complète du site web de l\'entreprise',
                'start_date' => now(),
                'end_date' => now()->addMonths(3),
                'status' => 'in_progress',
            ],
            [
                'team_id' => 2,
                'name' => 'Application Mobile',
                'description' => 'Développement d\'une application mobile',
                'start_date' => now(),
                'end_date' => now()->addMonths(6),
                'status' => 'not_started',
            ],
            [
                'team_id' => 3,
                'name' => 'Campagne Marketing',
                'description' => 'Lancement d\'une nouvelle campagne marketing',
                'start_date' => now(),
                'end_date' => now()->addMonths(2),
                'status' => 'not_started',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
} 