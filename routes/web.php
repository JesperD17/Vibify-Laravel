<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\DeleteUserController;
use App\Http\Controllers\Auth\UpdateAvatarController;
use App\Http\Controllers\LimitGuestSearchController;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/saved', function () {
    return view('saved');
})->name('saved');

Route::get('/search', function () {
    return view('search');
})->name('search');

Route::get('/newPlaylist', function () {
    return view('newPlaylist');
})->name('newPlaylist');

Route::get('/standard/notLoggedIn', function () {
    return view('standard.notLoggedIn');
})->name('notLoggedIn');

// auth
Route::get('/auth/profile', function () {
    return view('auth.profile');
})->middleware('auth')->name('profile');

Route::get('/auth/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/auth/register', function () {
    return view('auth.register');
})->name('register');

// controllers
Route::post('/auth/register', [RegisteredUserController::class, 'store'])
    ->name('register');

Route::post('/auth/login', [AuthenticatedSessionController::class, 'store'])
    ->name('login');

Route::delete('/deleteUser', [DeleteUserController::class, 'destroy'])
    ->middleware('auth')
    ->name('deleteUser');

Route::post('/updateAvatar', [UpdateAvatarController::class, 'update_avatar'])
    ->middleware('auth')
    ->name('updateAvatar');

Route::get('/guestLimit', [LimitGuestSearchController::class, 'count']);

require __DIR__ . '/auth.php';
