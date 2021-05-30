import { screen } from '@testing-library/vue'
import AppHeader from '@/components/AppHeader'
import render from '../render'

describe('AppHeader', () => {
  it('should render logo correctly', () => {
    render(AppHeader)
    expect(screen.getByText('VueDoro')).toBeVisible()
  })
})
