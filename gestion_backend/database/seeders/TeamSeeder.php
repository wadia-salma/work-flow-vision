<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        $teams = [
            [
                'name' => 'Équipe Développement',
                'description' => 'Équipe responsable du développement des applications',
            ],
            [
                'name' => 'Équipe Design',
                'description' => 'Équipe responsable du design et de l\'expérience utilisateur',
            ],
            [
                'name' => 'Équipe Marketing',
                'description' => 'Équipe responsable du marketing et de la communication',
            ],
        ];

        foreach ($teams as $team) {
            Team::create($team);
        }
    }
} 