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
            return $shop;
        });

        return Inertia::render('Welcome', $params);
    }
}
