<?php

namespace App\Http\Controllers\Income;

use App\Events\SummaryUpdated;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Icon;
use App\Models\Summary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with('icon')
            ->whereIn('type', ['incomes', 'recurrent_incomes'])
            ->orderBy('name')
            ->get();
            
        $icons = Icon::all();

        return inertia('Incomes/Category', compact('categories', 'icons')); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'required|exists:icons,id',
            'text_color' => 'required|string|max:7',
            'background_color' => 'required|string|max:7',
            'type' => 'required|in:incomes,recurrent_incomes',
        ]);

        Category::create([
            'name' => $request->name,
            'icon_id' => $request->icon,
            'text_color' => $request->text_color,
            'background_color' => $request->background_color,
            'type' => $request->type,
        ]);

        session()->flash('success', [
            'title' => 'Category Created',
            'text' => 'The category has been created successfully.',
            'icon' => 'success',
        ]);

        event(new SummaryUpdated(Auth::user()->id));

        return to_route('incomes.category');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        
        session()->flash('success', [
            'title' => 'Category Deleted',
            'text' => 'The category has been deleted successfully.',
            'icon' => 'success',
        ]);

        event(new SummaryUpdated(Auth::user()->id));

        return to_route('incomes.category');
    }
}
