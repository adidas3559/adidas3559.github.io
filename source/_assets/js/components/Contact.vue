<template>
    <div class="contact">
        <div class="contact__container">
            <div class="contact__left-column">
                <div class="left-column-text">
                    <h2>Contact Me :)</h2>
                    <p>Feel free to reach me through email or social media:</p>
                    <div class="left-column-social">
                        <a href="mailto:forbes3559@gmail.com">forbes3559@gmail.com</a>
                        <a href="https://www.linkedin.com/in/stephen-forbes-58880a121/">LinkedIn</a>
                        <a href="https://www.facebook.com/stephen.forbes.10297">facebook</a>
                    </div>
                </div>
            </div>

            <div class="contact__right-column">
                <form class="needs-validation contactForm" @submit.prevent="onSubmit" method="post">
                    <div class="contactForm__field">
                        <label for="name">Name</label>
                        <input type="text" name="name" v-model="fields.name" required/>
                    </div>
                    <div class="contactForm__field">
                        <label for="email">Email</label>
                        <input type="text" name="email" v-model="fields.email" required/>
                    </div>
                    <div class="contactForm__field">
                        <label for="message">Message</label>
                        <!-- <input type="text" label="Your message" v-model="fields.message" required/> -->
                        <textarea name="message" v-model="fields.message" required></textarea>
                    </div>
                    <div class="contactForm__field">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

// Regular expression from W3C HTML5.2 input specification:
// https://www.w3.org/TR/html/sec-forms.html#email-state-typeemail
// var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const querystring = require("querystring");

export default {
    data() {
        return {
            sent: false,
            fields: {
                name: "",
                email: "",
                message: "",
            }
        };
    },

    methods: {
        onSubmit(e) {
          e.preventDefault();
          this.axios
             .post(
                 "/mail.php",
                  querystring.stringify(this.fields),
             )
             .then(res => {
                 this.sent = true;
                 console.log('posted');
             });
        },
    }
}
</script>

<style lang="scss">
@import "../../sass/variables.scss";

.contact {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    &__container {
        width: 80%;
        max-width: 1200px;
        display: flex;
        height: 50%;
        flex-direction: column;

        @media screen and (min-width: 764px) {
            flex-direction: row;
        }
    }

    &__left-column {
        flex: 50%;
        // background-color: $primaryColor;
        display: flex;
        align-items: center;
        // justify-content: center;
        flex-direction: column;

        .left-column-text {
            text-align: center;
            padding-top: 20px;
        }

        .left-column-social {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
    }

    &__right-column {
        flex: 50%;
        // background-color: #007790;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .contactForm {
            width: 100%;

            label {
                display: block;
                width: 100%;
            }

            input {
                background-color: #f3efef;
                width: 100%;
                padding: 12px 15px;

                &:focus {
                    outline: none;
                    border: none;
                }
            }

            textarea {
                height: 100px;
                background-color: #f3efef;
                width: 100%;
                padding: 12px 15px;

                &:focus {
                    outline: none;
                    border: none;
                }
                
            }

            &__field {
                padding-bottom: 25px;
                width: 100%;
            }
        }
    }
}
</style>
