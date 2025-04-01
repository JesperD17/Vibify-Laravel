@extends('standard.master')

@section('title', 'Home Page')

@section('content')
<home>
    homepage

    @if (Route::has('login'))
    <div class="h-14.5 hidden lg:block">ssss</div>
    @endif
</home>
@endsection