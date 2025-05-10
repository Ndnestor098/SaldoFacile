<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categoryId = Category::where('type', 'expenses')->inRandomOrder()->first();

        return [
            'user_id' => 1,
            'amount' => $this->faker->randomFloat(2, 100, 10000),
            'category_id' => $categoryId,
            'source' => $this->faker->word,
            'date' => $this->faker->dateTimeBetween('2023-01-01', 'now')->format('Y-m-d H:i:s'),
            'status' => $this->faker->randomElement(['pending', 'completed']),
            'description' => $this->faker->sentence,
            'payment_method' => $this->faker->randomElement(['cash', 'bank_transfer', 'credit_card']),
            'currency' => $this->faker->randomElement(['USD', 'EUR', 'GBP']),
        ];
    }
}
