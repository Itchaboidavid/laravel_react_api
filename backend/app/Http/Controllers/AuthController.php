<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validatedData = $request->validate([
            'name' => ['bail', 'required', 'string', 'max:255'],
            'email' => ['bail', 'required', 'email', 'unique:users,email'],
            'password' => ['bail', 'required', 'confirmed']
        ]);

        $validatedData['password'] = bcrypt($validatedData['password']);

        $user = User::create($validatedData);
        $token = $user->createToken($request->name);

        return response()->json([
            'message' => 'User was created successfully',
            'user' => $user,
            'token' => $token->plainTextToken
        ], 201);
    }

    public function login(Request $request) {
        $validatedData = $request->validate([
            'email' => ['bail', 'required', 'email'],
            'password' => ['bail', 'required']
        ]);

       if(Auth::attempt([
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
        ])) {
                $user = Auth::user();
                $token = $user->createToken($request->email);
                
                return response()->json([
                    'user' => $user,
                    'token' => $token->plainTextToken
                ], 200);
        } else {
            return response()->json([
                'errors' => ['credentials'=> ['The provided credentials does not match our records']]
            ], 401);
        }
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout successfully'], 200);
    }
}
