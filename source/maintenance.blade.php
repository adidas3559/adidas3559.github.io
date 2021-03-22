@extends('_layouts.master')

@section('body')

<!-- Maintenance page to be used as landing page when clients have not paid, add contents to master -->

<div class="w-full min-h-screen bg-right bg-cover bg-no-repeat flex items-start justify-start" style="background-image: url(/assets/img/right-login.svg);">
    <div class="bg-right bg-cover bg-no-repeat min-h-screen flex flex-col justify-between" style="background-image: url(&quot;/assets/img/left-login.svg&quot;); width: 45vw; min-width: 700px;">
        <img src="/assets/img/logoBind.svg" alt="Bind CMS" class="w-12 ml-16 my-8" />
        <p class="text-3xl sm:text-5xl ml-16 font-bold text-blue-900 w-2/4 leading-tight">Site Currently Unavailable</p>
        <p class="m-0 ml-16 mb-8">Contact the administrator for more details</p>
    </div>
    <div class="min-h-screen relative flex-1">
        <img src="/assets/img/orange-login.svg" class="bubble absolute -ml-64 mt-40">
        <img src="/assets/img/blue-login.svg" class="bubble absolute bottom-0 right-0 mr-64 mb-32"> <img src="/assets/img/purple-login.svg" class="bubble absolute top-0 right-0 -mt-24 -mr-16">
    </div>
</div>
    
@stop
