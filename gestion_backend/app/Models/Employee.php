<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'team_id',
        'position',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'employee_task')
            ->withPivot('assigned_date')
            ->withTimestamps();
    }
} 