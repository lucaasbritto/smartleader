<?php

namespace App\Models;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

     protected $fillable = [
        'name',
        'identifier',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function tasks(){
        return $this->hasMany(Task::class);
    }
}

