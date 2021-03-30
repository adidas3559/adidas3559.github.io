<template>
    
    <div class="project__item">
        <div class="projectImage" @mouseover="hover = true" @mouseleave="hover = false" @click="toggleModal">
            <div class="projectImage__container" v-bind:style="{ backgroundImage: 'url(' + image + ')' }" :class="{ hoverActive: hover}">
                
            </div>
            <div v-show="hover" class="imageText">
                <h4>Click for Info</h4>
            </div>
        </div>

        <div class="project" v-show="isActive">
            <div class="project__container">
                <div class="projectModal">
                    <div class="closeButton">
                        <button @click="toggleModal">x</button>
                    </div>
                    <div class="projectModal__container">
                        <div class="projectModal__left-column">
                            <div class="projectText">
                                <slot name="text"></slot>
                            </div>
                        </div>
                        <div class="projectModal__right-column">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        image: {},
    },

    data() {
        return {
            isActive: false,
            hover: false,
        };
    },

    methods: {
        toggleModal() {
            this.isActive = !this.isActive;
        },
    },
};
</script>