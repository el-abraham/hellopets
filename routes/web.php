<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ShopGalleryController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name("welcome");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/orders', [CustomerController::class, 'orders'])->middleware(['auth', 'verified'])->name('customer.orders');

Route::get('/shop-dashboard', [ShopController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('shop.dashboard');

// Route::get('/shop-dashboard/transactions', function () {
//     return Inertia::render('Petshop/DashboardPetshop');
// })->middleware(['auth', 'verified'])->name('shop.dashboard');

Route::get('/shop/{id}', [ShopController::class, 'detail'])->name('shop.detail');

Route::post('/shop-transaction', [TransactionController::class, 'makeTransaction'])->middleware(['auth', 'verified'])->name('shop.makeTransaction');

Route::get('/orders', [CustomerController::class, 'orders'])->middleware(['auth', 'verified'])->name('customer.orders');

Route::post('/shop-review', [CustomerController::class, 'addReview'])->middleware(['auth', 'verified'])->name('customer.review');

Route::get('/shop-register', [ShopController::class, 'register'])->middleware(['auth', 'verified'])->name('shop.register');

Route::get('/register-uh', function () {
    return Inertia::render('Auth/RegisterShop');
});

Route::post('/shop-register', [ShopController::class, 'store']);

Route::post('/upload-image', [ShopGalleryController::class, 'upload']);

// Route::get('/testing', function () {
//     $client = new GuzzleHttp\Client();
//     $res = $client->get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');

//     dd($res->getBody());
// });

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
