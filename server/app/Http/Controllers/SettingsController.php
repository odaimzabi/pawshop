<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Settings\UpdateInfoRequest;
use App\Http\Requests\Settings\UpdatePasswordRequest;

class SettingsController extends Controller
{
    public function updateInfo(UpdateInfoRequest $request)
    {
        if (!$request->user()->update($request->validated())) {
            return response()->json(["success" => false, "message" => "Failed to update user details"], 400);
        }

        $user = User::select("id", "name", "email", "image", "username")->where("id", $request->user()->id)->get();
        return response()->json(["success" => true, "user" => $user], 200);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = User::find($request->user()->id);
        $old_password = $request->old_password;
        $new_password = $request->new_password;

        if (!Hash::check($old_password, $user["password"])) {
            return response()->json(["success" => false, "message" => "Invalid current password"], 400);
        }

        $user["password"] = Hash::make($new_password);
        $user->update();

        return response()->json(["success" => true, "message" => "Successfully updated your password!"], 200);
    }
}
