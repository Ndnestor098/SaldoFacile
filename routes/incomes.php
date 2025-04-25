<?php

use App\Http\Controllers\Income\IncomeController;
use App\Http\Controllers\Income\RecurrentIncomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [IncomeController::class, 'index'])->name('index');
Route::post('/create', [IncomeController::class, 'store'])->name('store');
Route::delete('/destroy/{incomes}', [IncomeController::class, 'destroy'])->name('destroy');

Route::get('/recurrent', [RecurrentIncomeController::class, 'index'])->name('recurring');
Route::post('/recurrent', [RecurrentIncomeController::class, 'store'])->name('recurring.store');
Route::delete('/recurring/destroy/{recurrentIncome}', [RecurrentIncomeController::class, 'destroy'])->name('recurring.destroy');

Route::get('/history', [IncomeController::class, 'history'])->name('history');

Route::get('/categories', function () {
    return Inertia::render('Dashboard');
})->name('categories');
