<?php

namespace App\Http\Controllers;

use App\Models\ShopGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ShopGalleryController extends Controller
{
    public function upload(Request $request)
    {
        // $request->validate([
        //     'image' => 'required|mimes:gif,jpeg,jpg,png'
        // ]);

        $shop_id = $request->shop_id;
        $images = $request->image;

        foreach ($images as $image) {
            $filename = time() . $image->getClientOriginalName();
            $path = "galleries/" . $filename;

            Storage::disk('public')->put($path, file_get_contents($image));


            $shopGallery = ShopGallery::create([
                'shop_id' => $shop_id,
                'slug' => '',
                'path' => $filename,
                'type' => "image"
            ]);
        }

        return to_route('shop.register');
    }
}
