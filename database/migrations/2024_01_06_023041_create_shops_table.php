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
        Schema::create('shops', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')->constrained(
                table: 'users',
                indexName: 'shops_user_id'
            );

            $table->string("name");

            $table->string("description");

            $table->string("email");

            $table->string("facilities");

            $table->string("alamat");

            $table->string("no_telp");

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropForeign('shops_user_id');
            $table->dropSoftDeletes();
        });

        Schema::dropIfExists('shops');
    }
};
