<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $params = [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ];

        $shops = Shop::orderByDesc('created_at')->get();


        // $shops = $shops->take(20)->get();
        $params["shops"] = $shops->map(function ($shop) {

            $products = $shop->products()->get()->map(function ($facility) {
                return $facility->name;
            });

            $photoPreview = asset('storage/galleries/' . $shop->galleries()->first()->path);

            $shop["facilities"] = json_decode($shop->facilities);
            $shop["products"] = $products;
            $shop["photo"] = $photoPreview;
            $reviews = $shop->reviews()->get();

            $ratings = array();
            foreach ($reviews as $rev => $value) {
                array_push($ratings, $value["rating"]);
            }

            // dd($ratings);
            // dd($reviews->map(function ($review) {
            //     return $review["rating"];
            // }));
            $shop["ratingScore"] = count($ratings) != 0 ? (array_reduce($ratings, function ($v1, $v2) {
                return $v1 + $v2;
            }) / count($ratings)) : 0;
            return $shop;
        });

        if ($request->has("pet")) {
            $params["shops"] = gettype($params["shops"]) == "object" ? $params["shops"]->toArray() : $params["shops"];
            $params["shops"] = array_filter($params["shops"], function ($val) {
                $d = array_filter($val["products"]->toArray(), function ($pr) {
                    global $request;

                    return  $pr == $request->pet;
                });
                return count($d) > 0;
            });
        }

        if ($request->has("rating")) {
            $params["shops"] = gettype($params["shops"]) == "object" ? $params["shops"]->toArray() : $params["shops"];

            usort($params["shops"], function ($a, $b) {
                return $b["ratingScore"] - $a["ratingScore"];
            });
        }




        return Inertia::render('Welcome', $params);
    }
}
