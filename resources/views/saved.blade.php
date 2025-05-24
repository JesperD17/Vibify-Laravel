@extends('standard.master')

@section('title', 'Saved page')

@section('content')
<saved>
    <div id="savedPlaylists">
        @auth
        <div class="mainTitle">
            Your saved playlists.
        </div>
        <div class="playLists">
        </div>
        @endauth

    </div>
    @include('standard.notLoggedIn')
</saved>
@endsection