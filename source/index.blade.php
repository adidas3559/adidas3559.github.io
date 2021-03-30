@extends('_layouts.master')

@section('body')

    @include('_modules.hero')
    @include('_modules.skills')

    <div id="portfolio" class="portfolio">
        <div class="portfolio__container">
            <project image="/assets/img/witcher2.jpg">
                <template v-slot:text>
                    <h4>Project 1</h4>
                    <p>
                        Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm,
                        Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm,Lorem ipsiumm, Lorem ipsiumm,
                        Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm,
                    </p>
                    <ul>
                        <li>Lorem ipsiumm,</li>
                        <li>Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm,</li>
                        <li>Lorem ipsiumm,</li>
                    </ul>
                </template>
                <slideshow :images='["https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
                "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
                "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg",
                "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg"]'>
                </slideshow>
            </project>
            <project image="/assets/img/witcher2.jpg">
                <template v-slot:text>
                    <h4>Project 2</h4>
                    <p>
                        Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm,
                        Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm,Lorem ipsiumm, Lorem ipsiumm,
                        Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm,
                    </p>
                    <ul>
                        <li>Lorem ipsiumm,</li>
                        <li>Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm, Lorem ipsiumm,</li>
                        <li>Lorem ipsiumm,</li>
                    </ul>
                </template>
                <slideshow :images='["https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
                    "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
                    "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg",
                    "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg"]'>
                </slideshow>
            </project>
        </div>
    </div>


    <div id="contact-me">
        <contact></contact>
    </div>

    

@stop
