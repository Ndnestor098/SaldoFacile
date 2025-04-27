<?php

namespace App\Http\Controllers\Expense;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Icon;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with('icon')
            ->whereIn('type', ['expenses', 'recurrent_expenses'])
            ->orderBy('name')
            ->get();
            
        $icons = Icon::all();

        return inertia('Expenses/Category', compact('categories', 'icons')); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'required|exists:icons,id',
            'text_color' => 'required|string|max:7',
            'background_color' => 'required|string|max:7',
            'type' => 'required|in:expenses,recurrent_expenses',
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

        return to_route('expenses.category');
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

        return to_route('expenses.category');
    }
}
