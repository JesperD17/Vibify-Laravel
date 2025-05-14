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
        <div class="delAuth">
        @endauth
        <div class="error404Wrapper">
            <div class="header">
                404
            </div>
            <div class="message">
                You must be logged in to view this page.
            </div>
        </div>
        @auth
        </div>
        @endauth
    </div>
</saved>
@endsection