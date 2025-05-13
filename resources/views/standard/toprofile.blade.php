@vite('resources/css/profile.css')
@if (Route::has('login') && !Route::is('profile'))
    @auth
    <toProfile>
        <a href="{{ route('profile') }}">
            @php
                $avatarPath = public_path('uploads/avatars/' . auth()->user()->avatar);
            @endphp

            @if (file_exists($avatarPath))
                <img src="{{ asset('uploads/avatars/' . auth()->user()->avatar) }}" class="profilePic">
            @else
                <img src="{{ asset('uploads/avatars/default.jpg') }}" class="profilePic">
            @endif
        </a>
    </toProfile>
    @endauth
@endif    