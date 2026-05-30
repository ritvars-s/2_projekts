<?php

namespace App\Http\Controllers;
use App\Models\Artist;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;

class ArtistController extends Controller implements HasMiddleware
{
	
		/**
	* Get the middleware that should be assigned to the controller.
	*/
	public static function middleware(): array
	{
		return [
		'auth',
		];
	}
    // display all Authors
	public function list(): View
	{
	$items = Artist::orderBy('name', 'asc')->get();
	return view(
		'artist.list',
	[
		'title' => 'Izplidītāji',
		'items' => $items,
	]
	);
	}
	// display new Author form
	public function create(): View
	{
		return view(
			'artist.form',
			[
				'title' => 'Pievienot izpildītāju',
				'artist' => new Artist()
			]
		);
	}
	// create new Author
	public function put(Request $request): RedirectResponse
	{
		$validatedData = $request->validate([
			'name' => 'required|string|max:255',
		]);
		$artist = new Artist();
		$artist->name = $validatedData['name'];
		$artist->save();
		return redirect('/artists');
	}
	// display Artist editing form
	public function update(Artist $artist): View
	{
		return view(
			'artist.form',
		[
			'title' => 'Rediģēt izpildītāju',
			'artist' => $artist
		]
	);
	}
	// update existing Author data
	public function patch(Artist $artist, Request $request): RedirectResponse
	{
		$validatedData = $request->validate([
			'name' => 'required|string|max:255',
		]);
		$artist->name = $validatedData['name'];
		$artist->save();
		return redirect('/artists');
	}
	public function delete(Artist $artist): RedirectResponse
	{
		// šeit derētu pārbaude, kas neļauj dzēst autoru, ja tas piesaistīts eksistējošām grāmatām
		$artist->delete();
		return redirect('/artists');
	}

}
