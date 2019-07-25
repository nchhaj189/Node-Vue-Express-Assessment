<template>
        <div>
            <div id='login'>
                <h1>Please Login</h1>
                <p v-if='loginError.length' class='error'>{{ loginError }}</p>
                <form>
                    <label>
                        <input type='text' v-model='credentials.username' placeholder="Username"/>
                    </label>
                    <label>
                        <input type='text' v-model='credentials.password' placeholder="Password"/>
                    </label>
                    <button v-on:click.prevent='login'>Login</button>
                </form>
            </div>
            <Spinner v-if="working"></Spinner>
        </div>
</template>

<script>

import Spinner from "@/components/spinner";

export default {
    name: 'Login',
    data: () => {
        return {
            credentials: {},
            loginError: '',
            working: false
        }
    },
    components: {
      Spinner
    },
    methods: {
        login: function( evt ) {
            if( this.credentials.username && this.credentials.password ) {
                const bearerToken = btoa( `${this.credentials.username}:${this.credentials.password}` );
                this.working = true;
                this.$store.dispatch( 'checkBasicToken', bearerToken ).then( ( resp ) => {
                    this.working = false;
                    this.$store.commit( 'submitBasicToken', bearerToken );
                }).catch( ( err ) => {
                    this.working = false;
                    this.loginError = 'Invalid credentials.';
                });
            } else {
                this.loginError = 'Please enter username and password.';
            }
        }
    }
}
</script>

<style lang='scss'>
    template {
        background: #007bff;
        background: linear-gradient(to right, #0062E6, #33AEFF);
        background-size: 100%;
    }
        #login {
            font-family: 'Roboto', sans-serif;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate( -50%, -65% );
            background-color: #00385F;
            border-radius:.5em;
            padding: 1em;
            max-width: 20em;
            -webkit-box-shadow: 0px 0px 60px -10px rgba(0,0,0,0.15);
            -moz-box-shadow: 0px 0px 60px -10px rgba(0,0,0,0.15);
            box-shadow: 0px 0px 60px -10px rgba(0,0,0,0.15);
            text-align: center;
            color: #FFF;
            p.error {
                color: #C00;
            }
            label {
                display: block;
                margin: 1em 0;
            }
            input {
                border: 1px solid #CCC;
                margin-bottom: .5em;
                border: 1;
                border-radius: 0.5em;
            }
        }
</style>
