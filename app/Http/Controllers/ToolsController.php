<?php

namespace App\Http\Controllers;

use App\Service\MortgageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ToolsController extends Controller
{
    public function mortgage(Request $request, MortgageService $mortgageService) {
        $required = [
            'loan_amount',
            'interest_rate',
            'loan_term',
            'down_payment',
            'property_tax', 
            'home_insurance', 
            'hoa_fees',
        ];

        if (!collect($required)->every(fn($key) => $request->filled($key))) {
            return Inertia::render('Mortgage');
        }

        $result = $mortgageService->calculate($request);

        return Inertia::render('Mortgage', $result);
    }

    public function credit(Request $request) {
        return 'Maintenance - Credit';
        return Inertia::render('Credit');
    }

    public function tax(Request $request) {
        return 'Maintenance - Tax';
        return Inertia::render('Tax');
    }
}
