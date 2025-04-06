@extends('standard.master')

@section('title', 'Login Page')

@section('content')

@vite('resources/css/authentication/forms.css')
<login>
    <form action="GET">
    <div class="mainTitle">
            Log into your account!
        </div>

        <div class="formWrapper">
            <div class="inputAndText">
                Mail
                <input type="email">
            </div>
            <div class="inputAndText">
                Password
                <input type="password">
            </div>
            <div class="inputAndText">
                Verify password
                <input type="password">
            </div>
            
            <div class="formButtons">
                <button type="submit" >Login</button>
                <button type="reset" class="alt">X</button>
            </div>
        </div>
    </form>
</login>
@endsection