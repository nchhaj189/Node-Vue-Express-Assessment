<template>
    <div class='event'>
        <dl>
            <dt class='event__title'>Name:</dt><dd>{{ thisEvent.name || 'n/a' }}</dd>
            <dt class='event__date'>Date:</dt><dd>{{ jsDate.toLocaleDateString() || 'n/a' }}</dd>
            <dt class='event__date--time'>Time:</dt><dd>{{ jsDate.toLocaleTimeString() || 'n/a' }}</dd>
            <dt class='event__date--duration'>Duration:</dt><dd>{{ thisEvent.duration || 'n/a' }} Minutes</dd>
        </dl>
        <p v-if="thisEvent.brief">{{ thisEvent.brief }}</p>
        <div>
            <button v-on:click.prevent="deleteEvent" >Delete Event</button>
            <button v-on:click.prevent="modifyEvent" >Modify Event</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Event',
    props: {
        thisEvent: Object
    },
    data: () => {
        return {
            jsDate: new Date()
        }
    },
    methods: {
        deleteEvent: function( evt ) {
            evt.preventDefault();
            this.$store.dispatch( 'deleteEvent', this.thisEvent)
            .then( res => {
              this.$store.dispatch( 'getList' );
            }).catch( ( err, body ) => {
              this.$toasted.show( 'Error Deleting Event', { position: 'top-left', theme: 'bubble', type: 'error' } ).goAway( 2000 );
            });
        },
        modifyEvent: function( evt ) {
            evt.preventDefault();
            this.$router.push({ name: 'modify', params: { thisEvent: this.thisEvent }})
        }
    },
    created: function() {
        this.jsDate = new Date( Date.parse( this.thisEvent.dateTime ) )
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.event {
    flex-basis:20em;
    flex-shrink: 0;
    align-self: flex-start;
    margin:1em;
    padding:10px;
    color: white;
    //background-color: #43B892;
    background-image: url('../../public/event-background.jpg');
    background-size: fill;
    border-radius: 28px 14px;
    -webkit-box-shadow: 0px 0px 60px -13px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 60px -13px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 60px -13px rgba(0,0,0,0.25);
    text-align: left;
    dt {
        font-weight:bold;
    }
    dt, dd {
        float:left;
        padding:.5em .25em 0 0;
        margin:0;
    }
    p, dt, div {
        clear:left;
    }
    p {
        display: block;
        padding: 1em 0 0;
        margin: 0;
    }
    &__title{
        &, &+dd {
            font-size: 1.25em;
        }
    }
    // button {
    //     border-radius: 50px;
    // }
    button {
        margin:1em .5em 0 0;
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #c74444), color-stop(1, #bf2a2a));
        background:-moz-linear-gradient(top, #c74444 5%, #bf2a2a 100%);
        background:-webkit-linear-gradient(top, #c74444 5%, #bf2a2a 100%);
        background:-o-linear-gradient(top, #c74444 5%, #bf2a2a 100%);
        background:-ms-linear-gradient(top, #c74444 5%, #bf2a2a 100%);
        background:linear-gradient(to bottom, #c74444 5%, #bf2a2a 100%);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#c74444', endColorstr='#bf2a2a',GradientType=0);
        background-color:#c74444;
        -moz-border-radius:28px;
        -webkit-border-radius:28px;
        border-radius:28px;
        border:1px solid #ab1818;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-size:.75em;
        font-weight:bold;
        font-family:'Open Sans', sans-serif;
        padding:10px 20px;
        text-decoration:none;
        //text-shadow:0px 1px 0px #2f6627;
    }
    button:hover {
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #bf2a2a), color-stop(1, #c74444));
        background:-moz-linear-gradient(top, #bf2a2a 5%, #c74444 100%);
        background:-webkit-linear-gradient(top, #bf2a2a 5%, #c74444 100%);
        background:-o-linear-gradient(top, #bf2a2a 5%, #c74444 100%);
        background:-ms-linear-gradient(top, #bf2a2a 5%, #c74444 100%);
        background:linear-gradient(to bottom, #bf2a2a 5%, #c74444 100%);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#bf2a2a', endColorstr='#c74444',GradientType=0);
        background-color:#bf2a2a;
    }
    button:active {
        position:relative;
        top:1px;
    }
}
</style>
