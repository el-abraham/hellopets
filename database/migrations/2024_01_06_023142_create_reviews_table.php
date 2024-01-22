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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();

            $table->foreignId('shop_id')->constrained(
                table: 'shops',
                indexName: 'reviews_shop_id'
            );

            $table->foreignId('user_id')->constrained(
                table: 'users',
                indexName: 'reviews_user_id'
            );

            $table->foreignId('transaction_id')->constrained(
                table: 'transactions',
                indexName: 'reviews_transaction_id'
            );

            $table->string('description');

            $table->integer('rating');

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropForeign('reviews_shop_id');
            $table->dropForeign('reviews_user_id');
            $table->dropForeign('reviews_transaction_id');
            $table->dropSoftDeletes();
        });

        Schema::dropIfExists('reviews');
    }
};
