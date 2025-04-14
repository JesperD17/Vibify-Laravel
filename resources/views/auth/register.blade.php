@extends('standard.master')

@section('title', 'Register Page')

@section('content')

@vite('resources/css/authentication/forms.css')
<register>
    <form method="POST">
        @csrf
        <div class="mainTitle">
            Create your new account!
        </div>

        <div class="formWrapper">
            <div class="inputAndText">
                Name
                <input type="text" name="name">
            </div>
            <div class="inputAndText">
                Mail
                <input type="text" name="email">
            </div>
            <div class="inputAndText">
                Password
                <input type="password" name="password">
            </div>
            <div class="inputAndText">
                Verify password
                <input type="text" name="password_confirmation">
            </div>

            @if ($errors->any())
                <div class="formErrors">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            
            <div class="formButtons">
                <button type="submit">Register</button>
                <button type="reset" class="alt">X</button>
            </div>
        </div>
    </form>
</register>
@endsection