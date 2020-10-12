<template>
  <div class="timer">
    <span class="timer__numbers">
      {{ actualTimer }}
    </span>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    timer: {
      type: String,
      required: true,
    },
    isPlaying: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      actualTimer: null,
      timerInterval: null,
    }
  },
  created() {
    this.actualTimer = this.timer
  },
  watch: {
    isPlaying(value) {
      if (value) {
        this.initCountdownTimer()
      } else {
        this.stopCountdownTimer()
      }
    },
  },
  methods: {
    setActualTimer(value) {
      this.actualTimer = value
    },
    stopCountdownTimer() {
      clearInterval(this.timerInterval)
    },
    subtractOneMinute() {
      const subtractedTime = moment(this.actualTimer, 'mm:ss')
        .subtract(1, 'seconds')
        .format('mm:ss')
      this.setActualTimer(subtractedTime)
    },
    initCountdownTimer() {
      const INTERVAL_TIME = 1000
      this.timerInterval = setInterval(() => {
        this.subtractOneMinute()
      }, INTERVAL_TIME)
    },
  },
}
</script>

<style lang="stylus" scoped>
timerSize(fontSize)
  width fontSize * 4
  height @width

.timer
  border 2px solid $border-color
  border-radius 100%
  justifyCenter()
  alignCenter()
  timerSize(6rem)
  @media screen and (max-width $mobile)
    timerSize(4rem)

.timer__numbers
  font-size 6rem
  @media screen and (max-width $mobile)
    font-size 4rem
</style>
