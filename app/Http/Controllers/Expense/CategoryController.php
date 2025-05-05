<?php

namespace App\Http\Controllers\Expense;

use App\Events\SummaryUpdated;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Icon;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::find(Auth::id());
        
        $categories = $user
            ->categories()
            ->with('icon')
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

        // Busca si ya existe la categoría globalmente
        $category = Category::where('name', $request->name)
            ->where('type', $request->type)
            ->first();

        if (!$category) {
            $category = Category::create([
                'name' => $request->name,
                'icon_id' => $request->icon,
                'text_color' => $request->text_color,
                'background_color' => $request->background_color,
                'type' => $request->type,
                'creation' => 'custom',
            ]);
        }

        // Asociamos al usuario solo si no está ya asociado
        $user = User::find(Auth::id());
        if (!$user->categories()->where('category_id', $category->id)->exists()) {
            $user->categories()->attach($category->id);
        }

        session()->flash('success', [
            'title' => 'Category Created',
            'text' => 'The category has been created successfully.',
            'icon' => 'success',
        ]);

        event(new SummaryUpdated(Auth::user()->id));

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
        $user = User::find(Auth::id());
        
        if (!$user->categories()->where('category_id', $category->id)->exists()) {
            abort(403, 'Unauthorized action.');
        }

        $user->categories()->detach($category->id);

        if ($category->creation === 'custom') {
            $category->delete();
        }

        session()->flash('success', [
            'title' => 'Category Deleted',
            'text' => 'The category has been deleted successfully.',
            'icon' => 'success',
        ]);

        event(new SummaryUpdated(Auth::id()));

        return to_route('expenses.category');
    }
}
