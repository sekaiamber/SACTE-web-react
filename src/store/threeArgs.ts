import { useState } from 'react'
import { createContainer } from './unstatedNextPro'

interface useSystemStates {
  debug: boolean
}

export interface useSystemProps {
  debug: boolean
  setDebug: (debug: boolean) => void
}

const defaultStates: useSystemStates = {
  debug: window.location.hash === '#debug',
}

function useThreeArgs(): useSystemProps {
  const [debug, setDebug] = useState(defaultStates.debug)

  return {
    debug,
    setDebug,
  }
}

const ThreeArgs = createContainer(useThreeArgs)

export default ThreeArgs
