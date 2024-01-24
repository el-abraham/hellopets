<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Transaction;
use App\Models\Product;

use \DateTime;

class TransactionController extends Controller
{
    private function generateInvoiceNumber() {
        // Menggunakan uniqid() untuk membuat ID unik berdasarkan timestamp
        $uniqueID = uniqid();
    
        // Menambahkan awalan atau format sesuai kebutuhan Anda
        $invoiceNumber = "INV_" . strtoupper($uniqueID);
    
        return $invoiceNumber;
    }

    public function makeTransaction(Request $request)
    {
        $user = Auth::user();
        $product = Product::where(['id' => $request->productId])->first();
        $invoice = $this->generateInvoiceNumber();
        $total = $this->callculateTotal($request->date["from"], $request->date["to"], $product->price);
       
        $transaction = Transaction::create([
            'user_id' => $user->id,
            'shop_id' => $request->shopId,
            'product_id' => $request->productId,
            'from_date' => strtotime($request->date["from"]) * 1000,
            'to_date' => strtotime($request->date["to"]) * 1000,
            'total' => $total,
            'no_invoice' => $invoice
        ]);

        return to_route('customer.orders');
    }

    private function callculateTotal($fromDate, $toDate = null, $dailyRate) {
         // Mengonversi string tanggal menjadi objek DateTime
        $fromDateTime = new DateTime($fromDate);

        // Jika toDate kosong, dihitung 1 hari
        if ($toDate === null) {
            $numberOfDays = 1;
        } else {
            $toDateTime = new DateTime($toDate);

            // Menghitung selisih hari antara dua tanggal
            $interval = $fromDateTime->diff($toDateTime);
            $numberOfDays = $interval->days + 1;
        }

        // Menghitung total biaya
        $totalCost = $numberOfDays * $dailyRate;

        return $totalCost;
    }
}
