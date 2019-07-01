import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  wait,
  waitForElement,
} from '@testing-library/react'
import '@testing-library/react/cleanup-after-each'
import 'jest-dom/extend-expect'

global.React = React
global.render = render
global.cleanup = cleanup
global.fireEvent = fireEvent
global.waitForElement = waitForElement
global.wait = wait

// matchMedia not present, legacy browsers require a polyfill
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    }
  }
