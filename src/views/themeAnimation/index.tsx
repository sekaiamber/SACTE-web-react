import React, { useEffect, useRef } from 'react'
import { Leva } from 'leva'
import ThreeDebug from '../../store/threeDebug'
import Sysrem, { PageColor } from '../../store/system'
import App, { AppOptions } from './app'
import { mountainDistortion } from './app/distortions'
import useDebugState from './debugState'
// import lerpColor from './lerpColor'
import './style.scss'

// const Loader: React.FC = () => {
//   const { progress } = useProgress()
//   return (
//     <Html center>
//       <span style={{ color: '#000' }}>{progress} % loaded</span>
//     </Html>
//   )
// }

const defaultOptions: AppOptions = {
  id: 'backgroundAnime',
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
    background: '#0e0f14',
    roadColor: '#1c1c1d',
    islandColor: '#0a0a0a',
    shoulderLines: '#131318',
    brokenLines: '#47484e',
    leftCars: ['#ff102a', '#eb383e', '#ff102a'],
    rightCars: ['#dadafa', '#bebae3', '#8f97e4'],
    sticks: '#dadafa',
  },
  // colors: {
  //   background: '#0e0f14',
  //   roadColor: '#1c1c1d',
  //   islandColor: '#0a0a0a',
  //   shoulderLines: '#275f3c',
  //   brokenLines: '#275f3c',
  //   leftCars: ['#12db5b', '#12db5b', '#12db5b'],
  //   rightCars: ['#12db5b', '#12db5b', '#12db5b'],
  //   sticks: '#275f3c',
  // },
}

let app: App

function lerpColorGroup(
  app: App,
  prevPageColor: PageColor,
  currentPageColor: PageColor
): void {
  // background
  // roadColor
  // islandColor
  // shoulderLines
  // brokenLines
  // leftCars
  // prevPageColor.leftCars.forEach((c1, i) => {
  //   const c2 = currentPageColor.leftCars[i]
  //   lerpColor(c1, c2, 1000, (c) => {
  //     app.attributeSetter.setRoadColor
  //   })
  // })
  // rightCars
  // sticks
}

const ThemeAnimation: React.FC = () => {
  const debugState = ThreeDebug.useContainer()
  const { prevPage, currentPage } = Sysrem.useContainer()

  const { debug } = debugState

  const canvas = useRef<HTMLCanvasElement>(null)

  useDebugState(app, defaultOptions)

  useEffect(() => {
    const container = document.getElementById('root')
    const $canvas = document.getElementById(defaultOptions.id)
    if (container && !$canvas) {
      app = new App(container, defaultOptions)
      ;(window as any).app = app
      app
        .loadAssets()
        .then(app.init)
        .catch(() => app.dispose())
    }
  }, [canvas])

  useEffect(() => {
    if (app && prevPage !== currentPage) {
      const { animeShow } = currentPage
      // if (animeState) {
      //   app.flatRoad(animeState.flatRoad)
      //   app.cameraAutoLookAt(
      //     animeState.camera.autoLookAt,
      //     animeState.camera.lookAtQuaternion
      //   )
      //   app.moveCameraPosition(animeState.camera.position)
      // }
      if (prevPage) {
        if (currentPage.animeColor && prevPage.animeColor) {
          lerpColorGroup(app, prevPage.animeColor, currentPage.animeColor)
        }
      }
      app.visible(animeShow)
    }
  }, [currentPage, prevPage])

  return (
    <>
      <Leva hidden={!debug} oneLineLabels />
    </>
  )
}

export default ThemeAnimation
