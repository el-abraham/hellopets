<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $params = [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ];

        $shops = Shop::orderByDesc('created_at')->take(20)->get();
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
            $shop["ratingScore"] = (array_reduce($ratings, function ($v1, $v2) {
                return $v1 + $v2;
            }) / count($ratings));
            return $shop;
        });

        return Inertia::render('Welcome', $params);
    }
}
