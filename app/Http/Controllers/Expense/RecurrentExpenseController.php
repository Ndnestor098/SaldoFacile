<?php

namespace App\Http\Controllers\Expense;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\RecurrentExpense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecurrentExpenseController extends Controller
{
    
    public function index()
    {
        $categories = Category::all();
        $expenses = RecurrentExpense::with(['category:id,name'])
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Expenses/Recurring', compact('categories', 'expenses'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'frequency' => 'required|in:daily,weekly,monthly,yearly',
            'end_date' => 'required|date|after:today',
            'payment_date'  => [
                'nullable',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->frequency !== 'daily' && empty($value)) {
                        $fail('The payment date is required for weekly, monthly, or yearly frequencies.');
                    }

                    if ($request->frequency === 'weekly') {
                        $validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                        if (!in_array(strtolower($value), $validDays)) {
                            $fail('The payment date must be a valid day of the week.');
                        }
                    }

                    if ($request->frequency === 'monthly') {
                        if (!is_numeric($value) || $value < 1 || $value > 31) {
                            $fail('The payment date must be a number between 1 and 31.');
                        }
                    }

                    if ($request->frequency === 'yearly') {
                        $validMonths = [
                            'january', 'february', 'march', 'april', 'may', 'june',
                            'july', 'august', 'september', 'october', 'november', 'december'
                        ];
                        if (!in_array(strtolower($value), $validMonths)) {
                            $fail('The payment date must be a valid month.');
                        }
                    }
                }
            ],
        ]);
        
        RecurrentExpense::create([
            'amount' => $request->amount,
            'category_id' => $request->category_id,
            'source' => $request->source,
            'description' => $request->description,
            'payment_method' => $request->payment_method,
            'user_id' => Auth::id(),
            'frequency' => $request->frequency,
            'end_date' => $request->end_date,
            'payment_date' => $request->payment_date,
            'date' => now(),
        ]);

        session()->flash('success', [
            'title' => 'Success',
            'text' => 'Recurrent Expense added successfully.',
            'icon' => 'success',
        ]);

        return to_route('expenses.recurring');
    }

    /**
     * Display the specified resource.
     */
    public function show(RecurrentExpense $recurrentExpense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RecurrentExpense $recurrentExpense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RecurrentExpense $recurrentExpense)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RecurrentExpense $recurrentExpense)
    {
        $recurrentExpense->delete();
        
        session()->flash('success', [
            'title' => 'Success',
            'text' => 'Recurrent Expense deleted successfully.',
            'icon' => 'success',
        ]);

        return back();
    }
}
