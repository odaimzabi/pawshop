<?php

namespace App\Http\Requests\Settings;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInfoRequest extends FormRequest
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
        return   [
            "email" => "sometimes|email",
            "name" => "required|string|max:255",
            "image" => "sometimes|string|max:255",
            "username" => "sometimes|string|max:255"
        ];
    }
}
