<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware() {
        return [new Middleware('auth:sanctum', except: ['show', 'index'])];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(9);
        return response()->json($posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:255'],
        ]);

       $post = $request->user()->posts()->create($validatedData);

       return response()->json([
        'message' => 'Post was created successfully'
       ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return response()->json(['post' => $post, 'user' => $post->user], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('modify', $post);

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'body' => ['required', 'string', 'max:255']
        ]);

        $post->update($validatedData);

        return response()->json([
            'message' => 'Post was updated successfully',
            'data' => $post
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('modify', $post);
        
        $post->delete();

        return response()->json([
            'message' => 'Post was deleted successfully',
        ], 200);
    }
}