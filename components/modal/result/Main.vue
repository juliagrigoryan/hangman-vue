<template lang="pug">
  .modal
    .modal__close
      button.btn(type="button" @click='$emit("close")') &#10005;
    h2.modal__title {{ title }}
    p.modal__result Your game word was: {{ word }}
    .modal__actions
      button.btn.is-primary(@click='resetGame') Play again
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
      default: ''
    },
    word: {
      type: String,
      require: true,
      default: ''
    },
    action: {
      type: Function,
      default: () => null
    }
  },
  methods: {
    resetGame() {
      this.action()
      this.$emit('close')
    }
  }
}
</script>
