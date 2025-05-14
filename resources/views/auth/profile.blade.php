@extends('standard.master')

@section('title', 'Profile page')

@section('content')

@vite('resources/css/profile.css')
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
                    @php
                        $avatarPath = public_path('uploads/avatars/' . auth()->user()->avatar);
                    @endphp

                    @if (file_exists($avatarPath))
                        <img src="{{ asset('uploads/avatars/' . auth()->user()->avatar) }}" class="profilePic skeletons">
                    @else
                        <img src="{{ asset('uploads/avatars/default.jpg') }}" class="profilePic skeletons">
                    @endif
                    
                    <div id="changeProf" onclick="myApp.showChangeAvatarForm()">
                        <i class='bx bx-edit-alt'></i>
                    </div>

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

            <div id="avatarForm">
                @if (Route::has('login'))
                @auth
                
                <form enctype="multipart/form-data" action="{{ route('updateAvatar') }}" method="POST">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                    <label for="file-upload" class="custom-file-upload">
                        Select file
                    </label>
                    <input id="file-upload" type="file" name="avatar" style="field-sizing: content;"/>
                    <button type="submit" id="3">
                        Submit
                    </button>
                </form>
                
                @endauth
                @endif
            </div>
                
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