@extends('standard.master')

@section('title', 'Search Page')

@section('content')

@vite('resources/css/authentication/forms.css.js')
<search>
    <form>
        <div class="mainTitle">
            Search
        </div>
        <div class="searchbarWrapper">
            <input type="text">
        </div>
    </form>

    <div id="recentSearched">
        <div class="mainTitle">
            Your recently searched songs.
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
</search>
@endsection