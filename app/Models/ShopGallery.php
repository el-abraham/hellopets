<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopGallery extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'shop_id',
        'slug',
        'path',
        'type'
    ];
}
