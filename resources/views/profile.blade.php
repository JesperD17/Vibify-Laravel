@extends('standard.master')

@section('title', 'Profile page')

@section('content')
@vite('resources/css/profile.css')
<profile>

    <div class="mainTitle">Profile details</div>

    <div class="profileWrapper">
        <div class="profileSections">
            <div class="flexAlign">
                Profile: 
            </div>
            <div class="flexAlign">
                <img src="{{ asset('pics/blank-profile-picture.webp') }}">
                <button>Change profile</button>
            </div>
        </div>
        
        <div class="profileSections">
            <div class="flexAlign">
                Email adress:
            </div>
            <div class="flexAlign">
                example@gmail.com
            </div>
        </div>
        
        <div class="profileSections">
            <div class="flexAlign">
                User Name:
            </div>
            
            <div class="flexAlign">
                Example name
            </div>
        </div>
        
        <div class="profileSections">
            <div class="flexAlign">
                Role:
            </div>
            
            <div class="flexAlign">
                Admin
            </div>
        </div>
        
        <div class="profileSections">
            <div class="flexAlign">
                Account created:
            </div>
            
            <div class="flexAlign">
                2-4-2025
            </div>
        </div>
    </div>
        
    </profile>
    @endsection