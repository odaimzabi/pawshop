<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadRequest;
use App\Services\S3Service;

class UploadController extends Controller
{
    protected $s3;
    public function __construct(S3Service $s3)
    {
        $this->s3 = $s3;
    }
    public function upload(UploadRequest $request)
    {
        $validatedRequest = $request->validated();
        $key = $validatedRequest["key"];
        $file = $this->s3->uploadFile($key);
        return response()->json(["url" => $file["url"], "newKey" => $file["newKey"]]);
    }

    public function getFile(UploadRequest $request)
    {
        $validatedRequest = $request->validated();
        $key = $validatedRequest["key"];
        return response()->json(["url" => $this->s3->uploadFile($key)]);
    }
}
