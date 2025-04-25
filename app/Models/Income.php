<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    /** @use HasFactory<\Database\Factories\IncomeFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'amount',
        'category_id',
        'source',
        'date',
        'description',
        'payment_method',
        'currency',
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
