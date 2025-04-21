<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

use Illuminate\Support\Facades\Storage;

class UpdateAvatarController extends Controller
{
    public function update_avatar(Request $request): RedirectResponse
    {
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $filename = time() . '.' . $avatar->getClientOriginalExtension();

            // Store the file in 'public/uploads/avatars'
            $avatar->move(public_path('uploads/avatars'), $filename);

            // Update user's avatar path
            $user = Auth::user();
            $user->avatar = $filename;
            $user->save();
        }

        return redirect('auth/profile');
    }
}
