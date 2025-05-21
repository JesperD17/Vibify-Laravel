<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;

class LimitGuestSearchController extends Controller
{
    public function count(Request $request)
    {
        $key = 'search:' . $request->ip();
        $maxAttempts = 5;
        $decaySeconds = 60 * 60 * 24;

        if (Auth::check() || RateLimiter::remaining($key, $maxAttempts) > 0) {
            RateLimiter::hit($key, $decaySeconds); // Store hit with 24-hour expiry

            return response()->json('safe');
        } else {
            return response()->json('too many requests!', 429);
        }
    }
}
