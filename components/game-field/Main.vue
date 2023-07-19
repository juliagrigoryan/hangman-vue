<template lang="pug">
  .game-field
    .game-field__dashboard
      p.game-field__text Category: {{ category }}
      p.game-field__text Tries left: {{ maxAttempts - count }}
      .game-field__hint
        button.btn.is-link(v-if="!hint" type="button" title="It will takes two tries" @click="getHint") Get a hint
        p.game-field__text(v-else) Hint: {{ hint }}
    .game-field__figure
      svg.game-field__svg(height='250' width='200' ref="svg")
        line.path(x1='20' y1='230' x2='100' y2='230' stroke-linecap="round")
        polyline.path(points='60,230 60,20 60,20 140,20 140,20 140,50')
        circle.path(cx='140' cy='70' r='20')
        line.path(x1='140' y1='90' x2='140' y2='150')
        polyline.path(points='140,120 120,100 140,120 160,100')
        polyline.path(points='140,150 120,180 140,150 160,180')
    .game-field__part
      p.game-field__word(ref="answer")
        span(v-for="item in word" ) _
      - const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      ul.game-field__list
        each letter in alphabet
          li.game-field__item
             button.btn.game-field__button(type="button" @click="guess")= letter
</template>

<script>
import service from '../../services/gameService'

export default {
  props: {
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      word: '',
      count: 0,
      maxAttempts: 6,
      hint: ''
    }
  },
  async mounted() {
    const words = await service.getWords(this.category)
    const randomIdx = Math.floor(Math.random() * words.length)
    this.word = words[randomIdx].word
    console.log(this.word)
  },
  methods: {
    guess() {
      const button = event.target
      const letter = button.textContent.toLowerCase()
      const answer = [...this.$refs.answer.childNodes]
      button.disabled = true

      if (this.count === this.maxAttempts) {
        return
      }

      if (this.word.includes(letter)) {
        [...this.word].forEach((el, index) => {
          if (el === letter) {
            answer[index].innerHTML = el
          }
        })
      } else {
        this.drawSvg()
        this.count++
      }
    },
    drawSvg() {
      const svg = [...this.$refs.svg.childNodes]

      for (let i = 0; i <= this.count; i++) {
        const path = svg[i]
        path.classList.add('animated')
      }
    },
    async getHint() {
      try {
        const result = await service.getHint(this.word)
        this.hint = result[0].meanings[0].definitions[0].definition
        this.count++
        this.drawSvg()
      } catch (error) {
        this.hint = 'Sorry pal, we couldn\'t find hint for this word.'
      }
    }
  }
}
</script>

<style lang="scss">
.game-field {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &__dashboard {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  &__part {
    width: 45%;
  }

  &__figure {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 45%;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    list-style: none;
  }

  &__button {
    width: 70px;
  }

  &__word {
    color: $color-1--1;
    font-size: 5rem;
    margin-bottom: 30px;
    text-align: center;

    span {
      padding: 0 3px;
    }
  }

  &__text {
    color: $color-white;
    font-size: 2rem;
    margin-right: 20px;
  }

  &__hint {
    margin-top: 10px;
    width: 100%;
  }

  &__svg {
    transform: scale(1.7);

    .path {
      fill: transparent;
      stroke: $color-white;
      stroke-width: 4px;
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
    }

    .animated {
      animation: dash 5s linear;
      animation-fill-mode: forwards;
    }
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
}
</style>
