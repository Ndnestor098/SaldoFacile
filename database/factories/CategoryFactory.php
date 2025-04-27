<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $array = [
            'income' => [
                'Salary',
                'Freelance Work',
                'Bonuses',
                'Investments',
                'Gifts',
                'Refunds',
                'Prizes / Lottery',
                'Rentals',
                'Business Income',
                'Dividends',
                'Interest Earned',
                'Other Income',
            ], 
            'expense' => [
                'Rent',
                'Mortgage',
                'Food / Groceries',
                'Utilities (Electricity, Water, Gas)',
                'Transportation (Fuel, Public Transport)',
                'Entertainment (Movies, Events)',
                'Travel',
                'Subscriptions (Netflix, Spotify)',
                'Clothing and Accessories',
                'Healthcare (Medicine, Doctor)',
                'Education (Courses, Tuition)',
                'Donations',
                'Taxes',
                'Insurance (Car, Home, Life)',
                'Childcare',
                'House Maintenance',
                'Pet Expenses',
                'Debt Payments',
                'Savings Contribution',
                'Other Expenses',
            ],
            'recurrent_expense' => [
                'Rent',
                'Mortgage',
                'Utilities (Electricity, Water, Gas)',
                'Subscriptions (Netflix, Spotify)',
                'Insurance (Car, Health, Life)',
                'Debt Payments',
                'Savings Plan',
                'Memberships (Gym, Clubs)',
                'Phone Service',
                'Internet Service',
                'Childcare',
            ],
            'recurrent_income' => [
                'Salary',
                'Rentals',
                'Freelance Contracts',
                'Bonuses',
                'Investment Returns',
                'Business Profits',
                'Pension',
                'Social Security',
            ],
        ];
        
    
        // Primero elegimos el tipo
        $type = $this->faker->randomElement([
            'income', 
            'expense', 
            'recurrent_expense', 
            'recurrent_income'
        ]);
    
        // Ahora elegimos un nombre aleatorio basado en el tipo
        $name = $this->faker->randomElement($array[$type]);
    
        return [
            'name' => $name,
            'type' => $type,
        ];
    }
}
