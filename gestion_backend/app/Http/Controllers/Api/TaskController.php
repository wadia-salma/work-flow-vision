<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Employee;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::with(['project', 'employees'])->get();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:to_do,in_progress,done',
            'priority' => 'required|in:low,medium,high',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        $task->load(['project', 'employees']);
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'project_id' => 'sometimes|exists:projects,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:to_do,in_progress,done',
            'priority' => 'sometimes|in:low,medium,high',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
        ]);

        $task->update($validated);
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }

    public function assignEmployees(Request $request, Task $task)
    {
        $validated = $request->validate([
            'employee_ids' => 'required|array',
            'employee_ids.*' => 'exists:employees,id',
        ]);

        $task->employees()->attach($validated['employee_ids'], [
            'assigned_date' => now(),
        ]);

        return response()->json(['message' => 'Employees assigned successfully']);
    }

    public function unassignEmployees(Request $request, Task $task)
    {
        $validated = $request->validate([
            'employee_ids' => 'required|array',
            'employee_ids.*' => 'exists:employees,id',
        ]);

        $task->employees()->detach($validated['employee_ids']);

        return response()->json(['message' => 'Employees unassigned successfully']);
    }
} 