@extends('standard.master')

@section('title', 'Saved page')

@section('content')
<saved>
    <div id="savedPlaylists">
        <div class="mainTitle">
            Your saved playlists.
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
</saved>
@endsection