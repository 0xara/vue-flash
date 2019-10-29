<template>
  <transition name="fade">
    <div
      :class="[ 'alert-'+message.type , message.inline ? 'alert-inline' : '', 'row']"
      class="alert">
      <a
        v-if="isCloseBtn"
        :class="inlineClass"
        href="#"
        class="close"
        data-dismiss="alert"
        aria-label="close"
        style="position: absolute; left: 0;"
        @click="destroyMessage">&times;</a>
      <h4
        v-if="message.title && !message.inline"
        class="title"
        v-html="message.title"></h4>
      <p
        v-if="message.text && !message.inline"
        class="message"
        v-html="message.text"></p>
      <span
        v-if="(message.title || message.text) && message.inline"
        :class="[
          confirmBtn || cancelBtn ? 'col-md-8' : 'col-md-12',
          confirmBtn || cancelBtn ? 'col-sm-8' : 'col-md-12',
          confirmBtn || cancelBtn ? 'col-xs-8' : 'col-md-12']">
        <strong
          class="title inline"
          v-html="message.title"></strong>
        <span
          class="message inline"
          v-html="message.text"></span>
      </span>
      <p
        v-if="confirmBtn || cancelBtn"
        :class="{ 'col-md-4': !!message.inline,
                  'col-sm-4': !!message.inline,
                  'col-xs-4': !!message.inline }"
        class="buttons__wrapper">
        <button
          v-if="cancelBtn"
          type="button"
          class="btn btn-danger btn-sm"
          @click.prevent.stop="canceled"
          v-text="cancelBtn"></button>
        <button
          v-if="confirmBtn"
          type="button"
          class="btn btn-sm btn-success"
          @click.prevent.stop="confirmed"
          v-text="confirmBtn"></button>
      </p>
    </div>
  </transition>
</template>


<script>

export default{

    props: ['messages', 'message', 'index'],

    computed: {
        isCloseBtn() {
            return !(!this.message.close || this.message.confirm || this.message.cancel);
        },

        confirmBtn() {
            if(!this.message.confirm) return '';

            if(typeof this.message.confirm === 'string') return this.message.confirm;

            return 'OK';
        },

        cancelBtn() {
            if(!this.message.cancel) return '';

            if(typeof this.message.cancel === 'string') return this.message.cancel;

            return 'Cancel';
        },

        inlineClass() {
            return {
                'inline-block': !!this.message.inline
            };
        }
    },

    mounted() {
        this.$nextTick(function () {
            this.handleMessage();
        });
    },

    methods: {
        handleMessage() {
            if(!this.message.confirm) this.handleTimeout();
        },

        handleTimeout() {
            if(!this.message.timeout) return;

            const self = this;

            setTimeout(() => {
                self.destroyMessage();
            }, this.message.timeout);
        },

        destroyMessage() {
            // let index = this.messages.indexOf(this.message);
            this.messages.splice(this.index, 1);
        },

        confirmed() {
            if(this.message.confirmed) this.message.confirmed();

            this.destroyMessage();
        },

        canceled() {
            if(this.message.canceled) this.message.canceled();

            this.destroyMessage();
        }

    }

};

</script>
