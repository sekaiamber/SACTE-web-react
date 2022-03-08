import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import App, { AppOptions } from './app'
import ThreeDebug from '../../store/threeDebug'

export default function useDebugState(
  app: React.MutableRefObject<App | null>,
  initOptions: AppOptions
): void {
  const debugState = ThreeDebug.useContainer()

  const { useDebugColor, useDebugNumber, useDebugBoolean } = debugState

  // colors

  const backgroundColor = useDebugColor('colors', 'background', '#000000')
  useEffect(() => {
    if (app.current) {
      app.current.attributeSetter.setBackgroundColor(backgroundColor)
    }
  }, [backgroundColor])

  const roadColor = useDebugColor(
    'colors',
    'road',
    initOptions.colors.roadColor as string
  )
  useEffect(() => {
    if (app.current) {
      app.current.attributeSetter.setRoadColor(roadColor)
    }
  }, [roadColor])

  const islandColor = useDebugColor(
    'colors',
    'island',
    initOptions.colors.islandColor as string
  )
  useEffect(() => {
    if (app.current) {
      app.current.attributeSetter.setIslandColor(islandColor)
    }
  }, [islandColor])

  // const shoulderLinesColor = useDebugColor(
  //   'colors',
  //   'shoulder lines',
  //   initOptions.colors.shoulderLines as string
  // )
  // useEffect(() => {
  //   if (app.current) {
  //     app.current.attributeSetter.setShoulderLinesColor(shoulderLinesColor)
  //   }
  // }, [shoulderLinesColor])

  const brokenLines = useDebugColor(
    'colors',
    'broken lines',
    initOptions.colors.shoulderLines as string
  )
  useEffect(() => {
    if (app.current) {
      app.current.attributeSetter.setBrokenLines(brokenLines)
    }
  }, [brokenLines])

  // env

  const gridHelperVisible = useDebugBoolean('env', 'grid helper', false)
  const helper = useMemo(() => {
    const ret = new THREE.GridHelper(100, 100, '#ff0000', '#dddddd')
    ret.visible = false
    return ret
  }, [])
  useEffect(() => {
    if (app.current) {
      app.current.scene.add(helper)
    }
  }, [app.current])
  useEffect(() => {
    helper.visible = gridHelperVisible
  }, [gridHelperVisible])

  const cameraX = useDebugNumber('env/camera', 'position x', 0, -30, 30, 1)
  const cameraY = useDebugNumber('env/camera', 'position y', 8, -30, 30, 1)
  const cameraZ = useDebugNumber('env/camera', 'position z', -5, -30, 30, 1)
  useEffect(() => {
    if (app.current) {
      app.current.camera.position.setX(cameraX)
      app.current.camera.position.setY(cameraY)
      app.current.camera.position.setZ(cameraZ)
    }
  }, [cameraX, cameraY, cameraZ])

  const autoLookAt = useDebugBoolean('env/camera', 'auto look at', true)
  useEffect(() => {
    if (app.current) {
      app.current.cameraAutoLookAt(autoLookAt)
    }
  }, [autoLookAt])

  const cameraRX = useDebugNumber('env/camera', 'look x', 0, -0.5, 0.5, 0.001)
  const cameraRY = useDebugNumber('env/camera', 'look y', 0, -0.5, 0.5, 0.001)
  const cameraRZ = useDebugNumber('env/camera', 'look z', 0, -0.5, 0.5, 0.001)
  useEffect(() => {
    if (app.current) {
      app.current.cameraManualLookAt(
        new THREE.Vector3(cameraRX, cameraRY, cameraRZ)
      )
    }
  }, [cameraRX, cameraRY, cameraRZ])

  const flatRoad = useDebugBoolean('model/road', 'flat', false)
  useEffect(() => {
    if (app.current) {
      app.current.flatRoad(flatRoad)
    }
  }, [flatRoad])
}
