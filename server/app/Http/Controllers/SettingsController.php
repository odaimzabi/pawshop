<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\S3Service;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Settings\UpdateInfoRequest;
use App\Http\Requests\Settings\UpdatePasswordRequest;

class SettingsController extends Controller
{
    protected $s3;

    public function __construct(S3Service $s3)
    {
        $this->s3 = $s3;
    }
    public function updateInfo(UpdateInfoRequest $request)
    {
        if (!$request->user()->update($request->validated())) {
            return response()->json(["success" => false, "message" => "Failed to update user details"], 400);
        }

        $user = User::select("id", "name", "email", "image", "username")->where("id", $request->user()->id)->first();
        if (!is_null($user->image)) {
            $user->image = $this->s3->getFile($user->image);
        }
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
