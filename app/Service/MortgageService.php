<?php

namespace App\Service;
use Illuminate\Http\Request;

class MortgageService {

    /**
     * Calcula el pago mensual de una hipoteca y su tabla de amortización.
     *
     * @param Request $request
     * @return array
     */
    public function calculate(Request $request) {
        $request->validate([
            'loan_amount' => 'required|numeric|min:1',      // Monto total del préstamo hipotecario
            'interest_rate' => 'required|numeric|min:0',    // Tasa de interés anual en porcentaje
            'loan_term' => 'required|integer|min:1',        // Plazo en años
            'down_payment' => 'required|numeric|min:0',     // Pago inicial
            'property_tax' => 'required|numeric|min:0',     // Impuesto anual en porcentaje
            'home_insurance' => 'required|numeric|min:0',   // Seguro anual en dólares
            'hoa_fees' => 'required|numeric|min:0',         // Cuotas mensuales HOA en dólares
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

        return [
            'principal_payment' => round($monthlyPayment, 2),
            'property_tax' => round($monthlyPropertyTax, 2),
            'home_insurance' => round($monthlyHomeInsurance, 2),
            'hoa_fees' => round($hoaFees, 2),
            'total_monthly_payment' => round($totalMonthlyCost, 2),
            'amortization_schedule' => $amortizationSchedule,
        ];
    }
}