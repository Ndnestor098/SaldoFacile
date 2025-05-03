<?php

namespace Database\Seeders;

use App\Events\SummaryUpdated;
use App\Models\Expense;
use App\Models\Income;
use App\Models\RecurrentExpense;
use App\Models\RecurrentIncome;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => bcrypt('test'),
        ]);

        $this->call([
            IconSeeder::class,
            CategorySeeder::class,
        ]);

        Income::factory(30)->create();
        Expense::factory(30)->create();
        RecurrentIncome::factory(30)->create();
        RecurrentExpense::factory(30)->create();

        event(new SummaryUpdated($user->id));
    }
}
