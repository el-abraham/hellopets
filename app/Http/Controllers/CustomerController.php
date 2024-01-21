<?php

namespace App\Http\Controllers;

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
            return $transaction;
        });

        return Inertia::render('Customer/Orders', $params);
    }
}
