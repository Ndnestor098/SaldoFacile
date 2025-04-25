<?php

use App\Http\Controllers\Income\IncomeController;
use App\Http\Controllers\Income\RecurrentIncomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [IncomeController::class, 'index'])->name('index');

Route::get('/recurrent', [RecurrentIncomeController::class, 'index'])->name('recurring');
Route::post('/recurrent', [RecurrentIncomeController::class, 'store'])->name('recurring.store');

Route::get('/history', [IncomeController::class, 'history'])->name('history');

Route::get('/categories', function () {
    return Inertia::render('Dashboard');
})->name('categories');

Route::post('/create', [IncomeController::class, 'store'])->name('store');