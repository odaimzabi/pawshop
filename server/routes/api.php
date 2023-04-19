<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\AnnounceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UploadController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix("/auth")->group(function () {
    Route::post("/login", [AuthController::class, "login"])->name("auth.login");
    Route::post("/register", [AuthController::class, "register"])->name("auth.register");
    Route::middleware('auth:sanctum')->get('/user', [AuthController::class, "user"])->name("auth.user");
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, "logout"])->name("auth.logout");
});


Route::prefix("/animal")->group(function () {
    Route::middleware("auth:sanctum")->post("/", [AnimalController::class, "create"])->name("animal.create");
    Route::middleware("auth:sanctum")->put("/{id}", [AnimalController::class, "edit"])->name("animal.edit");
    Route::middleware("auth:sanctum")->get("/", [AnimalController::class, "showAll"])->name("animal.showAll");
    Route::middleware("auth:sanctum")->get("/{id}", [AnimalController::class, "showOne"])->name("animal.showOne");
});
Route::prefix("/announce")->group(function () {
    Route::post("/", [AnnounceController::class, "create"])->name("announce.create");
});


Route::prefix("/upload")->group(function () {
    Route::middleware("auth:sanctum")->post("/", [UploadController::class, "upload"])->name("upload.upload");
    Route::middleware("auth:sanctum")->get("/get-file", [UploadController::class, "getFile"])->name("upload.getFile");
});
