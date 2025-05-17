<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with(['employees', 'projects'])->get();
        return response()->json($teams);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $team = Team::create($validated);
        return response()->json($team, 201);
    }

    public function show(Team $team)
    {
        $team->load(['employees', 'projects']);
        return response()->json($team);
    }

    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
        ]);

        $team->update($validated);
        return response()->json($team);
    }

    public function destroy(Team $team)
    {
        $team->delete();
        return response()->json(null, 204);
    }
} 