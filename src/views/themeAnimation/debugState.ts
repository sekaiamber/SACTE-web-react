import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import App, { AppOptions } from './app'
import ThreeDebug from '../../store/threeDebug'

export default function useDebugState(
  app: App | null,
  initOptions: AppOptions
): void {
  const debugState = ThreeDebug.useContainer()

  const { useDebugColor, useDebugNumber, useDebugBoolean } = debugState

  // colors

  const backgroundColor = useDebugColor('colors', 'background', '#000000')
  useEffect(() => {
    if (app) {
      app.attributeSetter.setBackgroundColor(backgroundColor)
    }
  }, [backgroundColor])

  const roadColor = useDebugColor(
    'colors',
    'road',
    initOptions.colors.roadColor as string
  )
  useEffect(() => {
    if (app) {
      app.attributeSetter.setRoadColor(roadColor)
    }
  }, [roadColor])

  const islandColor = useDebugColor(
    'colors',
    'island',
    initOptions.colors.islandColor as string
  )
  useEffect(() => {
    if (app) {
      app.attributeSetter.setIslandColor(islandColor)
    }
  }, [islandColor])

  // const shoulderLinesColor = useDebugColor(
  //   'colors',
  //   'shoulder lines',
  //   initOptions.colors.shoulderLines as string
  // )
  // useEffect(() => {
  //   if (app) {
  //     app.attributeSetter.setShoulderLinesColor(shoulderLinesColor)
  //   }
  // }, [shoulderLinesColor])

  const brokenLines = useDebugColor(
    'colors',
    'broken lines',
    initOptions.colors.shoulderLines as string
  )
  useEffect(() => {
    if (app) {
      app.attributeSetter.setBrokenLines(brokenLines)
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
    if (app) {
      app.scene.add(helper)
    }
  }, [app])
  useEffect(() => {
    helper.visible = gridHelperVisible
  }, [gridHelperVisible])

  const cameraX = useDebugNumber('env/camera', 'position x', 0, -60, 60, 1)
  const cameraY = useDebugNumber('env/camera', 'position y', 8, -60, 60, 1)
  const cameraZ = useDebugNumber('env/camera', 'position z', -5, -60, 60, 1)
  useEffect(() => {
    if (app) {
      app.camera.position.setX(cameraX)
      app.camera.position.setY(cameraY)
      app.camera.position.setZ(cameraZ)
    }
  }, [cameraX, cameraY, cameraZ])

  const autoLookAt = useDebugBoolean('env/camera', 'auto look at', true)
  useEffect(() => {
    if (app) {
      app.cameraAutoLookAt(autoLookAt)
    }
  }, [autoLookAt])

  const cameraRX = useDebugNumber('env/camera', 'look x', 0, -1, 1, 0.001)
  const cameraRY = useDebugNumber('env/camera', 'look y', 0, -5, 5, 0.001)
  const cameraRZ = useDebugNumber('env/camera', 'look z', 0, -1, 1, 0.001)
  useEffect(() => {
    if (app) {
      app.cameraManualLookAt(new THREE.Vector3(cameraRX, cameraRY, cameraRZ))
    }
  }, [cameraRX, cameraRY, cameraRZ])

  const flatRoad = useDebugBoolean('model/road', 'flat', false)
  useEffect(() => {
    if (app) {
      app.flatRoad(flatRoad)
    }
  }, [flatRoad])
}
