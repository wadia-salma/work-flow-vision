<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with(['team', 'tasks'])->get();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:not_started,in_progress,completed,on_hold',
        ]);

        $project = Project::create($validated);
        return response()->json($project, 201);
    }

    public function show(Project $project)
    {
        $project->load(['team', 'tasks']);
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'team_id' => 'sometimes|exists:teams,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
            'status' => 'sometimes|in:not_started,in_progress,completed,on_hold',
        ]);

        $project->update($validated);
        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
} 