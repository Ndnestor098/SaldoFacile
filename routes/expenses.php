<?php

use App\Http\Controllers\Expense\ExpenseController;
use App\Http\Controllers\Expense\RecurrentExpenseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ExpenseController::class, 'index'])->name('index');
Route::post('/create', [ExpenseController::class, 'store'])->name('store');
Route::delete('/destroy/{expense}', [ExpenseController::class, 'destroy'])->name('destroy');

Route::get('/recurrent', [RecurrentExpenseController::class, 'index'])->name('recurring');
Route::post('/recurrent', [RecurrentExpenseController::class, 'store'])->name('recurring.store');
Route::delete('/recurrent/destroy/{recurrentExpense}', [RecurrentExpenseController::class, 'destroy'])->name('recurring.destroy');

Route::get('/history', [ExpenseController::class, 'history'])->name('history');

Route::get('/categories', function () {
    return Inertia::render('Dashboard');
})->name('categories');
