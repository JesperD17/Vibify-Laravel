<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;

class LimitGuestSearchController extends Controller
{
    public function count()
    {
        $userId = Auth::id();

        // if ($userId) {
        //     return view("search");
        // }

        if (RateLimiter::remaining('', $perMinute = 5)) {
            RateLimiter::increment('');

            $data = ["test" => true];

            return view("search", [
                "jsonData" => $data
            ]);
        } else {
            return 'Too many requests!';
        }

        RateLimiter::increment('send-message');
    }
}
