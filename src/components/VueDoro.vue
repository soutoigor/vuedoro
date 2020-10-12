<template>
  <div class="page page--focus">
    <app-header />
    <main class="page__main">
      <h2 style="font-size: 1.8rem">Focus time</h2>
      <vue-doro-timer :timer="focus" :isPlaying="isPlaying" />
      <span>{{ actualRound }}/{{ rounds }} rounds</span>
      <vue-doro-actions @toggleIsPlaying="toggleIsPlaying" />
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import VueDoroTimer from '@/components/VueDoroTimer'
import VueDoroActions from '@/components/VueDoroActions'

export default {
  components: {
    AppHeader,
    VueDoroTimer,
    VueDoroActions,
  },
  data() {
    return {
      actualRound: 1,
      rounds: 4,
      focus: '25:00',
      shortBreak: '05:00',
      longBreak: '15:00',
      isPlaying: false,
    }
  },
  methods: {
    toggleIsPlaying(value) {
      this.isPlaying = value
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

  .page__main
    display grid
    grid-row-gap 2rem
    grid-template-rows 4rem 50% 3rem 6rem
    justify-items center
    align-items center

</style>
