<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'shop_id' => 'required|integer',
            'name' => 'required|string',
            'price' => 'required|integer'
        ]);

        $product = Product::create([
            'shop_id' => $request->shop_id,
            'name' => $request->name,
            'price' => $request->price
        ]);

        return $product;
    }
}
