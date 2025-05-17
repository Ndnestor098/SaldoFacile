<?php

use App\Http\Controllers\ToolsController;
use Illuminate\Support\Facades\Route;

Route::get('/mortgage', [ToolsController::class, 'mortgage'])
    ->name('mortgage');

Route::get('/credit', [ToolsController::class, 'credit'])
    ->name('credit');

Route::get('/tax', [ToolsController::class, 'tax'])
    ->name('tax');