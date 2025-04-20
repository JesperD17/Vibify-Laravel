<link href="{{ asset('css/profile.css') }}" rel="stylesheet">

@if (Route::has('login') && !Route::is('profile'))
    @auth
    <toProfile>
        <a href="{{ route('profile') }}">
            <img src="{{ asset('pics/blank-profile-picture.webp') }}" class="profilePic">
        </a>
    </toProfile>
    @endauth
@endif    