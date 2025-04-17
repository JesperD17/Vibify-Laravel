@extends('standard.master')

@section('title', 'Login Page')

@section('content')

<link href="{{ asset('css/authentication/forms.css') }}" rel="stylesheet">
<login>
    <form method="POST">
        @csrf
        <div class="mainTitle">
                Log into your account!
        </div>

        <div class="formWrapper">
            <div class="inputAndText">
                Mail
                <input type="text" name="email" value="{{ old('email') }}" class="@error('email')errorFormInput @enderror">
                @error('email')
                    <div class="errorFormText">{{ $message }}</div>
                @enderror
            </div>

            <div class="inputAndText">
                Password
                <input type="password" name="password" class="@error('password')errorFormInput @enderror">
                @error('password')
                    <div class="errorFormText">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="formButtons">
                <button type="submit" onclick="loadingBeforeSubmit()">Login</button>
                <button type="reset" class="alt">X</button>
            </div>
        </div>

        <div class="loaderWrapper">
            <span class="loader"></span>
        </div>
    </form>
</login>
@endsection