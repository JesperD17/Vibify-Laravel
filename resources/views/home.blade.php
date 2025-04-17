@extends('standard.master')

@section('title', 'Home Page')

@section('content')
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
            <div class="song">
                <div class="playSong">
                    <i class='bx bx-play' ></i>
                    <img src="{{ asset('pics/metallic_image.jpg') }}">
                </div>
                <div class="textWrapper">
                    <div class="songTitle">Ride the lightning song</div>
                    <div class="songAuthor">Metellica</div>
                </div>
            </div>
            
            <div class="song">
                <div class="playSong">
                    <i class='bx bx-play' ></i>
                    <img src="{{ asset('pics/metallic_image.jpg') }}">
                </div>
                <div class="textWrapper">
                    <div class="songTitle">Ride the lightning song</div>
                    <div class="songAuthor">Metellica</div>
                </div>
            </div>

            <div class="song">
                <div class="playSong">
                    <i class='bx bx-play' ></i>
                    <img src="{{ asset('pics/metallic_image.jpg') }}">
                </div>
                <div class="textWrapper">
                    <div class="songTitle">Ride the lightning song</div>
                    <div class="songAuthor">Metellica</div>
                </div>
            </div>

            <div class="song">
                <div class="playSong">
                    <i class='bx bx-play' ></i>
                    <img src="{{ asset('pics/metallic_image.jpg') }}">
                </div>
                <div class="textWrapper">
                    <div class="songTitle">Ride the lightning song</div>
                    <div class="songAuthor">Metellica</div>
                </div>
            </div>
        </div>
    </div>

    <div id="RecentPlaylists">
        <div class="mainTitle">
            Your recently played playlists.
        </div>
        <div class="playLists">
            <div class="playlist">
                <a href="">
                    <img src="{{ asset('pics/Playlist-metallica.jpg') }}">
                    <div class="playlistAuthor">Metallica</div>
                </a>
            </div>
            <div class="playlist">
                <a href="">
                    <img src="{{ asset('pics/Playlist-metallica.jpg') }}">
                    <div class="playlistAuthor">Metallica</div>
                </a>
            </div>
            <div class="playlist">
                <a href="">
                    <img src="{{ asset('pics/Playlist-metallica.jpg') }}">
                    <div class="playlistAuthor">Metallica</div>
                </a>
            </div>
            <div class="playlist">
                <a href="">
                    <img src="{{ asset('pics/Playlist-metallica.jpg') }}">
                    <div class="playlistAuthor">Metallica</div>
                </a>
            </div>
            <div class="playlist">
                <a href="">
                    <img src="{{ asset('pics/Playlist-metallica.jpg') }}">
                    <div class="playlistAuthor">Metallica</div>
                </a>
            </div>
            <div class="playlist">
                <a href="">
                    <img src="{{ asset('pics/Playlist-metallica.jpg') }}">
                    <div class="playlistAuthor">Metallica</div>
                </a>
            </div>
        </div>
    </div>

    <div id="populairSongs">
        <div class="mainTitle">
            Your recently played playlists.
        </div>
        <div class="songList">
            <div class="song">
                <div class="playSong">
                    <i class='bx bx-play' ></i>
                    <img src="{{ asset('pics/metallic_image.jpg') }}">
                </div>
                <div class="textWrapper">
                    <div class="songTitle">Ride the lightning song</div>
                    <div class="songAuthor">Metellica</div>
                </div>
            </div>
            
            <div class="song">
                <div class="playSong">
                    <i class='bx bx-play' ></i>
                    <img src="{{ asset('pics/metallic_image.jpg') }}">
                </div>
                <div class="textWrapper">
                    <div class="songTitle">Ride the lightning song</div>
                    <div class="songAuthor">Metellica</div>
                </div>
            </div>

            <div class="song">
                <div class="playSong">
                    <i class='bx bx-play' ></i>
                    <img src="{{ asset('pics/metallic_image.jpg') }}">
                </div>
                <div class="textWrapper">
                    <div class="songTitle">Ride the lightning song</div>
                    <div class="songAuthor">Metellica</div>
                </div>
            </div>

            <div class="song">
                <div class="playSong">
                    <i class='bx bx-play' ></i>
                    <img src="{{ asset('pics/metallic_image.jpg') }}">
                </div>
                <div class="textWrapper">
                    <div class="songTitle">Ride the lightning song</div>
                    <div class="songAuthor">Metellica</div>
                </div>
            </div>
        </div>
    </div>
</home>
@endsection