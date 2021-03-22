<div class="bg-gray-800 text-gray-100">
    <div class="max-w-6xl mx-auto pt-16">
        @foreach ($fAQs as $faq)
        <div class="mb-4 pb-4 border-b-4 border-gray-700">
            <h1 class="text-xl font-semibold text-gray-100">Q: {{ $faq['question'] }}</h1>
            <p class="mt-2 text-base text-gray-200">A: {{ $faq['answer'] }}</p>
        </div>
        @endforeach
    </div>
</div>