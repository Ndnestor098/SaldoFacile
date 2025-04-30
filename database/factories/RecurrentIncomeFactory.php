<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RecurrentIncome>
 */
class RecurrentIncomeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isActive = $this->faker->randomElement([true, false]);
        $frequency = $this->faker->randomElement(['daily', 'weekly', 'monthly', 'yearly']);

        // Determinar payment_date según la frecuencia
        switch ($frequency) {
            case 'weekly':
                $paymentDate = $this->faker->dayOfWeek(); // e.g. 'Monday'
                break;
            case 'monthly':
                $paymentDate = $this->faker->numberBetween(1, 28); // Evita días inválidos como 31
                break;
            case 'yearly':
                $paymentDate = $this->faker->date('m-d'); // e.g. '07-15' (mes-día)
                break;
            default: // daily
                $paymentDate = null;
                break;
        }

        return [
            'user_id' => 1,
            'amount' => $this->faker->randomFloat(2, 100, 10000),
            'category_id' => $this->faker->numberBetween(1, 10),
            'source' => $this->faker->word,
            'date' => $this->faker->dateTimeBetween('2023-01-01', 'now')->format('Y-m-d H:i:s'),
            'description' => $this->faker->sentence,
            'payment_method' => $this->faker->randomElement(['cash', 'bank_transfer', 'credit_card']),
            'frequency' => $frequency,
            'payment_date' => $isActive ? $paymentDate : 'Finished', 
            'end_date' => $isActive ? $this->faker->dateTimeBetween('tomorrow', '+2 years')->format('Y-m-d') : 'Finished',
            'active' => $isActive,
        ];
    }
}
