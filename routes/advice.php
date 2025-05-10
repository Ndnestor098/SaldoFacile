<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {

    $data = User::with([
            'incomes' => function ($query) {
                $query->where('date', '>=', now()->subDays(30))
                    ->whereHas('category', function ($q) {
                        $q->where('type', 'incomes');
                    })
                    ->with('category');
            },
            'expenses' => function ($query) {
                $query->where('date', '>=', now()->subDays(30))
                    ->whereHas('category', function ($q) {
                        $q->where('type', 'expenses');
                    })
                    ->with('category');
            }, 
            'recurrentExpenses' => function ($query) {
                $query->where('active', '1')
                    ->with('category');
            },
            'recurrentIncomes' => function ($query) {
                $query->where('active', '1')
                    ->with('category');
            },
            'summary'
        ])
        ->where('id', Auth::id())
        ->first();

    return Inertia::render('Advice', compact(
        'data'
    ));
})->name('index');