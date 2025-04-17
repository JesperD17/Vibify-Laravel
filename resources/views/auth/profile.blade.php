@extends('standard.master')

@section('title', 'Profile page')

@section('content')

<link href="{{ asset('css/profile.css') }}" rel="stylesheet">

<profile>
    <div class="mainTitle">Profile details</div>

    <div class="profileOuterWrapper">
        <div class="profileWrapper">
            @if (Route::has('login'))
            @auth

                <div class="profileSections">
                    
                    <div class="flexAlign">
                        Profile:
                    </div>
                    <div class="flexAlign">
                        <img src="{{ asset('pics/blank-profile-picture.webp') }}">
                        <button>Change profile <i class='bx bx-edit-alt'></i></button>
                    </div>
                </div>
                
                <div class="profileSections">
                    <div class="flexAlign">
                        Email adress:
                    </div>
                    <div class="flexAlign">
                        {{ auth()->user()->email }}
                    </div>
                </div>
                
                <div class="profileSections">
                    <div class="flexAlign">
                        User Name:
                    </div>
                    
                    <div class="flexAlign">
                        {{ auth()->user()->name }}
                    </div>
                </div>
                
                <div class="profileSections">
                    <div class="flexAlign">
                        Role:
                    </div>
                    
                    <div class="flexAlign">
                        example
                    </div>
                </div>
                
                <div class="profileSections">
                    <div class="flexAlign">
                        Account created:
                    </div>
                    
                    <div class="flexAlign">
                        {{ auth()->user()->created_at }}
                    </div>
                </div>
                <div class="profileSections">
                    <div class="flexAlign">
                        @csrf
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            
                            <button 
                            :href="route('logout')" 
                            onclick="event.preventDefault();
                            this.closest('form').submit();">
                                Log Out
                            </button>
                        </form>
                    </div>
                    <div class="flexAlign">
                        <form method="POST" action="{{ route('deleteUser') }}">
                            @csrf
                            
                            <button 
                            :href="route('deleteUser')" 
                            onclick="event.preventDefault();
                            this.closest('form').submit();">
                                Remove account
                            </button>
                        </form>
                    </div>
                </div>
                
            @endauth
            @endif
        </div>
    </div>
    <div class="popupBackground">
        <div class="popupWrapper">
            Are you sure you want to logout?
            
            <div class="popupBtns">
                <button class="yes-button">Yes</button>
                <button class="no-button">No</button>
            </div>
        </div>
        <div class="loaderWrapper">
            <span class="loader"></span>
        </div>
    </div>
</profile>
@endsection