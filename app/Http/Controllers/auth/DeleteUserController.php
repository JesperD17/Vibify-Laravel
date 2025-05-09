<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class DeleteUserController extends Controller
{
    public function destroy(Request $request): RedirectResponse
    {
        $user = Auth::user();

        $user->delete();

        Auth::logout();

        return redirect('/');
    }
}
