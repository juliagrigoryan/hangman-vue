<template lang="pug">
  .category(v-if="categories.length")
    h2.category__title Choose a category:
    ul.category__list
      li.category__item(v-for="category in categories" :key="category")
        button.btn.category__button(type="button" @click="selectCategory(category)") {{ category }}
</template>

<script>
import service from '../../services/gameService'

export default {
  data() {
    return {
      categories: []
    }
  },
  async mounted() {
    this.categories = await service.getCategories()
  },
  methods: {
    selectCategory(category) {
      this.$emit('select-category', category)
    }
  }
}
</script>

<style lang="scss">
.category {
  margin: 0 auto;
  width: 500px;

  &__title {
    color: $color-white;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;

    @include media-max(767) {
      font-size: 2rem;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
  }

  &__button {
    width: 100%;
  }
}
</style>
