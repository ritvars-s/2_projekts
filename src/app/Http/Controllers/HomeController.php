<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
	public function index(): \Illuminate\View\View {
		return view(
		'public',
		[
		'title' => '2. Praktiskais darbs',
			]
		);
	}
}
