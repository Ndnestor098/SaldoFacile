<?php

namespace App\Listeners;

use App\Events\SummaryUpdated;
use App\Models\Expense;
use App\Models\Income;
use App\Models\RecurrentExpense;
use App\Models\RecurrentIncome;
use App\Models\Summary;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;

class RecalculateTotalsListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SummaryUpdated $event): void
    {
        $thirtyDaysAgo = now()->subDays(30);

        // Ingresos y gastos normales en los últimos 30 días
        $totalIncome = Income::where('date', '>=', $thirtyDaysAgo)
            ->sum('amount');

        $totalExpense = Expense::where('date', '>=', $thirtyDaysAgo)
            ->sum('amount');

        // Todos los ingresos/gastos recurrentes activos
        $totalRecurrentIncome = RecurrentIncome::where('active', true)->sum('amount');
        $totalRecurrentExpense = RecurrentExpense::where('active', true)->sum('amount');

        // Balance final (ingresos normales + recurrentes) - (gastos normales + recurrentes)
        $finalTotal = ($totalIncome + $totalRecurrentIncome) - ($totalExpense + $totalRecurrentExpense);

        // Guardar en summary
        Summary::updateOrCreate(
            ['user_id' => $event->user_id],
            [
                'total_incomes' => $totalIncome + $totalRecurrentIncome,
                'total_expenses' => $totalExpense + $totalRecurrentExpense,
                'net_balance' => $finalTotal,
            ]
        );
    }
}
