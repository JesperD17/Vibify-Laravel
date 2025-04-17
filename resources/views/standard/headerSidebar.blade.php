<link href="{{ asset('css/header.css') }}" rel="stylesheet">
<headerSidebar>

    <a href="{{ route('home') }}" class="logo">
        <img src="{{ asset('pics/logo.png') }}">
    </a>

    <div class="linksWrapper">
        <a href="{{ route('home') }}" class="linkWithIcon">
            <i class='bx bx-home-alt-2' ></i>
            Home
        </a>
    
        <a href="{{ route('saved') }}" class="linkWithIcon">
            <i class='bx bx-save' ></i>
            Saved
        </a>
    
        <a href="{{ route('search') }}" class="linkWithIcon">
            <i class='bx bx-search-alt-2' ></i>
            Search
        </a>

        <a href="{{ route('newPlaylist') }}" class="linkWithIcon">
            <i class='bx bx-list-plus' ></i>
            New playlist
        </a>
        
        @if (Route::has('login'))
            @auth
                <a href="{{ route('profile') }}" class="linkWithIcon">
                    <i class='bx bxs-dashboard'></i>
                    Profile
                </a>
            @else
                <a href="{{ route('login') }}" class="linkWithIcon">
                    <i class='bx bxs-user'></i>
                    Log in
                </a>

                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="linkWithIcon">
                        <i class='bx bxs-edit'></i>
                        Register
                    </a>
                @endif
            @endauth
        @endif
    </div>

    <i class='bx bx-menu' id="extendIcon"></i>
</headerSidebar>
