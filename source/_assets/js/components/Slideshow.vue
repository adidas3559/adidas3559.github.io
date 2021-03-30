<template>
    <div class="slideshow-container">
        <transition-group name="fade" tag="div">
            <div style="position: relative" v-for="i in [currentIndex]" :key="i">
                <img :src="currentImg" />
                <div class="slideshowButtons">
                    <a class="prev" @click="prevBtn" href="#">&#10094; Previous</a>
                    <a class="next" @click="nextBtn" href="#">Next &#10095;</a>
                </div>
                
            </div>
        </transition-group>
        
    </div>
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            timer: null,
            currentIndex: 0
        };
    },

    mounted: function() {
        // this.startSlide();
    },

    methods: {
        startSlide: function() {
            this.timer = setInterval(this.next, 3000);
        },

        stopSlide: function() {
            clearInterval(this.timer);
        },

        next: function() {
            this.currentIndex += 1;
            // this.stopSlide();
        },

        prev: function() {
            this.currentIndex -= 1;
            // this.stopSlide();
        },

        nextBtn: function() {
            this.currentIndex += 1;
            this.stopSlide();
        },

        prevBtn: function() {
            this.currentIndex -= 1;
            this.stopSlide();
        },
    },
    
    computed: {
        currentImg: function() {
            return this.images[Math.abs(this.currentIndex) % this.images.length];
        }
    }
};
</script>