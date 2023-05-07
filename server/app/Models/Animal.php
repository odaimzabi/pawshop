<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Animal extends Model
{
    use HasFactory;

    protected $fillable = ["name", "age", "gender", "color", "vaccinated", "weight", "user_id", "image", "location", "description"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function announce()
    {

        return $this->belongsTo(Announce::class, 'animal_id', 'id');
    }
}
