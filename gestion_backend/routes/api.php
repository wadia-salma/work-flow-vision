<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;

// Route pour l'utilisateur authentifié
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes pour les utilisateurs
Route::apiResource('users', UserController::class);

// Routes pour les équipes
Route::apiResource('teams', TeamController::class);

// Routes pour les employés
Route::apiResource('employees', EmployeeController::class);

// Routes pour les projets
Route::apiResource('projects', ProjectController::class);

// Routes pour les tâches
Route::apiResource('tasks', TaskController::class);

// Routes supplémentaires pour les tâches
Route::post('tasks/{task}/assign', [TaskController::class, 'assignEmployees']);
Route::post('tasks/{task}/unassign', [TaskController::class, 'unassignEmployees']);
    