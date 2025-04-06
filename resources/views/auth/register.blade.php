@extends('standard.master')

@section('title', 'Register Page')

@section('content')

@vite('resources/css/authentication/forms.css')
<register>
    <form method="POST" action="{{ route('register') }}" >
        <div class="mainTitle">
            Create your new account!
        </div>

        <div class="formWrapper">
            <div class="inputAndText">
                Name
                <input type="name">
            </div>
            <div class="inputAndText">
                Mail
                <input type="email">
            </div>
            {{-- <div class="inputAndText">
                Verify mail
                <input type="text">
            </div> --}}
            <div class="inputAndText">
                Password
                <input type=password>
            </div>
            
            <div class="formButtons">
                <button type="submit" >Register</button>
                <button type="reset" class="alt">X</button>
            </div>
        </div>
    </form>
</register>
@endsection