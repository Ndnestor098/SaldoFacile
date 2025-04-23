<?php

namespace App\Http\Controllers\Income;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Income;
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
        $incomes = Income::where('user_id', Auth::id())->get();

        return Inertia::render('Incomes/Index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'source' => 'string|max:255',
            'description' => 'string|max:255',
            'payment_method' => 'string|max:255',
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
        //
    }
}
