<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LimitGuestSearchController extends Controller
{
    public function count(Request $request) 
    {
        dd($request->all());
    }
}
