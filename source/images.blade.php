@extends('_layouts.master')

@section('body')
<div class="w-full pt-24" style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <div class="max-w-4xl flex flex-col items-center justify-center mx-auto">
        <img class="mb-16" src="{{ $page->pages->imageTest->image->image }}" />

        <img class="mb-16" srcset="{{ $page->pages->imageTest->image->image }}&w=400&dpr=1 1x,
          {{ $page->pages->imageTest->image->image }}&w=400&dpr=2 2x,
          {{ $page->pages->imageTest->image->image }}&w=400&dpr=3 3x"
             src="{{ $page->pages->imageTest->image->image }}&w=400"
        >

        <img class="mb-16" src="{{ $page->pages->imageTest->image->image }}&w=220&h=220&fit=crop&crop=faces" />

        <img class="mb-16" src="{{ $page->pages->imageTest->image->image }}&fit=crop&w=300&max-h=300" />

        <img class="mb-16" src="{{ $page->pages->imageTest->image->image }}&mask=https://assets.imgix.net/gearbox/hexagon.png&w=500&h=500" />

        <img class="mb-16" src="{{ $page->pages->imageTest->image->image }}&high=-100" />
    </div>
</div>

@stop