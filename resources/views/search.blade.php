@extends('standard.master')

@section('title', 'Search Page')

@section('content')

@vite('resources/css/authentication/forms.css')
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
                <div id="amountFound"></div> results...
            </div>
        </div>
        <div class="songList">
            
        </div>
    </div>

    <div class="loaderWrapper">
        <span class="loader"></span>
    </div>
</search>
@endsection