window.axios = require('axios');
window.fuse = require('fuse.js');
window.Vue = require('vue');

// Lazyload
import LazyLoad from "vanilla-lazyload";

import Search from './components/Search.vue';
import PrimitiveForm from './components/PrimitiveForm.vue';

const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
});

new Vue({
    components: {
        Search,
        PrimitiveForm
    },
}).$mount('#app');

