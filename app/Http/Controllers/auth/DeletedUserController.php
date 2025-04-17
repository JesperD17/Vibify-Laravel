<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

class DeleteUserController extends Controller
{
    public function destroy(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Optionally log the user out before deletion
        // Auth::logout();

        // Delete the user
        $user->delete();

        // Invalidate the session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to homepage or goodbye page
        return redirect('/')->with('status', 'Your account has been deleted.');
    }
}
