@extends('standard.master')

@section('title', 'Search Page')

@section('content')

@vite('resources/css/authentication/forms.css')
@vite('resources/css/search.css')
<search>
    <form onsubmit="myApp.searchSongs()">
        <div class="mainTitle">
            Search
        </div>
        <div class="searchbarWrapper">
            <input type="text" id="searchBar" required>
        </div>
    </form>

    <div id="recentSearched">
        <div class="searchHeader">
            <div class="mainTitle">
                Your recently searched songs.
            </div>
            <div class="smallTitle searchAmount">
                <select name="AmountOfSongs" id="amountSongSelector">
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="80">80</option>
                </select>
                <div id="amountFound"></div> results...
            </div>
        </div>
        <div id="filters"></div>
        <div class="songList"></div>
    </div>

    <div class="loaderWrapper">
        <span class="loader"></span>
    </div>
</search>
@endsection