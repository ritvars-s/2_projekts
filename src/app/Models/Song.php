<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Song extends Model
{
	protected $fillable = [
		'name',
		'artist_id',
		'genre_id',
		'description',
		'year',
		];
    public function artist(): BelongsTo
	{
		return $this->belongsTo(Artist::class);
	}
	public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
	
	public function jsonSerialize(): mixed
	{
		return [
			'id' => intval($this->id),
			'name' => $this->name,
			'description' => $this->description,
			'artist' => $this->artist->name,
			'genre' => ($this->genre ? $this->genre->name : ''),
			'year' => intval($this->year),
			'image' => asset('images/' . $this->image),
		];
	}
}
