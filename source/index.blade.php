@extends('_layouts.master')

@section('body')

    @include('_modules.hero')
    @include('_modules.skills')

    <div id="portfolio" class="portfolio">
        <div class="portfolio__container">
            <project image="/assets/img/projects/ksu1.PNG">
                <template v-slot:text>
                    <h4>KSU Rugby React.js + Node.js + MySQL</h4>
                    <p>
                        Full stack web app for Bottega Tech final project. Uses React.js for the Front end with extremely modular design.
                        Built a custom API that keeps track of the different players and follows CRUD. No authorization currently.
                        API connects to a very simple MySQL app I also made. All of these are deployed with Heroku.
                        <br>
                        <a target="_blank" href="https://spf-bottega-capstone-rugby.herokuapp.com/">Bottega Final Project</a>
                        <br>
                        <a target="_blank" href="https://github.com/adidas3559/spf-rugby-bottega-capstone">Github</a>
                    </p>
                    <ul>
                        <li>Practiced Building React.js App</li>
                        <li>Made node.js API and MySQL app for players</li>
                        <li>First solo designed site</li>
                        <li>Deployed using Heroku</li>
                    </ul>
                </template>
                <slideshow :images='["/assets/img/projects/ksu1.PNG",
                "/assets/img/projects/ksu4.PNG",
                "/assets/img/projects/ksu2.PNG",
                "/assets/img/projects/ksu3.PNG"]'>
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
        <!-- if you need to add more, add another container -->
    </div>


    <div id="contact-me">
        <contact></contact>
    </div>

    

@stop
