<template>
  <transition
    name="alert-fade"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    :css="false"
  >
    <div
      :style="`top: ${top}`"
      class="alert-modal"
      v-show="showAlert"
    >
      <div class="alert-content">
        <slot />
      </div>

      <button
        class="close-button"
        @click="close"
      >
        닫기
      </button>
    </div>
  </transition>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'AlertModal',
  emits: [ 'close' ],
  props: {
    top: {
      type: [Number, String],
      default: '30vh'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (val) {
      this.showAlert = val
    }
  },
  methods: {
    beforeEnter (el) {
      anime({ ...this.defaultAnimation, targets: el, translateY: -60 });
    },
    enter (el) {
      anime({ ...this.defaultAnimation, targets: el, opacity: 1, translateY: -70 });
    },
    async leave (el, done) {
      anime({ ...this.defaultAnimation, targets: el, translateY: 10, duration: 3000, complete: () => done() })
    },
    close () {
      this.showAlert = false
      this.$emit('close')
    }
  },
  data () {
    return {
      defaultAnimation: {
        opacity: 0,
        translateY: -70,
        duration: 2000
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-modal {
  position: absolute;
  left: calc(50% - 45vw);
  background: #fff;
  width: 90vw;
  opacity: 0;
  z-index: 5;
  border-radius: 15px;
  box-shadow: 0px -0.5px 3px rgba(0, 0, 0, .2);
  overflow: hidden;

  .alert-content {
    padding: 20px;
    min-height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-button {
    background: $main-orange;
    height: 60px;
    display: block;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: white;
  }
}

</style>