@extends('standard.master')

@section('title', 'Home Page')

@section('content')
<home>
    @vite('resources/css/home.css')

    <div class="welcomeSection">
        <div class="mainTitle">
            Welcome {user}!
        </div>
        <div class="song">
            <img src="{{ asset('pics/metallic_image.jpg') }}">
            <div class="textWrapper">
                <div class="songTitle">Ride the lightning song</div>
                <div class="playSong"><i class='bx bx-play' ></i></div>
            </div>
        </div>
    </div>

    <div class="mainTitle">
        Your recent played lists / numbers.
    </div>

    @if (Route::has('login'))
    <div class="h-14.5 hidden lg:block">ssss</div>
    @endif
</home>
@endsection