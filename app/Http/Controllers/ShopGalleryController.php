<?php

namespace App\Http\Controllers;

use App\Models\ShopGallery;
use Illuminate\Http\Request;

class ShopGalleryController extends Controller
{
    public function upload()
    {
    }

    public function store(Request $request)
    {
        $shopGallery = ShopGallery::create([
            'shop_id' => $request->shop_id,
            'slug' => $request->slug,
            'path' => $request->path_file,
            'type' => $request->type
        ]);

        return $shopGallery;
    }
}
