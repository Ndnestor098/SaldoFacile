<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Summary extends Model
{
    protected $fillable = [
        'total_incomes',
        'total_expenses',
        'net_balance',
        'user_id'
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }
}
