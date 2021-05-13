@extends('_layouts.master')

@section('body')

    @include('_modules.hero')
    @include('_modules.skills')

    <div id="portfolio" class="portfolio py-16 lg:py-32 bg-grey">
        <h3 class="text-center">
            Portfolio
        </h3>

        <div class="portfolio__container">
            <project image="/assets/img/projects/ksu1.PNG">
                <template v-slot:text>
                    <h4>KSU Rugby React.js + Node.js + MySQL</h4>
                    <p>
                        Full stack web app for Bottega Tech final project. Uses React.js for the Front end with extremely modular design.
                        Built a custom API that keeps track of the different players and follows CRUD. No authorization currently.
                        API connects to a very simple MySQL app I also made. All of these are deployed with Heroku. 
                        The site and "players" section take time to load due to the apps being asleep. Created January 2020.
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
            <project image="/assets/img/projects/sorting2.png">
                <template v-slot:text>
                    <h4>Sorting Visualizer</h4>
                    <p>
                        Classic Sorting Algorithm Visualizer. Created to practice sorting algorithms and js/css skills. 
                        Mobile responsive, currently has 3 algorithms to visualize. 
                        Had main view/ui react file, js files for the logic and a helper file for the visuals.
                        Used react.js as framework and Netlify to deploy. Created May 2021.
                        <br>
                        <a target="_blank" href="https://spf-sorting-visualizer.netlify.app/">Soritng Visualizer</a>
                        <br>
                        <a target="_blank" href="https://github.com/adidas3559/Sorting-Visualizer">Github</a>
                    </p>
                    <ul>
                        <li>Practiced Sorting Algorithms</li>
                        <li>Used JavaScript and css for visuals</li>
                        <li>Deployed using Netlify</li>
                    </ul>
                </template>
                <slideshow :images='["/assets/img/projects/sorting1.png",
                    "/assets/img/projects/sorting2.png",
                    "/assets/img/projects/sorting3.png",
                    "/assets/img/projects/sorting4.png"]'>
                </slideshow>
            </project>
            <project image="/assets/img/projects/ambucs1.png">
                <template v-slot:text>
                    <h4>Monterey AMBUCS</h4>
                    <p>
                        First professional website I've done from scratch. Emphasis on responsive behavior.
                        Vue.js/Laravel php site, backend using company's in-house CMS.
                        Design created by team designers, I implemented their design according to the project manager's timeline.
                        Has functioning blog system with filters using company's CMS.
                        Not fully released, going through final edits/company filling out blogs.
                        Created May 2021.
                        <br>
                        <a target="_blank" href="https://dev-montereyambucs.myprimitive.cloud/">Dev Site</a>
                    </p>
                    <ul>
                        <li>Vue.js/Laravel</li>
                        <li>Compay's in-house CMS</li>
                        <li>Worked Remotely with team of Designers/Project Managers</li>
                    </ul>
                </template>
                <slideshow :images='["/assets/img/projects/ambucs1.png",
                    "/assets/img/projects/ambucs2.png",
                    "/assets/img/projects/ambucs3.png"]'>
                </slideshow>
            </project>
        </div>
        <!-- if you need to add more, add another container -->
    </div>


    <!-- <div id="contact-me">
        <contact></contact>
    </div> -->

    

@stop
