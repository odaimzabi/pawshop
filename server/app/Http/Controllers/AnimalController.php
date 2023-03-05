<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Animal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AnimalRequest;

class AnimalController extends Controller
{
    public function create(AnimalRequest $request)
    {
        $animal = Animal::create([...$request->validated(), "user_id" => $request->user()->id]);
        $request->user()->animals()->save($animal);
        return response()->json(["animal" => $animal], 201);
    }
    public function showAll(Request $request)
    {
        $animals = Animal::with('user:id')->where('user_id', $request->user()->id)->get(["id", "name"]);
        $animals->makeHidden("user");
        return response()->json(["animals" => $animals], 200);
    }

    public function showOne(Request $request, $id)
    {
        $animal = Animal::where([
            ["user_id", $request->user()->id],
            ["id", $id]
        ])->first(["id", "name"]);

        if ($animal == null) {
            return response()->json(["animal" => null], 404);
        }
        return response()->json(["animal" => $animal], 200);
    }
}
