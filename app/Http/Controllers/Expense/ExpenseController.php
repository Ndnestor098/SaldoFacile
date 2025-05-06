<?php

namespace App\Http\Controllers\Expense;

use App\Events\SummaryUpdated;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Expense;
use App\Models\RecurrentExpense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        $expenses = Expense::with(['category:id,name'])
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Expenses/Index', compact('categories', 'expenses'));
    }

    public function history(Request $request)
    {
        $categories = Category::whereIn('type', ['expenses', 'recurrent_expenses'])->get();

        $expenses = Expense::with(['category:id,name'])
            ->when($request->filled('category_id'), function ($query) use ($request) {
                $query->whereHas('category', function ($q) use ($request) {
                    $q->where('id', $request->category_id);
                });
            })
            ->when($request->active === "true", function ($query) use ($request) {
                $query->where(function($q) use ($request) {
                    if ($request->filled('amount')) {
                        $q->amount($request->amount);
                    }
                    if ($request->filled('date')) {
                        $q->date($request->date);
                    }
                });
            })
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->paginate(12)
            ->withQueryString();
        
        $recurrentExpenses = RecurrentExpense::with(['category:id,name'])
            ->when($request->filled('category_id'), function ($query) use ($request) {
                $query->whereHas('category', function ($q) use ($request) {
                    if ($request->active === "false") {
                        $q->where('id', $request->category_id);
                    }
                });
            })
            ->when($request->active === "false", function ($query) use ($request) {
                $query->where(function($q) use ($request) {
                    if ($request->filled('amount')) {
                        $q->amount($request->amount);
                    }
                    if ($request->filled('date')) {
                        $q->date($request->date);
                    }
                });
            })
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->paginate(12)
            ->withQueryString();

        $expensesAll = Expense::where('user_id', Auth::id())->get();
        $recurrentExpensesAll = RecurrentExpense::where('user_id', Auth::id())->get();

        $expensesAmount = $expensesAll->sum('amount');
        $recurrentAmount = $recurrentExpensesAll->where('active', true)->sum('amount');

        return Inertia::render('Expenses/History', compact(
            'categories',
            'expenses',
            'recurrentExpenses',
            'expensesAll', 
            'recurrentExpensesAll',
            'expensesAmount',
            'recurrentAmount',
        ));
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);
        
        Expense::create([
            'amount' => $request->amount,
            'category_id' => $request->category_id,
            'source' => $request->source,
            'description' => $request->description,
            'payment_method' => $request->payment_method,
            'user_id' => Auth::id(),
            'date' => now(),
        ]);

        session()->flash('success', [
            'title' => 'Success',
            'text' => 'Expense added successfully.',
            'icon' => 'success',
        ]);

        event(new SummaryUpdated(Auth::user()->id));

        return to_route('expenses.index');
    }
 
    public function update(Request $request, Expense $expense)
    {
        //
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();

        session()->flash('success', [
            'title' => 'Success',
            'text' => 'Expense deleted successfully.',
            'icon' => 'success',
        ]);

        event(new SummaryUpdated(Auth::user()->id));

        return back();
    }
}
