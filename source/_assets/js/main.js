window.axios = require('axios');
window.fuse = require('fuse.js');
window.Vue = require('vue');

// Lazyload
import LazyLoad from "vanilla-lazyload";

import Search from './components/Search.vue';
import PrimitiveForm from './components/PrimitiveForm.vue';
import NavModal from "./components/NavModal.vue";
import Project from "./components/Project.vue";
import Contact from "./components/Contact.vue";
import Slideshow from "./components/Slideshow.vue";

const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
});

new Vue({
    el: '#app',

    components: {
        Search,
        PrimitiveForm,
        NavModal,
        Project,
        Contact,
        Slideshow,
    },

    data: {
        
    },

    methods: {
        
    }

}).$mount('#app');




const sections = document.querySelectorAll('.skills, .icon-list, .about, .tiles, .parallax-content, .processTab, .map-graphic__map');
        window.onscroll = function () {
            // Don't run the rest of the code if every section is already visible
            if (!document.querySelectorAll('.skills:not(.active), .icon-list:not(.active), .about:not(.active), .tiles:not(.active), .parallax-content:not(.active), .processTab:not(.active), .map-graphic__map:not(.active)')) return;
            // Run this code for every section in sections
            for (const section of sections) {
                if (section.getBoundingClientRect().top <= window.innerHeight * 0.75 && section.getBoundingClientRect().top > 0) {
                    section.classList.add('active');
                }
            }
        };

