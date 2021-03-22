@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="{{ $page->title }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="{{ $page->description }}" />
@endpush

@section('body')
<div class="container mx-auto py-16">
    @foreach ($page->team($team) as $person)
        <img class="w-full" src="{{ $person->photo }}" alt="{{ $person->name }} ">
        <div class="px-6 py-4">
            <div class="font-bold text-xl">{{ $person->name }}</div>
            <p class="text-gray-700 text-base m-0">
                {{ $person->title }}
            </p>
        </div>

        @if (! $loop->last)
            <hr class="w-full border-b mt-2 mb-6">
        @endif
    @endforeach

</div>
@stop
