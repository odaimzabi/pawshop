<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Announce;
use Illuminate\Http\Request;

class AnnounceController extends Controller
{
    public function create(Request $request)
    {
        Announce::create(["user_id" => 1, "image" => "", "description" => "test", "title" => "test", "video" => ""]);
        return response()->json(["test" => Announce::with("animal")->get()], 201);
    }

    public function showAnimals(Request $request)
    {
        $animals = Animal::with('user:id')->where('user_id', $request->user()->id)->get(["id", "name"]);
        $animals->makeHidden("user");
        return response()->json(["animals" => $animals], 200);
    }
}
