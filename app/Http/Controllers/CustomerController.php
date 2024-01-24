<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    public function orders()
    {
        $user = Auth::user();
        $params = [];
        $params["orders"] = Transaction::where(['user_id' => $user->id])->orderByDesc('created_at')->get()->map(function ($transaction) {
            $transaction["product"] = $transaction->product()->first();
            $transaction["shop"] = $transaction->shop()->first();
            $transaction["review"] = $transaction->review()->first();
            return $transaction;
        });

        return Inertia::render('Customer/Orders', $params);
    }

    public function addReview(Request $request)
    {
        // dd($request->all());
        $transaction = Transaction::find($request->transactionId);

        $user = Auth::user();

        if ($transaction) {
            $review = Review::create([
                "user_id" => $user->id,
                "shop_id" => $transaction->shop_id,
                "transaction_id" => $transaction->id,
                "description" => $request->description,
                "rating" => $request->rating
            ]);
        }

        return to_route('customer.orders');
    }
}
