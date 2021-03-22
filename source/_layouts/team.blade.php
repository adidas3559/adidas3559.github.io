@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="{{ $page->title }}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="{{ $page->description }}" />
@endpush

@section('body')
<div class="container mx-auto py-16">
    @if ($page->cover_image)
        <img src="{{ $page->cover_image }}" alt="{{ $page->title }} cover image" class="mb-2">
    @endif

    <div class="w-full md:w-1/4 rounded overflow-hidden shadow-lg mr-0 md:mr-8">
        <img class="w-full" src="{{ $page->photo }}" alt="{{ $page->name }} ">
        <div class="px-6 py-4">
            <div class="font-bold text-xl">{{ $page->name }}</div>
            <p class="text-gray-700 text-base m-0">
                {{ $page->title }}
            </p>
        </div>
    </div>


</div>
@endsection
