<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\S3Service;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    protected $s3;
    public function __construct(S3Service $s3)
    {
        $this->s3 = $s3;
    }
    public function login(LoginRequest $request)
    {

        $user = User::where("email", $request->email)->first();
        if (Auth::attempt($request->validated())) {
            $request->session()->regenerate();
            return response()->json([
                'success' => true,
                'token' => $user->createToken($request->email)->plainTextToken
            ], 200);
        }
        return response()->json(["success" => false, "message" => "Invalid Credentials"], 404);
    }

    public function register(RegisterRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData["password"] = Hash::make($validatedData["password"]);
        if (User::create($validatedData)) {
            return response()->json([
                "success" => true,
                "message" => "Successfully registered the user"
            ], 201);
        }
        return response()->json([
            "success" => true,
            "message" => "User already exists with this email!"
        ], 400);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            "success" => true,
            "message" => "Sucessfully logged out the user."
        ], 200);
    }

    public function user(Request $request)
    {
        $user = User::select("id", "name", "username", "email", "image")->where("id", $request->user()->id)->first();
        if (!is_null($user->image)) {
            $user->image = $this->s3->getFile($user->image);
        }
        return $user;
    }
}
