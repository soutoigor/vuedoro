import { screen } from '@testing-library/vue'
import VueDoro from '@/components/VueDoro'
import timer from '@/enums/timer'
import render from '../render'

const {
  FOCUS,
  SHORT,
  LONG,
  ROUNDS,
} = timer

describe('VueDoro', () => {
  it('should ', () => {
    render(VueDoro)
    expect(screen.getByText(FOCUS.LABEL)).toBeVisible()
  })
})
