<template lang="pug">
  main.main
    .main__container
      h1.main__title Hangman
      template(v-if="!selectedCategory")
        CategoryMain(@select-category="selectCategory")
        .main__about
          AboutMain
      template(v-else)
        GameFieldMain(:category="selectedCategory")
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: ''
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category
    }
  }
}

</script>

<style lang="scss">
.main {
  &__container {
    margin: 0 auto;
    max-width: 1280px;
    padding: 50px;

    @include media-max(767) {
      padding: 50px 20px;
    }
  }

  &__title {
    color: $color-1--1;
    font-size: 7rem;
    font-weight: 700;
    margin-bottom: 50px;
    text-align: center;

    @include media-max(767) {
      font-size: 6rem;
    }
  }

  &__about {
    @include absolute(null, null, 50px, 50px);
  }
}
</style>
