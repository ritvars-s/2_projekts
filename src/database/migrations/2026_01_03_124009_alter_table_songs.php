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
		Schema::table('songs', function (Blueprint $table) {
			$table->foreign('artist_id')->references('id')->on('artists');
		});
	}
	public function down(): void
	{
		Schema::table('songs', function (Blueprint $table) {
			$table->dropForeign('songs_artist_id_foreign');
		});
	}
};
