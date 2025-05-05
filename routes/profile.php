<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Profile/Edit');
})->name('index');

Route::get('/edit', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255'
    ]);

    User::updateOrCreate(
        ['id' => Auth::id()],
        ['name' => $request->name]
    );

    return to_route('profile.index');
})->name('edit');