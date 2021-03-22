<?php

// @var $container \Illuminate\Container\Container
// @var $events \TightenCo\Jigsaw\Events\EventBus

/*
 * You can run custom code at different stages of the build process by
 * listening to the 'beforeBuild', 'afterCollections', and 'afterBuild' events.
 *
 * For example:
 *
 * $events->beforeBuild(function (Jigsaw $jigsaw) {
 *     // Your code here
 * });
 */
$events->afterCollections(function ($jigsaw) {
    $posts = $jigsaw->getCollection('posts');
    foreach ($posts as $post) {
        $content = $post->getContent();
        $clean = strip_tags($content);
        $clean = str_replace('&amp;quot;', '&quot;', $clean);
        $clean = html_entity_decode($clean);
        $post->cleanContent = $clean;
    }
});
//$events->afterCollections(App\Listeners\ParseHtml::class);
$events->afterBuild(App\Listeners\GenerateSitemap::class);
$events->afterBuild(App\Listeners\GenerateIndex::class);
