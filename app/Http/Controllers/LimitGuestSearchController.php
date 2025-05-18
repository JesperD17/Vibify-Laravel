<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;

class LimitGuestSearchController extends Controller
{
    public function count(Request $request)
    {
        // $cookie_name = "guestLimit";
        // $expiration = time() + (86400 * 30);

        // if ($user) return;

        // if (!isset($_COOKIE[$cookie_name])) {
        //     $cookie_value = 1;
        //     setcookie($cookie_name, $cookie_value, $expiration, "/");
        // } else {
        //     $current_value = (int)$_COOKIE[$cookie_name];
        //     if ($current_value < 6) {
        //         $newValue = $current_value + 1;
        //         setcookie($cookie_name, $newValue, $expiration, "/");
        //     } else {
        //     }
        // }

        $userId = Auth::id();

        if (RateLimiter::tooManyAttempts('send-message:', $perMinute = 5)) {
            $seconds = RateLimiter::availableIn('send-message');

            return 'You may try again in ' . $seconds . ' seconds.';
        } else {
            return 'a';
        }

        RateLimiter::increment('send-message');

        // Send message...
    }
}
