@vite('resources/css/header.css')
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
            <nav class="flex items-center justify-end gap-4">
                @auth
                    <a
                        href="{{ route('/dashboard') }}"
                        class="inline-block px-5 py-1.5 dark:text-[#EDEDEC] border-[#19140035] hover:border-[#1915014a] border text-[#1b1b18] dark:border-[#3E3E3A] dark:hover:border-[#62605b] rounded-sm text-sm leading-normal"
                    >
                        Dashboard
                    </a>
                @else
                    <a
                        href="{{ route('login') }}"
                        class="inline-block px-5 py-1.5 dark:text-[#EDEDEC] text-[#1b1b18] border border-transparent hover:border-[#19140035] dark:hover:border-[#3E3E3A] rounded-sm text-sm leading-normal"
                    >
                        Log in
                    </a>
    
                    @if (Route::has('register'))
                        <a
                            href="{{ route('register') }}"
                            class="inline-block px-5 py-1.5 dark:text-[#EDEDEC] border-[#19140035] hover:border-[#1915014a] border text-[#1b1b18] dark:border-[#3E3E3A] dark:hover:border-[#62605b] rounded-sm text-sm leading-normal">
                            Register
                        </a>
                    @endif
                @endauth
            </nav>
        @endif
    </div>

    <i class='bx bx-menu' id="extendIcon"></i>
</headerSidebar>
