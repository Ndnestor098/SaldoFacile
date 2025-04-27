<?php

namespace App\Http\Controllers\Income;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Income;
use App\Models\RecurrentIncome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        $incomes = Income::with(['category:id,name'])
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Incomes/Index', compact('categories', 'incomes'));
    }

    public function history(Request $request)
    {
        $categories = Category::whereIn('type', ['incomes', 'recurrent_incomes'])->get();
        
        $incomes = Income::with(['category:id,name'])
            ->when($request->filled('category_id'), function ($query) use ($request) {
                $query->whereHas('category', function ($q) use ($request) {
                    $q->where('id', $request->category_id);
                });
            })
            ->amount($request->amount)
            ->date($request->date)
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();
        
        $recurrentIncomes = RecurrentIncome::with(['category:id,name'])
            ->when($request->filled('category_id'), function ($query) use ($request) {
                $query->whereHas('category', function ($q) use ($request) {
                    $q->where('id', $request->category_id);
                });
            })
            ->amount($request->amount)
            ->date($request->date)
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Incomes/History', compact('categories', 'incomes', 'recurrentIncomes'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);
        
        Income::create([
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
            'text' => 'Income added successfully.',
            'icon' => 'success',
        ]);

        return to_route('incomes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Income $incomes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Income $incomes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Income $incomes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Income $incomes)
    {
        $incomes->delete();

        session()->flash('success', [
            'title' => 'Success',
            'text' => 'Income deleted successfully.',
            'icon' => 'success',
        ]);
        
        return back();
    }
}
