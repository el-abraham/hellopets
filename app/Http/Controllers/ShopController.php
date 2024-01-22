<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Shop;
use App\Models\Transaction;
use App\Models\ShopGallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    public function detail($id)
    {
        $shop = Shop::where("id", $id)->first();
        $params = [];
        if ($shop) {
            $params["shop"] = $shop;
            $params["shop"]->facilities = json_decode($shop->facilities);
            $params["galleries"] = $shop->galleries()->get()->map(function ($photo) {
                $photo["path"] =  asset('storage/galleries/' . $photo->path);
                return $photo;
            });
            $params["products"] = $shop->products()->get();

            $params["reviews"] = $shop->reviews()->get()->map(function ($review) {
                $review["user"] = $review->user()->first();
                return $review;
            });
        }

        return Inertia::render('Petshop/DetailPetshop', $params);
    }

    public function dashboard(Request $request)
    {
        $user = Auth::user();
        if ($user && $user->role == "shop_master") {
            $params = [];
            if ($request->has("tab")) {
                // return Inertia::render('Petshop/DashboardPetshop', ["tab" => $request->tab]);
                $params["tab"] = $request->tab;
            }

            $shop = Shop::where(['user_id' => $user->id])->first();

            if ($request->has("tab") && $request->tab == "review") {
                $params["reviews"] = $shop->reviews()->get()->map(function ($review) {
                    $review["user"] = $review->user()->first();
                    return $review;
                });
            } else {
                $params["transactions"] = $shop->transactions()->orderByDesc('created_at')->get()->map(function ($transaction) {
                    $transaction["user"] = $transaction->user()->first();
                    $transaction["product"] = $transaction->product()->first();
                    return $transaction;
                });
            }


            return Inertia::render('Petshop/DashboardPetshop', $params);
        }


        return to_route('welcome');
    }

    // public function dashboardTransactions() {
    //     $user = Auth::user();
    //     if ($user && $user->role_id == "shop_master") {
    //         return Inertia::render('Petshop/DashboardPetshop');
    //     }
    //     return to_route('Welcome');

    // }



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
            'galleries' => true, 'shop_id' => $shop->id
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
