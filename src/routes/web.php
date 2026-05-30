<?php
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\DataController;

Route::get('/', [HomeController::class, 'index']);

Route::get('/artists', [ArtistController::class, 'list']);

Route::get('/artists/create', [ArtistController::class, 'create']);
Route::post('/artists/put', [ArtistController::class, 'put']);
Route::get('/artists/update/{artist}', [ArtistController::class, 'update']);
Route::post('/artists/patch/{artist}', [ArtistController::class, 'patch']);
Route::post('/artists/delete/{artist}', [ArtistController::class, 'delete']);

// Auth routes
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/auth', [AuthController::class, 'authenticate']);
Route::get('/logout', [AuthController::class, 'logout']);

// Song routes
Route::get('/songs', [SongController::class, 'list']);
Route::get('/songs/create', [SongController::class, 'create']);
Route::post('/songs/put', [SongController::class, 'put']);
Route::get('/songs/update/{song}', [SongController::class, 'update']);
Route::post('/songs/patch/{song}', [SongController::class, 'patch']);
Route::post('/songs/delete/{song}', [SongController::class, 'delete']);

// Genre routes
Route::get('/genres', [GenreController::class, 'list']);

Route::get('/genres/create', [GenreController::class, 'create']);
Route::post('/genres/put', [GenreController::class, 'put']);
Route::get('/genres/update/{genre}', [GenreController::class, 'update']);
Route::post('/genres/patch/{genre}', [GenreController::class, 'patch']);
Route::post('/genres/delete/{genre}', [GenreController::class, 'delete']);

// Data/API
Route::get('/data/get-top-songs', [DataController::class, 'getTopSongs']);
Route::get('/data/get-song/{song}', [DataController::class, 'getSong']);
Route::get('/data/get-related-songs/{song}', [DataController::class,
'getRelatedSongs']);