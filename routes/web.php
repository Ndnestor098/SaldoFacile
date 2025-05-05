<?php

use App\Http\Controllers\ProfileController;
use App\Models\Category;
use App\Models\Expense;
use App\Models\Income;
use App\Models\RecurrentExpense;
use App\Models\RecurrentIncome;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name("home");

Route::get('/dashboard', function () {
    $categories = Category::all();
    $expenses = Expense::with(['category:id,name'])
        ->where('user_id', Auth::id())
        ->orderBy('date', 'desc')
        ->get();
    $incomes = Income::with(['category:id,name'])
        ->where('user_id', Auth::id())
        ->orderBy('date', 'desc')
        ->get();

    $recurrentIncomes = RecurrentIncome::with(['category:id,name'])
        ->where('user_id', Auth::id())
        ->orderBy('date', 'desc')
        ->get();

    $recurrentExpenses = RecurrentExpense::with(['category:id,name'])
        ->where('user_id', Auth::id())
        ->orderBy('date', 'desc')
        ->get();

    return Inertia::render('Dashboard', compact(
        'categories',
        'expenses',
        'incomes',
        'recurrentIncomes',
        'recurrentExpenses',
    ));
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
