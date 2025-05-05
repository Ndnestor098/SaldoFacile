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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['incomes', 'expenses', 'recurrent_expenses', 'recurrent_incomes']);
            $table->enum('creation', ['default', 'custom'])->default('custom');
            $table->string('text_color')->default('#000000');
            $table->string('background_color')->default('#ffffff');
            $table->unsignedBigInteger('icon_id');
            $table->foreign('icon_id')->references('id')->on('icons')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['name', 'type', 'creation']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
