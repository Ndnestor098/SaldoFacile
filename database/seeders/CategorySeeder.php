<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Icon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoriesByType = [
            'incomes' => [
                ['Salary', 'hand-coins', '#15803d', '#bbf7d0'],
                ['Freelance Work', 'briefcase', '#1d4ed8', '#dbeafe'],
                ['Bonuses', 'wallet-cards', '#6d28d9', '#ddd6fe'],
                ['Investments', 'chart-column', '#4f46e5', '#e0e7ff'],
                ['Gifts', 'gift', '#db2777', '#fce7f3'],
                ['Refunds', 'package-x', '#0d9488', '#ccfbf1'],
                ['Prizes / Lottery', 'captions', '#ca8a04', '#fef9c3'],
                ['Rentals', 'warehouse', '#ea580c', '#ffedd5'],
                ['Business Income', 'handshake', '#06b6d4', '#cffafe'],
                ['Dividends', 'banknote-arrow-up', '#059669', '#d1fae5'],
                ['Interest Earned', 'book-check', '#65a30d', '#ecfccb'],
                ['Other Income', 'align-left', '#374151', '#e5e7eb'],
            ],
            'expenses' => [
                ['Rent', 'house', '#dc2626', '#fecaca'],
                ['Mortgage', 'house', '#dc2626', '#fecaca'],
                ['Food / Groceries', 'beef', '#16a34a', '#bbf7d0'],
                ['Utilities (Electricity, Water, Gas)', 'utility-pole', '#ca8a04', '#fef9c3'],
                ['Transportation (Fuel, Public Transport)', 'bus', '#2563eb', '#dbeafe'],
                ['Entertainment (Movies, Events)', 'clapperboard', '#db2777', '#fce7f3'],
                ['Travel', 'baggage-claim', '#6366f1', '#e0e7ff'],
                ['Subscriptions (Netflix, Spotify)', 'user-check', '#9333ea', '#f3e8ff'],
                ['Clothing and Accessories', 'shirt', '#d97706', '#fef3c7'],
                ['Healthcare (Medicine, Doctor)', 'cross', '#e11d48', '#fee2e2'],
                ['Education (Courses, Tuition)', 'school', '#2563eb', '#dbeafe'],
                ['Donations', 'accessibility', '#10b981', '#d1fae5'],
                ['Taxes', 'banknote-arrow-down', '#b91c1c', '#fecaca'],
                ['Insurance (Car, Home, Life)', 'shield-plus', '#0ea5e9', '#bae6fd'],
                ['Childcare', 'shapes', '#facc15', '#fef9c3'],
                ['House Maintenance', 'armchair', '#6b7280', '#e5e7eb'],
                ['Pet Expenses', 'dog', '#7c3aed', '#ede9fe'],
                ['Debt Payments', 'banknote-arrow-down', '#b91c1c', '#fecaca'],
                ['Savings Contribution', 'life-buoy', '#10b981', '#d1fae5'],
                ['Other Expenses', 'align-left', '#374151', '#e5e7eb'],
            ],
            'recurrent_expenses' => [
                ['Rent', 'house', '#dc2626', '#fecaca'],
                ['Mortgage', 'house', '#dc2626', '#fecaca'],
                ['Utilities (Electricity, Water, Gas)', 'utility-pole', '#ca8a04', '#fef9c3'],
                ['Subscriptions (Netflix, Spotify)', 'user-check', '#9333ea', '#f3e8ff'],
                ['Insurance (Car, Health, Life)', 'shield-plus', '#0ea5e9', '#bae6fd'],
                ['Debt Payments', 'banknote-arrow-down', '#b91c1c', '#fecaca'],
                ['Savings Plan', 'life-buoy', '#10b981', '#d1fae5'],
                ['Memberships (Gym, Clubs)', 'dumbbell', '#f59e0b', '#fef3c7'],
                ['Phone Service', 'smartphone', '#0ea5e9', '#bae6fd'],
                ['Internet Service', 'wifi', '#06b6d4', '#cffafe'],
                ['Childcare', 'shapes', '#facc15', '#fef9c3'],
            ],
            'recurrent_incomes' => [
                ['Salary', 'hand-coins', '#15803d', '#bbf7d0'],
                ['Rentals', 'warehouse', '#ea580c', '#ffedd5'],
                ['Freelance Contracts', 'briefcase', '#1d4ed8', '#dbeafe'],
                ['Bonuses', 'wallet-cards', '#6d28d9', '#ddd6fe'],
                ['Investment Returns', 'chart-column', '#4f46e5', '#e0e7ff'],
                ['Business Profits', 'handshake', '#06b6d4', '#cffafe'],
                ['Pension', 'badge-dollar-sign', '#22c55e', '#bbf7d0'],
                ['Social Security', 'earth-lock', '#0284c7', '#bae6fd'],
            ],
        ];
        

        foreach ($categoriesByType as $type => $categories) {
            foreach ($categories as $name) {
                Category::firstOrCreate([
                    'name' => $name[0],
                    'icon_id' => Icon::where('name', $name[1])->first()->id,
                    'type' => $type,
                    'text_color' => $name[2],
                    'background_color' => $name[3],
                ]);
            }
        }
    }
}
