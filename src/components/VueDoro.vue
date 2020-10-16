<template>
  <div :class="`page ${actualStepClass}`">
    <app-header />
    <main class="page__main">
      <h2 class="main__step-title">{{ actualStep.title }}</h2>
      <vue-doro-timer
        :timer="actualStep.time"
        :isPlaying="isPlaying"
        @timeFinished="setNextStep"
      />
      <span class="main__rounds">
        {{ actualRound }}/{{ rounds }} rounds
      </span>
      <vue-doro-actions
        @setAdjustments="setSteps"
        @toggleIsPlaying="setIsPlaying"
        @skipStep="setNextStep"
      />
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import VueDoroTimer from '@/components/VueDoroTimer'
import VueDoroActions from '@/components/VueDoroActions'
import timer from '@/enums/timer'

const {
  FOCUS,
  SHORT,
  LONG,
  ROUNDS,
} = timer

export default {
  components: {
    AppHeader,
    VueDoroTimer,
    VueDoroActions,
  },
  data() {
    return {
      actualRound: 1,
      rounds: ROUNDS,
      isPlaying: false,
      actualStep: null,
      steps: {
        focus: {
          time: FOCUS.TIME,
          title: FOCUS.LABEL,
        },
        shortBreak: {
          time: SHORT.TIME,
          title: SHORT.LABEL,
        },
        longBreak: {
          time: LONG.TIME,
          title: LONG.LABEL,
        },
      },
    }
  },
  created() {
    this.setActualStep(this.steps.focus)
  },
  computed: {
    actualStepClass() {
      if (!this.actualStep) return ''
      const step = {
        [FOCUS.LABEL]: 'focus',
        [SHORT.LABEL]: 'short',
        [LONG.LABEL]: 'long',
      }
      return `page--${step[this.actualStep.title]}`
    },
  },
  methods: {
    setNextStep() {
      const { title } = this.actualStep
      if (title === LONG.LABEL) {
        this.setActualRound(1)
        this.setActualStep(this.steps.focus)
      } else if (title === FOCUS.LABEL && this.actualRound === this.rounds) {
        this.setActualStep(this.steps.longBreak)
      } else if (title === FOCUS.LABEL && this.actualRound !== this.rounds) {
        this.setActualStep(this.steps.shortBreak)
      } else if (title === SHORT.LABEL && this.actualRound !== this.rounds) {
        this.setActualStep(this.steps.focus)
        this.setActualRound(this.actualRound + 1)
      }
    },
    setIsPlaying(value) {
      this.isPlaying = value
    },
    setActualStep(step) {
      this.actualStep = step
    },
    setActualRound(value) {
      this.actualRound = value
    },
    setSteps(steps) {
      Object.entries(steps).forEach(([key, value]) => {
        if (key === 'rounds') {
          this.rounds = +value
        } else {
          this.steps[key].time = value
        }
        this.setActualRound(1)
        this.setActualStep(this.steps.focus)
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
  pageStatusGradient(endColor)
    initial = #FFFFFF
    background linear-gradient(180deg, initial -8%, rgba(initial, 0) 100%), endColor

  .page
    display grid
    grid-row-gap .9rem
    grid-template-rows 6rem 1fr
    height 100vh
    padding 0 1.3rem

  .page--focus
    pageStatusGradient($cosmos)

  .page--short
    pageStatusGradient($pattens-blue)

  .page--long
    pageStatusGradient($tana)

  .page__main
    display grid
    grid-row-gap 2rem
    grid-template-rows 4rem 50% 3rem 6rem
    justify-items center
    align-items center
    @media screen and (max-width $mobile)
      grid-row-gap 0.5rem
      grid-template-rows 12% 50% 15% 20%

.main__step-title
  font-size 2.1rem
  font-weight 400
  @media screen and (max-width $mobile)
    font-size 1.7rem

.main__rounds
  letter-spacing .1rem

</style>
