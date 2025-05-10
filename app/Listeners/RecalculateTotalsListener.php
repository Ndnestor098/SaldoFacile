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

    protected function formatPaymentDate($item) {
        switch ($item->frequency) {
            case 'daily':
                return now()->format('m-d');
            case 'weekly':
                return ucfirst($item->payment_date); // Capitaliza: monday → Monday
            case 'monthly':
                return str_pad($item->payment_date, 2, '0', STR_PAD_LEFT);
            case 'yearly':
                return $item->payment_date; // ya está en formato mm-dd
            default:
                return 'N/A';
        }
    }

    protected function dataSaveIncome ($data, $id) {
        foreach ($data as $item) {
            $formattedDate = $this->formatPaymentDate($item);

            Income::create([
                'amount' => $item->amount,
                'category_id' => $item->category_id,
                'source' => $item->source,
                'description' => 'Automated income with the indicated date: ' . $formattedDate,
                'payment_method' => $item->payment_method,
                'user_id' => $id,
                'date' => now(),
                'is_automated' => true
            ]);
            $item->touch();
        }
    }

    protected function dataSaveExpense($data, $id) {
        foreach ($data as $item) {
            $formattedDate = $this->formatPaymentDate($item);

            Expense::create([
                'amount' => $item->amount,
                'category_id' => $item->category_id,
                'description' => 'Automated expenses with the indicated date: ' . $formattedDate,
                'payment_method' => $item->payment_method,
                'user_id' => $id,
                'date' => now(),
                'is_automated' => true
            ]);
            $item->touch();
        }
    }

    public function handle(SummaryUpdated $event): void
    {
        $thirtyDaysAgo = now()->subDays(30);

        // =========================== Incomes =========================== 
        $recurrentIncomeDaily = RecurrentIncome::where('frequency', 'daily')
            ->where('active', true)
            ->where('user_id', $event->user_id)
            ->whereDate('updated_at', '!=', today())
            ->get();

        $recurrentIncomeWeekly = RecurrentIncome::where('frequency', 'weekly')
            ->where('active', true)
            ->where('user_id', $event->user_id)
            ->where('payment_date', strtolower(today()->englishDayOfWeek))
            ->where('updated_at', '<', now()->startOfDay())
            ->get();
            
        $recurrentIncomeMonthly = RecurrentIncome::where('frequency', 'monthly')
            ->where('active', true)
            ->where('user_id', $event->user_id)
            ->where('payment_date', today()->day)
            ->whereDate('updated_at', '!=', today())
            ->get();

        $recurrentIncomeYearly = RecurrentIncome::where('frequency', 'yearly')
            ->where('active', true)
            ->where('user_id', $event->user_id)
            ->where('payment_date', today()->format('m-d'))
            ->whereDate('updated_at', '!=', today())
            ->get();
        
        $this->dataSaveIncome($recurrentIncomeDaily, $event->user_id);
        $this->dataSaveIncome($recurrentIncomeWeekly, $event->user_id);
        $this->dataSaveIncome($recurrentIncomeMonthly, $event->user_id);    
        $this->dataSaveIncome($recurrentIncomeYearly, $event->user_id);

        // =========================== Expenses =========================== 
        $recurrentExpenseDaily = RecurrentExpense::where('frequency', 'daily')
            ->where('active', true)
            ->where('user_id', $event->user_id)
            ->whereDate('updated_at', '!=', today())
            ->get();

        $recurrentExpenseWeekly = RecurrentExpense::where('frequency', 'weekly')
            ->where('active', true)
            ->where('user_id', $event->user_id)
            ->where('payment_date', today()->englishDayOfWeek)
            ->whereDate('updated_at', '!=', today())
            ->get();
            
        $recurrentExpenseMonthly = RecurrentExpense::where('frequency', 'monthly')
            ->where('active', true)
            ->where('user_id', $event->user_id)
            ->where('payment_date', today()->day)
            ->whereDate('updated_at', '!=', today())
            ->get();

        $recurrentExpenseYearly = RecurrentExpense::where('frequency', 'yearly')
            ->where('active', true)
            ->where('user_id', $event->user_id)
            ->where('payment_date', today()->format('m-d'))
            ->whereDate('updated_at', '!=', today())
            ->get();
        
        $this->dataSaveExpense($recurrentExpenseDaily, $event->user_id);
        $this->dataSaveExpense($recurrentExpenseWeekly, $event->user_id);
        $this->dataSaveExpense($recurrentExpenseMonthly, $event->user_id);
        $this->dataSaveExpense($recurrentExpenseYearly, $event->user_id);

        $totalIncome = Income::where('date', '>=', $thirtyDaysAgo)
            ->where('user_id', $event->user_id)
            ->sum('amount');
        $totalExpense = Expense::where('date', '>=', $thirtyDaysAgo)
            ->where('user_id', $event->user_id)
            ->sum('amount');

        // Balance final (ingresos normales + recurrentes) - (gastos normales + recurrentes)
        $finalTotal = $totalIncome - $totalExpense;

        // Guardar en summary
        Summary::updateOrCreate(
            ['user_id' => $event->user_id],
            [
                'user_id' => $event->user_id,
                'total_incomes' => $totalIncome ?: 0,
                'total_expenses' => $totalExpense ?: 0,
                'net_balance' => $finalTotal ?: 0,
            ]
        );
    }
}
