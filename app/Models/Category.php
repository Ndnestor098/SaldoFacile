<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'icon_id',
        'text_color',
        'background_color',
        'type',
    ];

    public function icon()
    {
        return $this->belongsTo(Icon::class);
    }
}
