<template>
  <transition name="modal--fade">
    <div @click.self="close" class="modal__backdrop">
      <article
        class="modal__container"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header>
          <h1 class="modal__title">Adjustments</h1>
          <button @click="close" class="modal__close">
            <x-icon size="2x" />
          </button>
        </header>
        <main class="modal__content">
          <form @submit.prevent="setAdjustments">
            <div class="content__form">
              <div class="form__input">
                <label
                  for="focus"
                  class="input__label"
                >
                  Focus
                </label>
                <input
                  v-model="adjustments.focus"
                  v-mask="'##:##'"
                  id="focus"
                  class="input__field"
                />
              </div>
              <div class="form__input">
                <label
                  for="short-break"
                  class="input__label"
                >
                  Short break
                </label>
                <input
                  v-model="adjustments.shortBreak"
                  v-mask="'##:##'"
                  id="short-break"
                  class="input__field"
                />
              </div>
              <div class="form__input">
                <label
                  for="long-break"
                  class="input__label"
                >
                  Long break
                </label>
                <input
                  v-model="adjustments.longBreak"
                  v-mask="'##:##'"
                  id="long-break"
                  class="input__field"
                />
              </div>
              <div class="form__input">
                <label
                  for="rounds"
                  class="input__label"
                >
                  Rounds
                </label>
                <input
                  v-model="adjustments.rounds"
                  id="rounds"
                  class="input__field"
                  type="number"
                  min="0"
                />
              </div>
            </div>
            <div class="content__footer">
              <button
                type="submit"
                class="footer__confirm"
              >
                Confirm
              </button>
            </div>
          </form>
        </main>
      </article>
    </div>
  </transition>
</template>

<script>
import { XIcon } from 'vue-feather-icons'
import { mask } from 'vue-the-mask'
import timer from '@/enums/timer'

const {
  FOCUS,
  SHORT,
  LONG,
  ROUNDS,
} = timer

export default {
  components: {
    XIcon,
  },
  directives: { mask },
  data() {
    return {
      adjustments: {
        focus: FOCUS.TIME,
        shortBreak: SHORT.TIME,
        longBreak: LONG.TIME,
        rounds: ROUNDS,
      },
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    setAdjustments() {
      this.$emit('setAdjustments', this.adjustments)
      this.close()
    },
  },
}
</script>

<style lang="stylus" scoped>
.modal__backdrop
  position fixed
  z-index 9999
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(#fff, .5)
  display flex
  justify-content center
  align-items center

.modal__container
  border-radius $radius
  border 2px solid $border-color
  background-color #fff
  display flex
  flex-direction column
  justify-content space-between
  width 50rem
  padding 15px
  position relative
  @media screen and (max-width $mobile)
    width 95vw

.modal__title
  font-size 1.8rem
  text-align center
  font-weight 400

.modal__close
  position absolute
  top 1rem
  right @top
  background-color transparent
  cursor pointer
  hoverTransition()
  border-radius 100%
  padding-top .2rem

.content__form
  display grid
  justify-content space-around
  grid-template-rows repeat(2, 1fr)
  grid-template-columns repeat(2, 25%)
  row-gap 2rem
  column-gap 4rem
  margin 4rem 0
  @media screen and (max-width $mobile)
    grid-template-columns 90%
    grid-template-rows 10%
    margin 2rem 0

.form__input
  display flex
  flex-direction column
  justify-content center

.input__label
  text-align center
  font-size 1.4rem
  margin-bottom .3rem

.input__field
  width 100%
  border 1px solid $border-color
  border-radius $radius
  padding .3rem .5rem
  text-align center
  font-size 1.3rem
  outline none
  transition all linear .1s
  &:focus
    addShadow()
    transition @transition

.content__footer
  justifyCenter()

.footer__confirm
  background-color transparent
  font-size 1.5rem
  border 2px solid $border-color
  border-radius $radius
  hoverTransition()
  addShadow()
  padding .5rem 3rem
  cursor pointer

.modal--fade-enter, .modal--fade-leave-active
  opacity 0
  top -10px

.modal--fade-enter-active, .modal--fade-leave-active
  transition all .4s ease
</style>
