<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\InvoiceController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::apiResource('transactions', TransactionController::class);

Route::apiResource('invoices', InvoiceController::class);

Route::fallback(function () {
    return response()->json(['message' => 'Not Found'], 404);
});
