@vite('resources/css/error.css')
<notLoggedIn>
    @guest
    <div class="error404Wrapper">
        <div class="header">
            404
        </div>
        <div class="message">
            You must be logged in to view this page.
            You can login <a href="{{ route('login') }}">here</a>
        </div>
    </div>
    @endguest
</notLoggedIn>