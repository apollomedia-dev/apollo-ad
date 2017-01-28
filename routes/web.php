<?php

use \Illuminate\Http\Response;

use \App\Ad;
use \App\Event;

$app->get('/ad', function () use ($app) {
    $publisherId = $app->request->get('publisher');

    // Select a random ad
    $ad = Ad::orderByRaw('RAND()')->first();

    if ($ad) {
        if (Event::create(['type' => 'impression', 'publisher_id' => $publisherId, 'ad_id' => $ad->id])) {
          return $ad;
        }
    }

    return new Response([], 500);
});

$app->get('/click', function () use ($app) {
    $adId = $app->request->get('ad');
    $publisherId = $app->request->get('publisher');

    // Select a random ad
    $ad = Ad::find($adId);

    if ($ad) {
        if (Event::create(['type' => 'click', 'publisher_id' => $publisherId, 'ad_id' => $ad->id])) {
            return redirect($ad->url);
        }
    }

    return new Response([], 500);
});
