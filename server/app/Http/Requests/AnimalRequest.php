<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AnimalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "age" => "required|string|max:3",
            "gender" => ["required", Rule::in(["male", "female"])],
            "color" => "required|string|max:10",
            "vaccinated" => "required|boolean",
            "weight" => "required|string|max:255",
            "name" => "required|string|max:255",
            "image" => "required|string|max:255"
        ];
    }
}
