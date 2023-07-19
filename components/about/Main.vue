<template lang="pug">
  button.btn.is-rounded(type="button" @click="showModal") &#8505;
</template>

<script>
import ModalMain from '../modal/Main'

export default {
  methods: {
    showModal() {
      this.$modal.show(ModalMain, {
        title: 'About'
      }, {
        height: 'auto',
        adaptive: true,
        width: 500,
        scrollable: true,
        pivotY: 0.50
      })
    }
  }
}
</script>
