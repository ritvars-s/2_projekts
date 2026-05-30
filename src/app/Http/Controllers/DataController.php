<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Song;
use Illuminate\Http\JsonResponse;

class DataController extends Controller
{
		public function getTopSongs(): JsonResponse
		{
			$songs = Song::where('display', true)
				->inRandomOrder()
				->take(3)
				->get();
			return response()->json($songs);
		}
		// Return selected Song if it's published
		public function getSong(Song $song): JsonResponse
		{
			$selectedSong = Song::where([
				'id' => $song->id,
				'display' => true,
			])
			->firstOrFail();
			return response()->json($selectedSong);
		}
		// Return 3 published Songs in random order- except the selected Song
		public function getRelatedSongs(Song $song): JsonResponse
		{
			$songs = Song::where('display', true)
				->where('id', '<>', $song->id)
				->inRandomOrder()
				->take(3)
				->get();
			return response()->json($songs);
		}
}
