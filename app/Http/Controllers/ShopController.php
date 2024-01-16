<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Shop;
use App\Models\ShopGallery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function detail($id)
    {
        $shop = Shop::where("id", $id)->first();
        $params = [];
        if ($shop) {
            $params["shop"] = $shop;
            $params["galleries"] = $shop->galleries()->get()->map(function ($photo) {
                $photo["path"] =  asset('storage/galleries/' . $photo->path);
                return $photo;
            });
            $params["products"] = $shop->products()->get();
        }

        return Inertia::render('Petshop/DetailPetshop', $params);
    }

    public function register()
    {
        $shop = Shop::where('user_id', auth()->user()->id)->first();
        $params = [];
        if ($shop) {

            $galleries = ShopGallery::where('shop_id', $shop->id)->get();
            if ($galleries->count() > 0) {
                $params["images"] = $galleries->map(function ($photo) {
                    return [
                        'path' => asset('storage/galleries/' . $photo->path)
                    ];
                });
            }
            $params["galleries"] = true;
            $params["shop_id"] = $shop->id;
        }
        return Inertia::render('PetshopRegister/index', $params);
    }

    public function store(Request $request)
    {

        $shop = Shop::create([
            'user_id' => $request->userId,
            'name' => $request->name,
            'description' => $request->description,
            'email' => $request->email,
            'facilities' => json_encode($request->facilities),
            'alamat' => $request->address,
            'no_telp' => $request->no_telp
        ]);
        if ($shop) {
            $products = json_decode($request->products);
            foreach ($products as $product) {
                $prod = $this->addProduct([
                    'shop_id' => $shop->id,
                    'name' => $product->name,
                    'price' => $product->price
                ]);
            }
        }



        return Inertia::render('PetshopRegister/index', [
            'galleries' => true
        ]);
    }

    private function addProduct($product)
    {
        $prod = Product::create([
            'shop_id' => $product["shop_id"],
            'name' => $product["name"],
            'price' => $product["price"]
        ]);
        return $prod;
    }
}
