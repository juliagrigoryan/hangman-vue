<template lang="pug">
  .game-field
    .game-field__dashboard
      DashboardMain(
        :category="category"
        :word="word"
        :attempts="leftAttempts"
        :isFinished="isFinished"
        @get-hint="getHint")
    .game-field__figure
      svg.game-field__svg(height='250' width='200' ref="svg")
        line.path(x1='20' y1='230' x2='100' y2='230' stroke-linecap="round")
        polyline.path(points='60,230 60,20 60,20 140,20 140,20 140,50')
        circle.path(cx='140' cy='70' r='20')
        line.path(x1='140' y1='90' x2='140' y2='150')
        polyline.path(points='140,120 120,100 140,120 160,100')
        polyline.path(points='140,150 120,180 140,150 160,180')
    .game-field__block
      p.game-field__word(ref="answer")
        span(v-for="item in word" ) _
      - const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      ul.game-field__list
        each letter in alphabet
          li.game-field__item
             button.btn.game-field__button(type="button" @click="guess" :disabled="isFinished")= letter
</template>

<script>
import service from '../../services/gameService'
import ModalResultMain from '../modal/result/Main'

export default {
  props: {
    category: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      default: () => null
    }
  },
  data() {
    return {
      word: '',
      count: 0,
      maxAttempts: 6,
      isFinished: false
    }
  },
  computed: {
    leftAttempts() {
      return this.maxAttempts - this.count
    }
  },
  async mounted() {
    const words = await service.getWords(this.category)
    const randomIdx = Math.floor(Math.random() * words.length)
    this.word = words[randomIdx].word
  },
  methods: {
    guess() {
      const button = event.target
      const letter = button.textContent.toLowerCase()
      const answer = [...this.$refs.answer.childNodes]
      button.disabled = true

      if (this.word.includes(letter)) {
        [...this.word].forEach((el, index) => {
          if (el === letter) {
            answer[index].innerHTML = el
          }
        })
      } else {
        this.count++
        this.drawSvg()
      }

      this.checkState()
    },
    drawSvg() {
      const svg = [...this.$refs.svg.childNodes]

      for (let i = 0; i < this.count; i++) {
        const path = svg[i]
        path.classList.add('animated')
      }
    },
    getHint() {
      this.count += 2
      this.drawSvg()
    },
    checkState() {
      if (this.count === this.maxAttempts) {
        this.isFinished = true
        this.showModal('Thanks for playing! Please try again.')
      }

      if (!this.$refs.answer.textContent.includes('_')) {
        this.isFinished = true
        this.showModal('Congratulations! You did it!')
      }
    },
    showModal(title) {
      this.$modal.show(ModalResultMain, {
        title,
        word: this.word,
        action: this.action
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

<style lang="scss">
.game-field {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &__dashboard {
    width: 100%;
  }

  &__block {
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
}
</style>
