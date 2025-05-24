@extends('standard.master')

@section('title', 'New playlist page')

@section('content')
<newPlaylist>
    @auth
    <form>
        
    </form>
    @endauth

    @include('standard.notLoggedIn')
</newPlaylist>
@endsection