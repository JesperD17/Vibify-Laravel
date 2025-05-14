@extends('standard.master')

@section('title', 'Home Page')

@section('content')

@vite('resources/js/homePageFeed.js')
@vite('resources/css/home.css')
<home>
    <div id="welcomeSection">
        <div class="mainTitle">
            @if (Route::has('login'))
                @auth
                Welcome {{ auth()->user()->name }}!
                @endauth
            @endif
        </div>
        <div class="songList">
            
        </div>
    </div>

    @auth
    <div id="RecentPlaylists">
        <div class="mainTitle">
            Your recently played playlists.
        </div>
        <div class="playLists">
            
        </div>
    </div>
    @endauth

    <div id="homeFeed"></div>

    <div class="loaderWrapper">
        <span class="loader"></span>
    </div>
</home>
@endsection