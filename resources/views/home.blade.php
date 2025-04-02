@extends('standard.master')

@section('title', 'Home Page')

@section('content')
@vite('resources/css/home.css')
<home>

    <div class="welcomeSection">
        <div class="mainTitle">
            Welcome {user}!
        </div>
        <div class="top10played">
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

    <div class="playlists">
        <div class="mainTitle">
            Your recently played playlists.
        </div>
        <div class="top10RecentPlaylist">
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

    <div class="populairSongs">
        <div class="mainTitle">
            Your recently played playlists.
        </div>
        <div class="top10played">
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

    @if (Route::has('login'))
    <div class="h-14.5 hidden lg:block">ssss</div>
    @endif
</home>
@endsection