<template>
  <radial-progress-bar
    :diameter="timerDiameter"
    :total-steps="timerTotalSteps"
    :completed-steps="completedSteps"
    :stroke-width="5"
    :inner-stroke-width="2"
    inner-stroke-color="#888"
    start-color="#888"
    stop-color="#444"
    :is-clockwise="false"
  >
    <span class="timer-numbers">
      {{ actualTimer }}
    </span>
  </radial-progress-bar>
</template>

<script>
import moment from 'moment'
import alarm from '@/assets/alarm.mp3'
import RadialProgressBar from 'vue-radial-progress'

export default {
  components: {
    RadialProgressBar,
  },
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
      actualTimer: '',
      timerInterval: null,
      timerDiameter: 400,
    }
  },
  computed: {
    timerTotalSteps() {
      return this.transformTimeToNumber(this.timer)
    },
    completedSteps() {
      return this.transformTimeToNumber(this.actualTimer) - Math.abs(this.timerTotalSteps)
    },
  },
  mounted() {
    this.setTimerWidth()
    window.addEventListener('resize', this.setTimerWidth)
    this.setActualTimer(this.timer)
  },
  watch: {
    timer(value) {
      this.setActualTimer(value)
      if (this.isPlaying) {
        this.stopCountdownTimer()
        this.initCountdownTimer()
      }
    },
    isPlaying(playing) {
      if (playing) {
        this.initCountdownTimer()
      } else {
        this.stopCountdownTimer()
        this.changePageTitle('VueDoro')
      }
    },
    actualTimer(value, oldValue) {
      if (this.isPlaying) {
        this.changePageTitle(value)
      }
      if (oldValue === '00:01' && value === '00:00') {
        const LAST_SECOND = 1000
        setTimeout(() => {
          this.stopCountdownTimer()
          this.playAlarm()
          this.setTimeFinished()
        }, LAST_SECOND)
      }
    },
  },
  methods: {
    transformTimeToNumber(time) {
      return +time.replace(':', '')
    },
    setTimerWidth() {
      const { width } = window.screen
      if (width <= 450) {
        this.timerDiameter = 300
      }
      if (width < 350) {
        this.timerDiameter = 250
      }
      if (width > 450) {
        this.timerDiameter = 400
      }
    },
    changePageTitle(value) {
      document.title = value
    },
    setTimeFinished() {
      this.$emit('timeFinished')
    },
    playAlarm() {
      const audio = new Audio(alarm)
      audio.play()
    },
    setActualTimer(value) {
      this.actualTimer = value
    },
    stopCountdownTimer() {
      clearInterval(this.timerInterval)
    },
    subtractOneSecond() {
      const subtractedTime = moment(this.actualTimer, 'mm:ss')
        .subtract(1, 'seconds')
        .format('mm:ss')
      this.setActualTimer(subtractedTime)
    },
    initCountdownTimer() {
      const INTERVAL_TIME = 1000
      this.timerInterval = setInterval(() => {
        this.subtractOneSecond()
      }, INTERVAL_TIME)
    },
  },
}
</script>

<style lang="stylus" scoped>
.timer-numbers
  font-size 6rem
  @media screen and (max-width $mobile)
    font-size 4rem
</style>
