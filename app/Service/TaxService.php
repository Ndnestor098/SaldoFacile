<?php

namespace App\Service;

use Illuminate\Http\Request;


class TaxService
{
    private array $irpefBrackets = [
        ['limit' => 28000, 'rate' => 0.23],
        ['limit' => 50000, 'rate' => 0.35],
        ['limit' => PHP_INT_MAX, 'rate' => 0.43],
    ];

    // Tasas regionales y comunales (ejemplo simplificado)
    private array $regionalRates = [
        'Abruzzo' => 0.02,
        'Basilicata' => 0.02,
        'Calabria' => 0.02,
        'Campania' => 0.02,
        'Emilia-Romagna' => 0.02,
        'Friuli Venezia Giulia' => 0.02,
        'Lazio' => 0.02,
        'Liguria' => 0.02,
        'Lombardia' => 0.02,
        'Marche' => 0.02,
        'Molise' => 0.02,
        'Piemonte' => 0.02,
        'Puglia' => 0.02,
        'Sardegna' => 0.02,
        'Sicilia' => 0.02,
        'Toscana' => 0.02,
        'Trentino-Alto Adige' => 0.02,
        'Umbria' => 0.02,
        "Valle d'Aosta" => 0.02,
        'Veneto' => 0.02,
    ];

    private array $communalRates = [
        'Abruzzo' => 0.008,
        'Basilicata' => 0.008,
        'Calabria' => 0.008,
        'Campania' => 0.008,
        'Emilia-Romagna' => 0.008,
        'Friuli Venezia Giulia' => 0.008,
        'Lazio' => 0.008,
        'Liguria' => 0.008,
        'Lombardia' => 0.008,
        'Marche' => 0.008,
        'Molise' => 0.008,
        'Piemonte' => 0.008,
        'Puglia' => 0.008,
        'Sardegna' => 0.008,
        'Sicilia' => 0.008,
        'Toscana' => 0.008,
        'Trentino-Alto Adige' => 0.008,
        'Umbria' => 0.008,
        "Valle d'Aosta" => 0.008,
        'Veneto' => 0.008,
    ];

    private function calculateIrpef(float $income): float
    {
        $tax = 0;
        $previousLimit = 0;

        foreach ($this->irpefBrackets as $bracket) {
            $taxable = min($income, $bracket['limit']) - $previousLimit;
            if ($taxable > 0) {
                $tax += $taxable * $bracket['rate'];
                $previousLimit = $bracket['limit'];
            } else {
                break;
            }
        }
        return $tax;
    }

    private function calculateRegionalAndCommunalTax(float $income, string $region): float
    {
        $regionalRate = $this->regionalRates[$region] ?? 0.02;  // default 2%
        $communalRate = $this->communalRates[$region] ?? 0.008; // default 0.8%

        return $income * ($regionalRate + $communalRate);
    }

    private function calculateDependentDeduction(int $dependents): float
    {
        $deductionPerDependent = 950;
        return $dependents * $deductionPerDependent;
    }

    public function calculate(Request $request): array
    {
        $request->validate([
            'worker_type' => 'required|string|in:employee,self-employed',
            'gross_income' => 'required|numeric|min:0',
            'region' => 'required|string',
            'dependents' => 'nullable|integer|min:0',
            'apply_dependent_deduction' => 'nullable|boolean',
        ]);

        $income = floatval($request->gross_income);
        $region = $request->region;
        $dependents = intval($request->dependents ?? 0);
        $workerType = $request->worker_type;
        $applyDeduction = boolval($request->apply_dependent_deduction ?? false);

        // Calcular impuestos brutos
        $irpef = $this->calculateIrpef($income);
        $regionalAndCommunalTax = $this->calculateRegionalAndCommunalTax($income, $region);

        // Calcular deducciones si el usuario lo ha indicado
        $deductions = $applyDeduction
            ? $this->calculateDependentDeduction($dependents)
            : 0;

        $taxBeforeDeductions = $irpef + $regionalAndCommunalTax;

        // Aplicar deducciones (sin permitir negativos)
        $totalTax = max($taxBeforeDeductions - $deductions, 0);

        // Añadir INPS para autónomos (25%)
        if ($workerType === 'self-employed') {
            $inps = $income * 0.25;
            $totalTax += $inps;
        }

        return [
            'gross_income'     => $income,
            'irpef'            => round($irpef, 2),
            'regional_tax'     => round($regionalAndCommunalTax, 2),
            'deductions'       => round($deductions, 2),
            'total_tax'        => round($totalTax, 2),
            'worker_type'      => $workerType,
            'dependents'       => $dependents,
            'region'           => $region,
        ];
    }
}