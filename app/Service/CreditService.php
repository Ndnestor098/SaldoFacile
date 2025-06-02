<?php

namespace App\Service;
use Illuminate\Http\Request;

class CreditService
{
    public function calculate(Request $request)
    {
        $data = $request->validate([
            'loan_amount' => 'required|numeric|min:1',
            'interest_rate' => 'required|numeric|min:0',
            'loan_term' => 'required|integer|min:1',
            'down_payment' => 'nullable|numeric|min:0',
        ]);

        $loanAmount = $request->loan_amount - ($request->down_payment ?? 0);
        $annualInterestRate = $request->interest_rate / 100;
        $monthlyInterestRate = $annualInterestRate / 12;
        $months = $request->loan_term * 12;

        // Fórmula de pago mensual
        $monthlyPayment = $loanAmount * ($monthlyInterestRate * pow(1 + $monthlyInterestRate, $months)) / (pow(1 + $monthlyInterestRate, $months) - 1);
        $monthlyPayment = round($monthlyPayment, 2);

        $schedule = [];
        $balance = $loanAmount;

        for ($i = 1; $i <= $months; $i++) {
            $interestPayment = round($balance * $monthlyInterestRate, 2);
            $principalPayment = round($monthlyPayment - $interestPayment, 2);
            $total = round($interestPayment + $principalPayment, 2);
            $balance = round($balance - $principalPayment, 2);

            $schedule[] = [
                'year' => (int) ceil($i / 12),
                'month' => date('F', mktime(0, 0, 0, ($i - 1) % 12 + 1, 10)),
                'interest_payment' => $interestPayment,
                'principal_payment' => $principalPayment,
                'total' => $total,
                'remaining_balance' => max($balance, 0),
            ];
        }

        return [
            'loan_amount' => $request->loan_amount,
            'down_payment' => $request->down_payment ?? 0,
            'interest_rate' => $request->interest_rate,
            'loan_term' => $request->loan_term,
            'monthly_payment' => $monthlyPayment,
            'total_payment' => round($monthlyPayment * $months, 2),
            'schedule' => $schedule,
        ];
    }
}