@extends('standard.master')

@section('title', 'Register Page')

@section('content')

@vite('resources/css/authentication/forms.css')
<register>
    <form method="POST" class="form">
        @csrf
        <div class="mainTitle">
            Create your new account!
        </div>

        <div class="formWrapper">
            <div class="inputAndText">
                Name
                <input type="text" name="name" value="{{ old('name') }}">
            </div>

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

            <div class="inputAndText">
                Verify password
                <input type="password" name="password_confirmation">
            </div>

            <div class="formButtons">
                <button type="submit" onclick="myApp.loadingBeforeSubmit(event)">Register</button>
                <button type="reset" class="alt">X</button>
            </div>
        </div>

        <div class="loaderWrapper">
            <span class="loader"></span>
        </div>
    </form>
</register>
@endsection