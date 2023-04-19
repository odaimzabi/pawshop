<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AnimalRequest;
use App\Http\Requests\EditAnimalRequest;
use App\Services\S3Service;

class AnimalController extends Controller
{

    protected $s3;
    public function __construct(S3Service $s3)
    {
        $this->s3 = $s3;
    }
    public function create(AnimalRequest $request)
    {
        $animal = Animal::create([...$request->validated(), "user_id" => $request->user()->id]);
        $request->user()->animals()->save($animal);
        return response()->json(["animal" => $animal], 201);
    }
    public function showAll(Request $request)
    {
        $animals = Animal::with('user:id')->where('user_id', $request->user()->id)->get(["id", "name", "vaccinated", "image"]);
        $animals->makeHidden("user");
        foreach ($animals as $animal) {
            $animal["image"] = $this->s3->getFile($animal->image);
        }
        return response()->json(["animals" => $animals], 200);
    }

    public function showOne(Request $request, string $id)
    {
        $animal = Animal::where([
            ["user_id", $request->user()->id],
            ["id", $id]
        ])->first(["name", "age", "gender", "color", "vaccinated", "weight", "image"]);

        if ($animal == null) {
            return response()->json(["animal" => null], 404);
        }
        return response()->json(["animal" => $animal], 200);
    }

    public function edit(EditAnimalRequest $request, string $id)
    {
        $animal = Animal::where("id", $id)->update($request->validated());
        if (!$animal) {
            return response()->json(["success" => false, "message" => "Animal not found"], 404);
        }
        return response()->json(["success" => true, "message" => "Animal edited"], 201);
    }
}
