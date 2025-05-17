<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with(['user', 'team', 'tasks'])->get();
        return response()->json($employees);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'team_id' => 'required|exists:teams,id',
            'position' => 'required|string|max:255',
        ]);

        $employee = Employee::create($validated);
        return response()->json($employee, 201);
    }

    public function show(Employee $employee)
    {
        $employee->load(['user', 'team', 'tasks']);
        return response()->json($employee);
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'team_id' => 'sometimes|exists:teams,id',
            'position' => 'sometimes|string|max:255',
        ]);

        $employee->update($validated);
        return response()->json($employee);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json(null, 204);
    }
} 