<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public $fillable = [
        'name',
        'slug',
        'description',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user');
    }
}
