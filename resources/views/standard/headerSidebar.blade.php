<link href="{{ asset('css/header.css') }}" rel="stylesheet">
<headerSidebar class="closedMenu">

    <a href="{{ route('home') }}" class="logo">
        <img src="{{ asset('pics/logo.png') }}">
    </a>

    <div class="linksWrapper">
        <a href="{{ route('home') }}" class="linkWithIcon home">
            <i class='bx bx-home-alt-2' ></i>
            <div class="linkText">
                Home
            </div>
        </a>
    
        <a href="{{ route('saved') }}" class="linkWithIcon">
            <i class='bx bx-save' ></i>
            <div class="linkText">
                Saved
            </div>
        </a>
    
        <a href="{{ route('search') }}" class="linkWithIcon">
            <i class='bx bx-search-alt-2' ></i>
            <div class="linkText">
                Search
            </div>
        </a>

        <a href="{{ route('newPlaylist') }}" class="linkWithIcon">
            <i class='bx bx-list-plus' ></i>
            <div class="linkText">
                New playlist
            </div>
        </a>
        
        @if (Route::has('login'))
            @auth
                {{-- <a href="{{ route('profile') }}" class="linkWithIcon">
                    <i class='bx bxs-dashboard'></i>
                    <div class="linkText">
                        Profile
                    </div>
                </a> --}}
            @else
                <a href="{{ route('login') }}" class="linkWithIcon">
                    <i class='bx bxs-user'></i>
                    <div class="linkText">
                        Log in
                    </div>
                </a>

                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="linkWithIcon">
                        <i class='bx bxs-edit'></i>
                        <div class="linkText">
                            Register
                        </div>
                    </a>
                @endif
            @endauth
        @endif
    </div>

    <div id="extendIcon">
        <i class='bx bx-menu'></i>
    </div>
</headerSidebar>
