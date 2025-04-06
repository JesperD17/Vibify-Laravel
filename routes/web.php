<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\auth\RegisteredUserController;

Route::get('/', function () { return view('home'); })->name('home');

Route::get('/saved', function () {
    return view('saved');
})->name('saved');

Route::get('/search', function () {
    return view('search');
})->name('search');

Route::get('/newPlaylist', function () {
    return view('newPlaylist');
})->name('newPlaylist');

Route::get('/profile', function () {
    return view('profile');
})->name('profile');

// auth
Route::get('/auth/login', function () {
    return view('/auth/login');
})->name('login');

// Route::get('/authentication/register', function () {
//     return view('/authentication/register');
// })->name('register');

Route::get('/auth/register', [RegisteredUserController::class, 'store'])->name('register');