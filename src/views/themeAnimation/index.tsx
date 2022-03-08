import React, { useEffect, useRef } from 'react'
import { Leva } from 'leva'
import ThreeDebug from '../../store/threeDebug'
import Sysrem from '../../store/system'
import App, { AppOptions } from './app'
import { mountainDistortion } from './app/distortions'
import useDebugState from './debugState'

// const Loader: React.FC = () => {
//   const { progress } = useProgress()
//   return (
//     <Html center>
//       <span style={{ color: '#000' }}>{progress} % loaded</span>
//     </Html>
//   )
// }

const defaultOptions: AppOptions = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  // mountainDistortion || LongRaceDistortion || xyDistortion || turbulentDistortion || turbulentDistortionStill || deepDistortionStill || deepDistortion
  distortion: mountainDistortion,

  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,

  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,

  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 50,

  // Percentage of the lane's width
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,

  /** * These ones have to be arrays of [min,max].  ***/
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],

  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],

  /** **  Anything below can be either a number or an array of [min,max] ****/

  // Length of the lights. Best to be less than total length
  carLightsLength: [400 * 0.05, 400 * 0.15],
  // Radius of the tubes
  carLightsRadius: [0.05, 0.14],
  // Width is percentage of a lane. Numbers from 0 to 1
  carWidthPercentage: [0.3, 0.5],
  // How drunk the driver is.
  // carWidthPercentage's max + carShiftX's max -> Cannot go over 1.
  // Or cars start going into other lanes
  carShiftX: [-0.2, 0.2],
  // Self Explanatory
  carFloorSeparation: [0.05, 1],

  colors: {
    roadColor: '#080808',
    islandColor: '#0a0a0a',
    background: '#000000',
    shoulderLines: '#131318',
    brokenLines: '#010c06',
    leftCars: ['#ff102a', '#eb383e', '#ff102a'],
    rightCars: ['#dadafa', '#bebae3', '#8f97e4'],
    sticks: '#dadafa',
  },
}

const ThemeAnimation: React.FC = () => {
  const debugState = ThreeDebug.useContainer()
  const { currentPage } = Sysrem.useContainer()

  const { debug } = debugState

  const canvas = useRef<HTMLCanvasElement>(null)
  const app = useRef<App | null>(null)

  useDebugState(app, defaultOptions)

  useEffect(() => {
    const container = document.getElementById('root')
    if (container) {
      app.current = new App(container, defaultOptions)
      ;(window as any).app = app.current
      app.current
        .loadAssets()
        .then(app.current.init)
        .catch(() => app.current?.dispose())
    }
  }, [canvas.current])

  useEffect(() => {
    const { animeState } = currentPage
    if (app.current) {
      app.current.flatRoad(animeState.flatRoad)
      app.current.cameraAutoLookAt(
        animeState.camera.autoLookAt,
        animeState.camera.lookAtQuaternion
      )
      app.current.moveCameraPosition(animeState.camera.position)
    }
  }, [currentPage])

  return (
    <>
      <Leva hidden={!debug} oneLineLabels />
    </>
  )
}

export default ThemeAnimation
