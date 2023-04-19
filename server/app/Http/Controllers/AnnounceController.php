<?php

namespace App\Http\Controllers;

use App\Models\Announce;
use Illuminate\Http\Request;

class AnnounceController extends Controller
{
    public function create(Request $request)
    {
        Announce::create(["user_id" => 1, "image" => "", "description" => "test", "title" => "test", "video" => ""]);
        return response()->json(["test" => Announce::with("animal")->get()], 201);
    }
}
