<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artist;
use App\Models\Song;
use App\Models\Genre;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use App\Http\Requests\SongRequest;

class SongController extends Controller implements HasMiddleware
{
// call auth middleware
	public static function middleware(): array
	{
		return [
			'auth',
		];
	}
	// display all Songs
	public function list(): View
	{
		$items = Song::orderBy('name', 'asc')->get();
		return view(
			'song.list',
			[
				'title' => 'Dziesmas',
				'items' => $items
			]
		);
	}
	// display new Song form
	public function create(): View
	{
		$artists = Artist::orderBy('name', 'asc')->get();
		$genres = Genre::orderBy('name')->get();
		return view(
			'song.form',
			[
				'title' => 'Pievienot dziesmu',
				'song' => new Song(),
				'artists' => $artists,
				'genres' => $genres,
			]
		);
	}
	
	// validate and save Song data
	private function saveSongData(Song $song, SongRequest $request): void
	{
		$validatedData = $request->validated();
		$song->fill($validatedData);
		$song->display = (bool) ($validatedData['display'] ?? false);
		if ($request->hasFile('image')) {
		// šeit varat pievienot kodu, kas nodzēš veco bildi, ja pievieno jaunu
			$uploadedFile = $request->file('image');
			$extension = $uploadedFile->clientExtension();
			$name = uniqid();
			$song->image = $uploadedFile->storePubliclyAs(
				'/',
				$name . '.' . $extension,
				'uploads'
			);
		}
		$song->save();
	}
	// create new Song entry
	public function put(SongRequest $request): RedirectResponse
	{
		$song = new Song();
		$this->saveSongData($song, $request);
		return redirect('/songs');
	}
	// update Song data
	public function patch(Song $song, SongRequest $request): RedirectResponse
	{
		$this->saveSongData($song, $request);
		return redirect('/songs/update/' . $song->id);
	}
	
	// display Song edit form
	public function update(Song $song): View
	{
		$artists = Artist::orderBy('name', 'asc')->get();
		$genres = Genre::orderBy('name', 'asc')->get();
		
		return view(
			'song.form',
		[
			'title' => 'Rediģēt dziesmu',
			'song' => $song,
			'artists' => $artists,
			'genres' => $genres,
		]
		);
	}
	
		// delete Song
	public function delete(Song $song): RedirectResponse
	{
		if ($song->image) {
			unlink(getcwd() . '/images/' . $song->image);
		}
		$song->delete();
		return redirect('/songs');
	}
}