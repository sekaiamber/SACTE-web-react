import * as THREE from 'three'
import App, { AppOptions } from '.'

function TU(value: any): THREE.Uniform {
  return new THREE.Uniform(value)
}

export default class AppAttributeSetter {
  private readonly app: App
  private readonly options: AppOptions

  constructor(app: App, options: AppOptions) {
    this.app = app
    this.options = options
  }

  setBackgroundColor(color: string): void {
    const c = new THREE.Color(color)
    this.app.scene.background = c
    if (this.app.scene.fog) {
      this.app.scene.fog.color = c
    }
  }

  private setRoadColorBase(key: string, color: string): void {
    const { app } = this
    const c = new THREE.Color(color)
    if (app.road.leftRoadWay) {
      app.road.leftRoadWay.material.uniforms[key] = TU(c)
    }
    if (app.road.rightRoadWay) {
      app.road.rightRoadWay.material.uniforms[key] = TU(c)
    }
  }

  setRoadColor(color: string): void {
    this.setRoadColorBase('uColor', color)
  }

  setIslandColor(color: string): void {
    const { app } = this
    if (app.road.island) {
      app.road.island.material.uniforms.uColor = TU(new THREE.Color(color))
    }
  }

  // setShoulderLinesColor(color: string): void {
  //   const { app } = this
  //   if (app.road.leftRoadWay) {
  //     app.road.leftRoadWay.material.uniforms.uShoulderLinesColor = TU(
  //       new THREE.Color(color)
  //     )
  //   }
  //   if (app.road.rightRoadWay) {
  //     app.road.rightRoadWay.material.uniforms.uShoulderLinesColor = TU(
  //       new THREE.Color(color)
  //     )
  //   }
  // }

  setBrokenLines(color: string): void {
    this.setRoadColorBase('uBrokenLinesColor', color)
  }
}
