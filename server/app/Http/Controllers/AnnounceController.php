<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Services\S3Service;

class AnnounceController extends Controller

{
    protected $s3;

    public function __construct(S3Service $s3)
    {
        $this->s3 = $s3;
    }

    public function show()
    {
        $animals = Animal::select("id", "name", "image", "vaccinated", "published")->where("published", 1)->get();
        $animals->makeHidden("published");

        foreach ($animals as $animal) {
            $animal["image"] = $this->s3->getFile($animal->image);
        }

        return response()->json(["animals" => $animals], 200);
    }
}
