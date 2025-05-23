<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vibify Laravel!</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

    {{-- css --}}
    @vite('resources/css/app.css')
    @vite('resources/css/animations.css')

    {{-- js --}}
    @vite('resources/js/app.js')
    @vite('resources/js/confirmSubmit.js')
</head>
<body>
    @include('standard.toprofile')
    
    @include('standard.headerSidebar')
    
    <div id="contentAndFooter">
        @yield('content')
    
        @include('standard.footerBar')
    </div>
</body>
</html>