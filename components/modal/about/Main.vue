<template lang="pug">
  .modal
    .modal__close
      button.btn(type="button" @click='$emit("close")') &#10005;
    h2.modal__title About
    .modal__content
      p Hangman is a simple word guessing game. Player try to figure out an unknown word by guessing letters. If too many letters which do not appear in the word are guessed, the player is hanged (and loses).
      p Can you guess the hidden word before the poor stick figure meets its doom?
    .modal__actions
      button.btn.is-primary(@click='$emit("close")') Let's play
</template>
