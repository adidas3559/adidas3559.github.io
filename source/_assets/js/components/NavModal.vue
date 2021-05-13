<template>
    <section>
        <div class="nav">
            <div class="nav__container">
                <div class="nav__left">
                    <h4>FORBES<span class="primaryColor">.</span></h4>
                </div>
                <div class="nav__right">
                    <button style="color: black;" @click="toggleNav" v-if="!activeSymbol">
                        <!-- <?xml version="1.0" encoding="iso-8859-1"?> -->
                        <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 384.97 384.97" style="enable-background:new 0 0 384.97 384.97;" xml:space="preserve">
                        <g>
                            <g id="Menu_1_">
                                <path d="M12.03,120.303h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03
                                    c-6.641,0-12.03,5.39-12.03,12.03C0,114.913,5.39,120.303,12.03,120.303z"/>
                                <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03
                                    S379.58,180.455,372.939,180.455z"/>
                                <path d="M372.939,264.667H132.333c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h240.606
                                    c6.641,0,12.03-5.39,12.03-12.03C384.97,270.056,379.58,264.667,372.939,264.667z"/>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                </svg>
                    </button>
                    <button style="color: white;" @click="toggleNav" v-if="activeSymbol">
                        <svg height="40px" viewBox="0 0 329.26933 329" width="40px" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
                    </button>
                </div>
            </div>
        </div>


        <transition name="slide-fade">
            <div class="navModal" v-if="activeNav">
                <div class="navModal__container">
                    <div class="navModal__links">
                        <a href="#about-me" @click="toggleNav">About Me</a>
                        <a href="#skills" @click="toggleNav">Skills</a>
                        <a href="#portfolio" @click="toggleNav">Portfolio</a>
                        <a href="#" @click="toggleNav">Resume</a>
                        <a target="_blank" href="https://github.com/adidas3559" @click="toggleNav">Github</a>
                        <a target="_blank" href="https://www.linkedin.com/in/stephen-forbes-58880a121/" @click="toggleNav">LinkedIn</a>
                        <a href="mailTo:forbes3559@gmail.com" @click="toggleNav">Contact Me</a>
                    </div>
                </div>
            </div>
        </transition>
    </section>
</template>

<script>
export default {
    data() {
        return {
            activeNav: false,
            activeSymbol: false,

        }
    },

    methods: {
        toggleNav() {
            this.activeNav = !this.activeNav;
            this.activeSymbol = !this.activeSymbol;
        },
    }
}
</script>



<style lang="scss">
 /* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>