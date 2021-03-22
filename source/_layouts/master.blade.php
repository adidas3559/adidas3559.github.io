<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="description" content="{{ $page->meta_description ?? $page->siteDescription }}">

        <meta property="og:title" content="{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{ $page->getUrl() }}"/>
        <meta property="og:description" content="{{ $page->siteDescription }}" />

        <title>{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}</title>

        <link rel="canonical" href="{{ $page->getUrl() }}">
        <link rel="home" href="{{ $page->baseUrl }}">
        <link rel="icon" href="/favicon.ico">

        @stack('meta')



        <script type="application/ld+json"> 
            {!! $page->siteJsonLd !!}
        </script>
        <!-- Production: {{ $page->production }} -->
        @if ($page->production)
            {!! html_entity_decode($page->siteAnalytics) !!}
        @endif

        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,300i,400,400i,700,700i,800,800i" rel="stylesheet">
        <link rel="stylesheet" href="{{ mix('css/main.css', 'assets/build') }}">
    </head>

    <body>
        <div id="app" class="flex flex-col justify-between min-h-screen bg-gray-100 text-gray-800 leading-normal font-sans overflow-hidden">
            <header class="flex items-center shadow bg-white border-b h-24 py-4 z-10" role="banner">
                <div class="container flex items-center max-w-8xl mx-auto px-4 lg:px-8">
                    <div class="flex items-center">
                        <a href="/" title="{{ $page->siteName }} home" class="inline-flex items-center">
                            <img class="h-8 md:h-10 mr-3" src="/assets/img/logo.svg" alt="{{ $page->siteName }} logo" />

                            <h1 class="text-lg md:text-2xl text-blue-800 font-semibold hover:text-blue-600 my-0">{{ $page->siteName }}</h1>
                        </a>
                    </div>
                    
                    <div class="flex flex-1 justify-end items-center">
                        
                        @include('_nav.menu')
                        <search></search>
                        @include('_nav.menu-toggle')
                    </div>
                </div>
            </header>

            @include('_nav.menu-responsive')

            <main role="main" class="flex-auto w-full">
                @yield('body')
            </main>

            <footer class="bg-white text-center text-sm mt-12 py-4" role="contentinfo">
                <ul class="flex flex-col md:flex-row justify-center">
                    <li class="md:mr-2">
                        <a href="https://primitivesocial.com" title="Primitive">Crafted with Care by Primitive</a>.
                    </li>
                </ul>
            </footer>
        </div>

        <script src="{{ mix('js/main.js', 'assets/build') }}"></script>

        @stack('scripts')
    </body>
</html>
