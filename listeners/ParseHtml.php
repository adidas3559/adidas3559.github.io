<?php

namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;

class ParseHtml
{
    public function handle(Jigsaw $jigsaw)
    {
        $data = collect($jigsaw->getCollection('posts')->map(function ($page) {
            $page->content = html_entity_decode($page->content);
        }));
    }
}
