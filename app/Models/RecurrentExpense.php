<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecurrentExpense extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'description',
        'payment_method',
        'name',
        'amount',
        'frequency',
        'start_date',
        'end_date',
        'active',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
