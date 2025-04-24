<?php

use App\Http\Controllers\Expense\ExpenseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ExpenseController::class, 'index'])->name('index');

Route::get('/recurring', function () {
    return Inertia::render('Dashboard');
})->name('recurring');

Route::get('/history', function () {
    return Inertia::render('Dashboard');
})->name('history');

Route::get('/categories', function () {
    return Inertia::render('Dashboard');
})->name('categories');

Route::post('/create', [ExpenseController::class, 'store'])->name('store');