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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained(
                table: 'users',
                indexName: 'transactions_user_id'
            );

            $table->foreignId('shop_id')->constrained(
                table: 'shops',
                indexName: 'transactions_shop_id'
            );

            // $table->foreignId('product_id')->constrained(
            //     table:'product',
            //     indexName: 'producs_transcation'
            // )

            $table->string('no_invoice')->unique();

            $table->integer('qty');

            $table->bigInteger('total');

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign('transactions_user_id');

            $table->dropForeign('transactions_shop_id');

            $table->dropSoftDeletes();
        });

        Schema::dropIfExists('transactions');
    }
};
