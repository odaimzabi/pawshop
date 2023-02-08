<?php

namespace Tests\Feature;

use Tests\TestCase;
use \App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthControllerTest extends TestCase

{
    use RefreshDatabase;

    private User $user;

    private  function createUser(): mixed
    {
        return User::create([
            'email' => 'johndoe@example.org',
            'password' => Hash::make('testpassword'),
            'name' => "johndoe"
        ]);
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = $this->createUser();
    }

    public function test_should_show_validation_errors_when_all_fields_are_empty()
    {
        $response = $this->json('POST', route("auth.login"), [
            "email" => "",
            "password" => "",
            "name" => ""
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors(["email", "password"]);
    }

    public function test_should_show_error_if_email_doesnt_exist()
    {
        $response = $this->json("POST", route("auth.login"), [
            "email" => "test@test.com",
            "password" => "testpassword"
        ]);
        $response->assertStatus(422)->assertJsonValidationErrors(["email"]);
    }
    public function test_should_show_error_if_password_doesnt_match()
    {
        $response = $this->json("POST", route("auth.login"), [
            "email" => "test@test.com",
            "password" => "testpassword22"
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors(["email"]);
    }
    public function test_should_return_user_and_access_token_if_credentials_correct()
    {
        $response = $this->json("POST", route("auth.login"), [
            "email" => "johndoe@example.org",
            "password" => "testpassword"
        ]);

        $response->assertStatus(200)->assertJsonStructure(["user", "access_token"]);
    }

    public function test_should_throw_errors_if_fields_missing_on_register()
    {
        $response = $this->json("POST", route("auth.register"), [
            "email" => "",
            "password" => "",
            "name" => "",
        ]);
        $response->assertStatus(422)->assertJsonValidationErrors(["email", "password", "name"]);
    }
    public function test_should_regiser_user()
    {
        $createUserResponse = $this->json("POST", route("auth.register"), [
            "email" => "test@test.com",
            "password" => "testpassword",
            "name" => "test",
        ]);

        $createUserResponse->assertStatus(201)->assertJsonStructure(["success", "message"]);
    }
    public function test_should_throw_error_if_user_already_exists()
    {
        $createUserResponse = $this->json("POST", route("auth.register"), [
            "email" => "test@test.com",
            "password" => "testpassword",
            "name" => "test",
        ]);
        $createUserResponse->assertStatus(201);

        $invalidUserResponse = $this->json("POST", route("auth.register"), [
            "email" => "test@test.com",
            "password" => "testpassword",
            "name" => "test",
        ]);
        $invalidUserResponse->assertStatus(422)->assertJsonValidationErrors(["email"]);
    }

    public function test_should_show_user_details_if_authenticated()
    {
        Sanctum::actingAs(
            User::first()
        );
        $response = $this->json('GET', route('auth.user'));

        $response->assertStatus(200)->assertJsonStructure(["name", "email", "id"]);
    }

    public function test_user_cannot_logout_if_not_authenticated()
    {
        $response = $this->json('POST', route('auth.logout'));

        $response->assertStatus(401)->assertSee("Unauthenticated");
    }

    public function test_user_can_logout_if_authenticated()
    {
        Sanctum::actingAs(
            User::first()
        );

        $response = $this->json('POST', route('auth.logout'));

        $response->assertStatus(200)->assertJsonStructure(["success", "message"]);
    }
}
