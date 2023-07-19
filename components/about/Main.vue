<template lang="pug">
  button.btn.is-rounded(type="button" @click="showModal") &#8505;
</template>

<script>
import ModalAboutMain from '../modal/about/Main'

export default {
  methods: {
    showModal() {
      this.$modal.show(ModalAboutMain, {}, {
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
