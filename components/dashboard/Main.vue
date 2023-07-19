<template lang="pug">
  .dashboard
    p.dashboard__text Category: {{ category }}
    p.dashboard__text Tries left: {{ attempts }}
    .dashboard__hint
      button.btn.is-link(
        type="button"
        v-if="!hint"
        title="It will takes two tries"
        :disabled="attempts < 3 || isFinished"
        @click="getHint") Get a hint
      p.dashboard__text(v-else) Hint: {{ hint }}
</template>

<script>
import service from '../../services/gameService'

export default {
  props: {
    category: {
      type: String,
      required: true
    },
    word: {
      type: String,
      required: true
    },
    attempts: {
      type: Number,
      required: true
    },
    isFinished: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      hint: ''
    }
  },
  methods: {
    async getHint() {
      try {
        const result = await service.getHint(this.word)
        this.hint = result[0].meanings[0].definitions[0].definition
        this.$emit('get-hint')
      } catch (error) {
        this.hint = 'Sorry pal, there is no hint for this word.'
      }
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__text {
    color: $color-white;
    font-size: 2rem;
    margin-right: 20px;
  }

  &__hint {
    margin-top: 10px;
    width: 100%;

    .btn {
      &:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
}
</style>
