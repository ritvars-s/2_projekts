@extends('layout')
@section('content')
	<h1>{{ $title }}</h1>
	@if (count($items) > 0)
		<table class="table table-striped table-hover table-sm">
			<thead class="thead-light">
				<tr>
					<th>ID</td>
					<th>Vārds</td>
					<th>&nbsp;</td>
				</tr>
			</thead>
		<tbody>
		@foreach($items as $artist)
		<tr>
			<td>{{ $artist->id }}</td>
			<td>{{ $artist->name }}</td>
			<td>
				<a href="/artists/update/{{ $artist->id }}" class="btn btn-outline-primary btn-sm">Labot</a>
				<form action="/artists/delete/{{ $artist->id }}" method="post" class="deletion-form d-inline">
				@csrf
				<button type="submit" class="btn btn-outline-danger btn-sm">Dzēst</button>
				</form>
			</td>
		</tr>
		@endforeach
		</tbody>
		</table>
	@else
		<p>Nav atrasts neviens ieraksts</p>
	@endif
	<a href="/artists/create" class="btn btn-primary">Izveidot jaunu</a>
@endsection