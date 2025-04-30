<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Income>
 */
class IncomeFactory extends Factory
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
            'date' => $this->faker->dateTimeBetween('2023-01-01', 'now')->format('Y-m-d H:i:s'),
            'description' => $this->faker->sentence,
            'payment_method' => $this->faker->randomElement(['cash', 'bank_transfer', 'credit_card']),
            'currency' => $this->faker->randomElement(['USD', 'EUR', 'GBP']),
        ];
    }
}
