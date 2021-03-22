<template>
    <div>
        <slot name="success" v-if="success"></slot> 
        <slot name="error" v-if="error"></slot> 

        <form method="post" id="contact-form" ref="contactForm" @submit.prevent="send()">
            <input type="hidden" name="form" :value="form" />
            <input type="text" name="primitive_bot_check" style="position:absolute;opacity:0;z-index:-9;left:-9999px" />
            <slot name="form" v-if="!success && !loading"></slot>
            <div
                v-if="loading"
                class="primitive-loading">
                Sending...
            </div>
        </form>
    </div>
</template>

<script>

const ENDPOINT = `https://myprimitive.cloud/api/forms/store`
//const ENDPOINT = `http://myprimitive.cloud.test/api/forms/store`

export default {
    props: {
        form: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            fields: {},
            success: false,
            error: false,
            loading: false
        }
    },
    methods: {
        send() {

            this.loading = true
            this.success = false 
            this.error = false

            let form = this.$refs.contactForm
            let data = new FormData(form)
            let inputs = form.elements
            let fields = {}

            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type !== "hidden" && inputs[i].name !== "") {
                    if (inputs[i].type === "checkbox" || inputs[i].type === "radio") {
                        if(inputs[i].checked) {
                            fields[inputs[i].name] ? fields[inputs[i].name] += ',' + inputs[i].value : fields[inputs[i].name] = inputs[i].value
                        }
                    } else {
                        fields[inputs[i].name] = inputs[i].value
                    }
                }
            }

            data.append('fields', JSON.stringify(fields))

            axios.post(ENDPOINT, data)
                .then(response => {
                    this.success = true
                    this.loading = false
                })
                .catch(error => {
                    this.error = true
                    this.loading = false
                });

        }
    }
}
</script>