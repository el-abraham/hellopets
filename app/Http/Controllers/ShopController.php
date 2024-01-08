<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;

class ShopController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'name' => 'required|string',
            'description' => 'required|string',
            'email' => 'required|string|lowercase|email|max:255|unique:' . Shop::class,
            'alamat' => 'required|string',
            'no_telp' => 'required|string'
        ]);

        $shop = Shop::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'description' => $request->description,
            'email' => $request->email,
            'alamat' => $request->alamat,
            'no_telp' => $request->no_telp
        ]);

        return $shop;
    }
}
