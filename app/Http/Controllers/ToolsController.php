<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ToolsController extends Controller
{
    public function mortgage(Request $request) {
        if (
            $request->has('loan_amount') &&
            $request->has('interest_rate') &&
            $request->has('loan_term') &&
            $request->has('down_payment') &&
            $request->has('property_tax') &&
            $request->has('home_insurance') &&
            $request->has('hoa_fees')
        ) {
            $request->validate([
                'loan_amount' => 'required|numeric',      // Monto total del préstamo hipotecario
                'interest_rate' => 'required|numeric',    // Tasa de interés anual en porcentaje
                'loan_term' => 'required|integer',        // Plazo en años
                'down_payment' => 'required|numeric',     // Pago inicial
                'property_tax' => 'required|numeric',     // Impuesto anual en porcentaje
                'home_insurance' => 'required|numeric',   // Seguro anual en dólares
                'hoa_fees' => 'required|numeric',         // Cuotas mensuales HOA en dólares
            ]);

            $loanAmount = $request->loan_amount;
            $interestRate = $request->interest_rate;
            $loanTerm = $request->loan_term;
            $downPayment = $request->down_payment;
            $propertyTax = $request->property_tax;
            $homeInsurance = $request->home_insurance;
            $hoaFees = $request->hoa_fees;

            $principal = $loanAmount - $downPayment;
            $monthlyRate = $interestRate / 12 / 100;
            $totalPayments = $loanTerm * 12;

            // Cálculo del pago mensual (capital + interés)
            if ($monthlyRate > 0) {
                $monthlyPayment = $principal * ($monthlyRate * pow(1 + $monthlyRate, $totalPayments)) / (pow(1 + $monthlyRate, $totalPayments) - 1);
            } else {
                $monthlyPayment = $principal / $totalPayments;
            }

            // Cálculos adicionales mensuales
            $monthlyPropertyTax = ($loanAmount * ($propertyTax / 100)) / 12;
            $monthlyHomeInsurance = $homeInsurance / 12;
            $totalMonthlyCost = $monthlyPayment + $monthlyPropertyTax + $monthlyHomeInsurance + $hoaFees;

            // Generar tabla de amortización mes a mes
            $balance = $principal;
            $amortizationSchedule = [];

            for ($month = 1; $month <= $totalPayments; $month++) {
                $interestPayment = $balance * $monthlyRate;
                $principalPayment = $monthlyPayment - $interestPayment;
                $balance -= $principalPayment;

                if ($balance < 0) $balance = 0;

                $amortizationSchedule[] = [
                    'month' => $month,
                    'principal_payment' => round($principalPayment, 2),
                    'interest_payment' => round($interestPayment, 2),
                    'remaining_balance' => round($balance, 2),
                ];
            }

            return Inertia::render('Mortgage', [
                'principal_payment' => round($monthlyPayment, 2),
                'property_tax' => round($monthlyPropertyTax, 2),
                'home_insurance' => round($monthlyHomeInsurance, 2),
                'hoa_fees' => round($hoaFees, 2),
                'total_monthly_payment' => round($totalMonthlyCost, 2),
                'amortization_schedule' => $amortizationSchedule,
            ]);
        }

        return Inertia::render('Mortgage');
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
