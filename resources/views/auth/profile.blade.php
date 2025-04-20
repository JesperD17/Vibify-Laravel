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
                        {{-- <a id="changeProf" href="#">
                            <i class='bx bx-edit-alt'></i>
                        </a> --}}
                        <img src="{{ asset('uploads/avatars/' . auth()->user()->avatar) }}">

                        <form enctype="multipart/form-data" action="{{ route('updateUser') }}" method="POST">
                            <label>Update Profile Image</label>
                            <input type="file" name="avatar" />
                            <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                            <button type="submit" id="3">
                        </form>
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
                            <button type="submit" class="logout" id="1">
                                Log Out
                            </button>
                        </form>
                    </div>
                    <div class="flexAlign">
                        <form method="POST" action="{{ route('deleteUser') }}">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="delAcc" id="2">
                                Delete Account
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
            <div class="popupMessage"></div>
            
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