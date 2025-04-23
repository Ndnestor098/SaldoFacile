<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Incomes/Index');
})->name('index');

Route::get('/history', function () {
    return Inertia::render('Dashboard');
})->name('history');

Route::get('/categories', function () {
    return Inertia::render('Dashboard');
})->name('categories');