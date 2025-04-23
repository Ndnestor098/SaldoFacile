<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recurrent_incomes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('category_id');
            $table->decimal('amount', 10, 2);
            $table->string('description')->nullable();
            $table->enum('frequency', ['daily', 'weekly', 'monthly', 'yearly']);
            $table->string('payment_method')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recurrent_incomes');
    }
};
