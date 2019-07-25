<template>
    <body>
    <Login v-if='!isLoggedIn'></Login>
    <div v-else id="app">
        <header>
            <svg version="1.1" class="aura" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 237.436 119.988" enable-background="new 0 0 237.436 119.988" xml:space="preserve" preserveAspectRatio="xMinYMin meet"><path fill="#2774AE" d="M44.27,54.991c-0.011,0.013-0.022,0.026-0.033,0.039c28.068-11.335,56.663-21.368,85.704-29.896
                        C166.096,14.517,204.297,5.994,237.436,0H103.492C81.323,16.445,61.633,34.86,44.27,54.991z"></path><path fill="#2774AE" d="M44.237,55.03c-0.013,0.005-0.027,0.011-0.04,0.016c-9.148,3.695-18.241,7.527-27.275,11.492
                        C11.471,68.931,5.759,71.274,0,73.695v46.294c6.98-13.504,15.079-27.081,25.101-40.846C31.134,70.856,37.519,62.821,44.237,55.03z"></path><path fill="#48A9C5" d="M44.197,55.046c0.002-0.001,0.004-0.003,0.005-0.004c0.023-0.018,0.045-0.034,0.068-0.051
                        C61.635,34.859,81.329,16.444,103.502,0H85.466c-13.625,3.47-27.28,6.879-40.687,10.989C29.551,15.657,14.547,21.272,0,27.878
                        v45.817c5.759-2.42,11.471-4.763,16.922-7.156C25.955,62.573,35.048,58.741,44.197,55.046z"></path><path fill="#B3D57D" d="M85.466,0H0v27.878c14.547-6.606,29.551-12.221,44.779-16.889C58.186,6.879,71.841,3.47,85.466,0z"></path></svg>
            <!--<img id="alaska" src="../public/logo-alaska.png" alt="alaska-logo">-->
            <router-link to= "/"><svg version="1.1" class="alaska" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="113px" height="34px" viewBox="0 0 114.7 34.1" enable-background="new 0 0 114.7 34.1" xml:space="preserve"><g><g><path class="st2" d="M55.2,1.3L42.4,22.9c-1.3,2.2-2.1,4.5-2.3,6.6h-5c0.3-2.7,1.4-5.3,3.6-9l9-15.1c1.8-3,3.6-4.1,6.8-4.1H55.2z"></path><path class="st2" d="M54.2,24c-0.9,0.9-2.8,2.2-4.3,2.2c-1.1,0-1.1-1-0.4-2.4c2.7-5.2,5.6-7.9,9.1-7.9h0.6L54.2,24z M59,12.9 c-6.5,0-10.5,3.8-14.1,12.1c-0.9,2.1-1.4,4.7,1.6,4.6c1.7,0,4.6-1,6.6-2.4C53,28,52.9,29,52.9,29.5h4.6c0.2-1.8,0.8-4,2.3-6.7 l5.7-9.5C63.4,13.1,61.2,12.9,59,12.9z"></path><path class="st2" d="M101.2,24c-0.9,0.9-2.8,2.2-4.3,2.2c-1.1,0-1.1-1-0.4-2.4c2.7-5.2,5.6-7.9,9.1-7.9h0.6L101.2,24z M106,12.9 c-6.5,0-10.5,3.8-14.1,12.1c-0.9,2.1-1.4,4.7,1.6,4.6c1.7,0,4.6-1,6.6-2.4c-0.2,0.7-0.3,1.6-0.2,2.2h4.6c0.2-1.8,0.8-4,2.3-6.7 l5.7-9.5C110.4,13.1,108.2,12.9,106,12.9z"></path><path class="st2" d="M91.1,34.1h-1.5c-1.9,0-3.6-1.3-4.2-3.2l-2.3-8.6l-4.2,7.1H74l13.6-23c1.8-3,3.6-4.1,6.8-4.1H95l-9,15.3 l6.8-4.7h5.4l-11.4,7.9l0,0L91.1,34.1z"></path><path class="st2" d="M46.2,0c-4.6,0-7,1.2-11.5,4.5l-15.2,11H9.8c-2.8,0-5.1,0.1-6.9,1.8l-2.5,2.3c0,0,7.3-0.3,14.2-0.5L0,29.5 h6.3l14.9-10.8c2.9-0.1,4.9-0.2,4.9-0.2c3.5-0.1,5.4-3.1,5.4-3.1h-5.7l12.1-8.7l-8.9,14.5c-1.9,3.3-2.8,5.7-3.2,8.3h5.2 c0.2-2.2,0.9-4.4,2.3-6.6L45.4,2.5C46.3,1.1,47,0,47,0L46.2,0z"></path><path class="st2" d="M70.5,17.6c-0.1,0.4,0.1,0.7,1,1.3l1.4,0.9c1.5,1,2.1,2.5,1.9,3.7c-0.5,3.4-3,6.2-8.3,6.2 c-2.3,0-3.4-0.1-6.2-0.5l2.1-3.5c1.9,0.3,3,0.5,4.5,0.5c2,0,2.8-0.9,2.9-1.6c0.1-0.4-0.1-0.9-1.1-1.6l-1.1-0.8 c-1.8-1.3-2.2-2.3-2-3.8c0.4-3,3.9-5.3,8.8-5.3c1.5,0,3.2,0.1,5,0.3l-1.9,3.3c-1.2-0.1-3.1-0.2-4.5-0.1 C71.5,16.4,70.6,16.9,70.5,17.6z"></path></g><path class="st2" d="M112.1,24.6c1.4,0,2.6,1.2,2.6,2.6c0,1.4-1.1,2.6-2.6,2.6c-1.4,0-2.5-1.2-2.5-2.6 C109.6,25.8,110.7,24.6,112.1,24.6z M112.1,29.3c1.1,0,2-0.9,2-2.1c0-1.2-0.9-2.1-2-2.1s-2,0.9-2,2.1 C110.1,28.4,111,29.3,112.1,29.3z M111.8,28.6h-0.5v-2.8h1c0.5,0,1,0.4,1,0.9c0,0.4-0.3,0.7-0.6,0.8l0.6,1.1h-0.6l-0.6-1h-0.2 V28.6z M112.2,27.1c0.3,0,0.5-0.2,0.5-0.4c0-0.3-0.2-0.4-0.5-0.4h-0.4v0.8H112.2z"></path></g></svg></router-link>
            <router-link to="/">List Events</router-link>
            <router-link to="/create">Create Event</router-link>
        </header>
        <div id="user">
        </div>
        <div id='content'>
            <router-view/>
        </div>
    </div>
    </body>
</template>

<script>

import Login from '@/components/login.vue'

export default {
    name: 'App',
    components: {
        Login
    },
    computed: {
        isLoggedIn() {
           return this.$store.state.basicToken ? true : false;
        }
    }
}

</script>

<style lang="scss">

@import 'normalize-scss';
@include normalize();
body {
    background: #007bff;
    background: linear-gradient(to right, #33AEFF,  #0062E6);
    background-size: 100%;
}
#app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    margin-top:50px;
    // #user {
    //     text-align: left;
    //     position: fixed;
    //     color: #000;
    //     width: 100%;
    //     height: 20px;
    //     line-height:15px;
    //     font-weight: 700;
    //     text-decoration: none;
    //     padding-left: 1em;
    //     padding-bottom: 2em;
    // }
    &>header {
        background-color: #00385F;
        position: fixed;
        top:0;
        text-align: right;
        width: 100%;
        height: 50px;
        line-height:50px;
        color:#fff;
        svg.aura {
            height: 50px;
            left: 0;
            position: absolute;
            top: 0;
            width: 135px;
        }
        svg.alaska {
            position: absolute;
            left: 0;
            padding-left: 50px;
            height: 52px;
            top: 0;
            filter: invert(100%);
        }
        a {
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;
            padding: 0 1em;
            color: #FFF;
            &.router-link-exact-active {
                color: #BBB;
            }
        }
    }
}

</style>
