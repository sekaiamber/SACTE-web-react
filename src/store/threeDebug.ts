import { useEffect, useState } from 'react'
import { useControls } from 'leva'
import { createContainer } from './unstatedNextPro'

interface useSystemStates {
  debug: boolean
}

export interface useSystemProps {
  debug: boolean
  setDebug: (debug: boolean) => void
  useDebugNumber: (
    group: string,
    name: string,
    value: number,
    min?: number,
    max?: number,
    step?: number
  ) => number
  useDebugColor: (group: string, name: string, value: string) => string
  useDebugBoolean: (group: string, name: string, value: boolean) => boolean
}

const defaultStates: useSystemStates = {
  debug: window.location.hash === '#debug',
}

function useThreeArgs(): useSystemProps {
  const [debug, setDebug] = useState(defaultStates.debug)

  const useDebugNumber = (
    group: string,
    name: string,
    value: number,
    min?: number,
    max?: number,
    step?: number
  ): number => {
    const payload =
      max ?? min
        ? {
            value,
            min,
            max,
            step,
          }
        : value
    const resp = useControls(group, {
      [name]: payload,
    })
    return resp[name]
  }

  const useDebugColor = (
    group: string,
    name: string,
    value: string
  ): string => {
    const resp = useControls(group, {
      [name]: value,
    })
    return resp[name]
  }

  const useDebugBoolean = (
    group: string,
    name: string,
    value: boolean
  ): boolean => {
    const resp = useControls(group, {
      [name]: value,
    })
    return resp[name]
  }

  useEffect(() => {
    const trigger = (e: KeyboardEvent): void => {
      // Shift + O 切换debug模式
      if (e.shiftKey && e.code === 'KeyO') {
        setDebug(!debug)
      }
    }
    document.addEventListener('keydown', trigger)

    return () => {
      document.removeEventListener('keydown', trigger)
    }
  }, [setDebug, debug])

  return {
    debug,
    setDebug,
    useDebugNumber,
    useDebugColor,
    useDebugBoolean,
  }
}

const ThreeArgs = createContainer(useThreeArgs)

export default ThreeArgs
