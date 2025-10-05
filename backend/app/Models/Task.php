<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'complete',
    ];

    protected $casts = [
        'complete' => 'boolean',
    ];
}
