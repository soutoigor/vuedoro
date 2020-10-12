<template>
  <div class="page page--focus">
    <app-header />
    <main class="page__main">
      <h2>Focus time</h2>
      <vue-doro-timer :timer="focus" :isPlaying="isPlaying" />
      <span>{{ actualRound }}/{{ rounds }} rounds</span>
      <div>
        <button>adjusts</button>
        <button>play</button>
        <button>next</button>
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import VueDoroTimer from '@/components/VueDoroTimer'

export default {
  components: {
    AppHeader,
    VueDoroTimer,
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
