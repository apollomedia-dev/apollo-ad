<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model {
    protected $fillable = [
      'type',
      'ad_id',
      'publisher_id'
    ];

    public function setUpdatedAt($value) {

    }
}
