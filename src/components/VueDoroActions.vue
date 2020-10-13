<template>
  <div class="actions">
    <button class="actions__button">
      <sliders-icon />
    </button>
    <button
      class="actions__button--toggle"
      @click="toggleIsPlaying"
    >
      <transition-group name="toggle-buttons">
        <pause-icon
          v-if="isPlaying"
          key="pause"
        />
        <play-icon
          v-else
          key="play"
        />
      </transition-group>
    </button>
    <button
      class="actions__button"
      @click="skipStep"
    >
      <skip-forward-icon />
    </button>
  </div>
</template>

<script>
import {
  PlayIcon,
  PauseIcon,
  SkipForwardIcon,
  SlidersIcon,
} from 'vue-feather-icons'

export default {
  components: {
    SlidersIcon,
    PlayIcon,
    PauseIcon,
    SkipForwardIcon,
  },
  data() {
    return {
      isPlaying: false,
    }
  },
  methods: {
    skipStep() {
      this.$emit('skipStep')
    },
    toggleIsPlaying() {
      this.isPlaying = !this.isPlaying
      this.$emit('toggleIsPlaying', this.isPlaying)
    },
  },
}
</script>

<style lang="stylus" scoped>
.actions
  display flex
  justify-content space-evenly
  width 40%
  @media screen and (max-width $mobile)
    width 100%

.actions__button
  background-color transparent
  border none
  cursor pointer
  border-radius 100%
  width 4rem
  height @width
  justifyContent()
  alignContent()
  padding-top .4rem
  hoverTransition()

.actions__button--toggle
  @extends .actions__button
  border 2px solid $border-color
  box-shadow 0 1px 3px rgba(#000.12), 0 1px 2px rgba(#000.24)

.toggle-buttons-enter-active
  transition all .2s linear

.toggle-buttons-enter, .toggle-buttons-leave-to
  transform translateY(5px)
  opacity 0

</style>
