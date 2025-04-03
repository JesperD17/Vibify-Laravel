<?php

use Illuminate\Support\Facades\Route;

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
Route::get('/authentication/login', function () {
    return view('/authentication/login');
})->name('login');

Route::get('/authentication/register', function () {
    return view('/authentication/register');
})->name('register');