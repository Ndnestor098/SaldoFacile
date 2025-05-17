<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ToolsController extends Controller
{
    public function mortgage(Request $request) {
        
        return Inertia::render('Mortgage');
    }

    public function credit(Request $request) {
        return 'Hola - Credit';
        return Inertia::render('Credit');
    }

    public function tax(Request $request) {
        return 'Hola - Tax';
        return Inertia::render('Tax');
    }
}
