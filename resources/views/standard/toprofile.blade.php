@vite('resources/css/profile.css')

@if (Route::has('login'))
    @auth
    <toProfile>
        <a href="{{ route('profile') }}">
            <img src="{{ asset('pics/blank-profile-picture.webp') }}" class="profilePic">
        </a>
    </toProfile>
    @endauth
@endif    