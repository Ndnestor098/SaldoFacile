<?php

namespace App\Http\Controllers;

use App\Service\CreditService;
use App\Service\MortgageService;
use App\Service\TaxService;
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

    public function credit(Request $request, CreditService $creditService) {
        $required = [
            'loan_amount',
            'interest_rate',
            'loan_term',
        ];

        if (!collect($required)->every(fn($key) => $request->filled($key))) {
            return Inertia::render('Credit');
        }

        $result = $creditService->calculate($request);

        return Inertia::render('Credit', $result);
    }

    public function tax(Request $request, TaxService $texService) {
        $required = [
            'worker_type',
            'gross_income',
            'region',
        ];

        if (!collect($required)->every(fn($key) => $request->filled($key))) {
            return Inertia::render('Tax');
        }

        $result = $texService->calculate($request);

        return Inertia::render('Tax', $result);
    }
}
