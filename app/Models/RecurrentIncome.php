<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecurrentIncome extends Model
{
    use HasFactory;

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
        'payment_date',
        'date',
        'source',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeAmount($query, $amount)
    {
        if($amount){
            return $query->where('amount', '>=', $amount);
        }
        return $query;
    }

    public function scopeDate($query, $date)
    {
        if($date){
            return $query->where('date', 'LIKE', "%$date%");
        }
        return $query;
    }
}
