@extends('standard.master')

@section('title', 'Login Page')

@section('content')

@vite('resources/css/authentication/forms.css')
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
                {{-- @if ($errors->any())
                    <div class="formErrors">
                        @foreach ($errors->all() as $error)
                            <div class="errorFormText">{{ $error }}</div>
                        @endforeach
                    </div>
                @endif --}}
            
            <div class="formButtons">
                <button type="submit" >Login</button>
                <button type="reset" class="alt">X</button>
            </div>
        </div>
    </form>
</login>
@endsection