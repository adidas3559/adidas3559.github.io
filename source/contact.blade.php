@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="Contact {{ $page->siteName }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="Get in touch with {{ $page->siteName }}" />
@endpush

@section('body')
<div class="container mx-auto py-16">
<h1>Contact</h1>

<primitive-form form="deed7feb-0031-4f8e-b4d3-bd184c9cbc7d">
    <template v-slot:success>
        <!-- anything in this template will be shown once the form is submitted successfully -->
        <div
            class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4" role="alert">
            <p class="font-bold m-0">Form Sent!</p>
            <p class="text-sm m-0">Thank you.  We will be in touch.</p>
        </div>
    </template>
    <template v-slot:error>
        <!-- anything in this template will be shown oif there is an error sending the form-->
        <div
            class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 mb-4" role="alert">
            <p class="font-bold m-0">Uh oh!</p>
            <p class="text-sm m-0">There was an error sending your form.</p>
        </div>
    </template>
    <template v-slot:form>
        <div class="flex flex-wrap mb-6 -mx-3">
                <div class="w-full md:w-1/2 mb-6 md:mb-0 px-3">
                    <label class="block mb-2 text-gray-800 text-sm font-semibold" for="contact-name">
                        Name
                    </label>

                    <input
                        type="text"
                        id="contact-name"
                        placeholder="Jane Doe"
                        name="name"
                        class="block w-full border shadow rounded-lg outline-none mb-2 px-4 py-3"
                        required
                    >
                </div>

                <div class="w-full px-3 md:w-1/2">
                    <label class="block text-gray-800 text-sm font-semibold mb-2" for="contact-email">
                        Email Address
                    </label>

                    <input
                        type="email"
                        id="contact-email"
                        placeholder="email@domain.com"
                        name="email"
                        class="block w-full border shadow rounded-lg outline-none mb-2 px-4 py-3"
                        required
                    >
                </div>
            </div>

            <div class="w-full mb-12">
                <label class="block text-gray-800 text-sm font-semibold mb-2" for="contact-message">
                    Message
                </label>

                <textarea
                    id="contact-message"
                    rows="4"
                    name="message"
                    class="block w-full border shadow rounded-lg outline-none appearance-none mb-2 px-4 py-3"
                    placeholder="A lovely message here."
                    required
                ></textarea>
            </div>

            <div class="flex justify-end w-full">
                <input
                    type="submit"
                    value="Submit"
                    class="block bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold leading-snug tracking-wide uppercase shadow rounded-lg cursor-pointer px-6 py-3"
                >
            </div>
    </template>
</primitive-form>
</div>
@stop
