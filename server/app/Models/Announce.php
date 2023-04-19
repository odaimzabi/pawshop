<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Announce extends Model
{
    use HasFactory;
    protected $fillable = ["animal_id", "user_id", "image", "description", "title", "video"];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function animal()
    {

        return $this->hasOne(Animal::class);
    }
}
