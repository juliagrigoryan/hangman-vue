<template lang="pug">
  .modal
    .modal__close
      button.btn(type="button" @click='$emit("close")') &#10005;
    h2.modal__title {{ title }}
    .modal__content
      p Hangman is a simple word guessing game. Player try to figure out an unknown word by guessing letters. If too many letters which do not appear in the word are guessed, the player is hanged (and loses).
      p Can you guess the hidden word before the poor stick figure meets its doom?
    //p.modal__result You answered {{ score }} out of 5 questions.
    .modal__actions
      //button.modal__button(@click='resetQuiz') Play again
      button.btn.is-primary(@click='$emit("close")') Let's play
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
      default: ''
    },
    score: {
      type: Number,
      require: true,
      default: 0
    },
    action: {
      type: Function,
      default: () => null
    }
  },
  methods: {
    resetQuiz() {
      // this.action()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal {
  padding: 40px 30px 30px;
  text-align: center;

  &__title {
    color: $color-green;
    font-size: 2.5rem;
    margin-bottom: 25px;
  }

  &__result {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  &__content {
    margin-bottom: 25px;

    p {
      font-size: 1.6rem;
      line-height: 1.4;
      margin-bottom: 10px;
    }
  }

  &__close {
    @include absolute(10px, 10px);

    .btn {
      border: 0;
      padding: 0.2em 0.45em;
    }
  }
}
</style>
