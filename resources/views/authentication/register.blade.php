@extends('standard.master')

@section('title', 'Register Page')

@section('content')

@vite('resources/css/authentication/register.css')
<register>
    <form action="POST">
        <div class="mainTitle">
            Create your new account!
        </div>

        <div class="formWrapper">
            <input type="text" placeholder="userName"></input>
            <input type="text" placeholder="email"></input>
            <input type="text" placeholder="verified_email"></input>
            <input type=password placeholder="password"></input>
        </div>

        <button type="reset"></button>
    </form>
</register>
@endsection