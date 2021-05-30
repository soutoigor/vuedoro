import { render as r } from '@testing-library/vue'
import '@testing-library/jest-dom'

const render = (Component, configs = {}, callbacks = null) => r(
  Component,
  {
    ...configs,
  },
  callbacks,
)

export default render
