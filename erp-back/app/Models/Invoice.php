<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'customer_name', 
        'amount', 
        'due_date', 
        'status' // 'Paid', 'Pending', 'Overdue'
    ];
}
