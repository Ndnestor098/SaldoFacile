<?php

namespace Database\Factories;

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
        return [
            'user_id' => 1,
            'amount' => $this->faker->randomFloat(2, 100, 10000),
            'category_id' => $this->faker->numberBetween(1, 10),
            'source' => $this->faker->word,
            'date' => $this->faker->date(),
            'status' => $this->faker->randomElement(['pending', 'completed']),
            'description' => $this->faker->sentence,
            'payment_method' => $this->faker->randomElement(['cash', 'bank_transfer', 'credit_card']),
            'currency' => $this->faker->randomElement(['USD', 'EUR', 'GBP']),
        ];
    }
}
