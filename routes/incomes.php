<?php

use App\Http\Controllers\Income\IncomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [IncomeController::class, 'index'])->name('index');

Route::get('/history', function () {
    return Inertia::render('Dashboard');
})->name('history');

Route::get('/categories', function () {
    return Inertia::render('Dashboard');
})->name('categories');

Route::post('/create', [IncomeController::class, 'store'])->name('store');