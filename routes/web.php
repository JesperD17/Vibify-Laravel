<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\auth\RegisteredUserController;
// use App\Http\Controllers\auth\AuthenticatedSessionController;    

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

Route::get('/auth/profile', function () {
    return view('auth.profile');
})->middleware('auth')->name('profile');

// auth
Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/register', function () {
    return view('auth.register');
})->name('register');

Route::get('/auth/dashboard', function () {
    return view('auth.dashboard');
})->name('dashboard');

Route::post('/auth/register', [RegisteredUserController::class, 'store'])->name('register');

require __DIR__.'/auth.php';