<style lang="scss" type="text/scss" >

    .flash__mask{
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: block;
        -webkit-transition: opacity .3s ease;
        transition: opacity .3s ease;
    }

    .flash__container{
        z-index: 9999;
        position: fixed;
        //bottom: 45px;
        //left: 20px;
        max-width: 460px;
        min-width: 335px;

        .alert{
            margin-bottom: 10px;
            min-width: 200px;
            min-height: 100px;
            background-color: #030303;
            color: #FFFFFF;
            opacity:0.9;

            p.message{
                min-height: 33px;
            }

            .buttons__wrapper{
                text-align: left;
            }


            &.alert-inline{
                min-height: 62px;
            }

            &.alert-success{
                background-color: #51a351;
            }

            &.alert-info{
                background-color: #2f96b4;
            }

            &.alert-warning{
                background-color: #f89406;
            }

            &.alert-danger{
                background-color: #bd362f;
            }

            .btn-danger{
                margin-left: 5px;
            }

        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0
        }
    }

</style>


<template>
  <div :class="[ flashMask ? 'flash__mask':'']">
    <div
      :style="position"
      class="flash__container">
      <message
        v-for="(message,index) in messages"
        :messages="messages"
        :message="message"
        :index="index"
        :key="message.message_key"/>
    </div>
  </div>
</template>


<script>

import message from './FlashMessage.vue';

const PLACEMENTS = {
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right'
};

const GLOBAL_NAME = 'global';

export default {

  name: 'Flash',

    components: {
        message
    },

    props: {
        text: {},
        placement: { default: PLACEMENTS.BOTTOM_LEFT },
        name: { default: GLOBAL_NAME }
    },

    data() {
        return {
            messages: [],
            message_key: 0
        };
    },

    computed: {
        flashMask() {
            let isMask = false;

          this.messages.forEach((v) => {
                if(v.mask) {
                    isMask = true;

                    return false;
                }
            });

            return isMask;
        },

        position() {
            const horizental =
                this.placement === PLACEMENTS.TOP_LEFT || this.placement === PLACEMENTS.TOP_RIGHT ? 'top' : 'bottom';

            const vertical =
                this.placement === PLACEMENTS.TOP_LEFT || this.placement === PLACEMENTS.BOTTOM_LEFT ? 'left' : 'right';

            return {
                [horizental]: '45px',
                [vertical]: '20px'
            };
        }
    },

    mounted() {
        this.$nextTick(function () {
            this.handleMessage(this.text);
            this.handleEvents();
        });
    },

    methods: {

        handleEvents() {
            const self = this;

            window.flash = function (message, confirmed = null, canceled = null) {
                if(confirmed || canceled) {
                    if(typeof message === 'string') message = { text: message };

                    message.confirmed = confirmed;
                    message.canceled = canceled;
                }

                self.$bus.$emit('flash', message);
            };

            this.$bus.$on('flash', (message) => {
                self.handleMessage(message);
            });
        },

        handleMessage(message) {
            if(!message) return;

            if(typeof message === 'string') message = { text: message };

            if(this.name !== (message.name || GLOBAL_NAME)) return;

            return this.messages.push(this.handleObject(message));
        },

        handleObject(message) {
            return {...this.defaultOptions(), ...message};
        },

        defaultOptions() {
            return {
                title: '',
                text: '',
                timeout: 6000,
                type: 'success',
                inline: false,
                close: false,
                confirm: false,
                cancel: false,
                mask: false,
                html: false,
                confirmed() {},
                canceled() {},
                message_key: this.generateMessageKey()
            };
        },

        generateMessageKey() {
            return this.message_key = this.message_key + 1;
        }
    }
};

</script>
