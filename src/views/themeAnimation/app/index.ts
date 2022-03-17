import * as THREE from 'three'
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  SMAAEffect,
  SMAAPreset,
} from 'postprocessing'
import { Distortion, DistortionUniformsValues, Uniforms } from './distortions'
import Road from './road'
import CarLights from './carLights'
import LightsSticks from './lightsSticks'
import AppAttributeSetter from './appAttributeSetter'
import { lerp, formattedAlpha } from './math'

export type MinMax = [number, number]
export type RawColor = number | string
export type LerpVector = THREE.Vector2 | THREE.Vector3 | THREE.Vector4

const AUTOLOOKAT_TIMESPIN = 0.6
const FLATROAD_TIMESPIN = 0.6
const MOVECAMERA_TIMESPIN = 0.6

export interface AppOptions {
  onSpeedUp: (ev: MouseEvent) => void
  onSlowDown: (ev: MouseEvent) => void
  distortion: Distortion

  length: number
  roadWidth: number
  islandWidth: number
  lanesPerRoad: number

  fov: number
  fovSpeedUp: number
  speedUp: number
  carLightsFade: number

  totalSideLightSticks: number
  lightPairsPerRoadWay: number

  shoulderLinesWidthPercentage: number
  brokenLinesWidthPercentage: number
  brokenLinesLengthPercentage: number

  lightStickWidth: MinMax
  lightStickHeight: MinMax

  movingAwaySpeed: MinMax
  movingCloserSpeed: MinMax

  carLightsLength: MinMax
  carLightsRadius: MinMax
  carWidthPercentage: MinMax
  carShiftX: MinMax
  carFloorSeparation: MinMax

  colors: {
    roadColor: RawColor
    islandColor: RawColor
    background: RawColor
    shoulderLines: RawColor
    brokenLines: RawColor
    leftCars: RawColor[]
    rightCars: RawColor[]
    sticks: RawColor
  }
}

function resizeRendererToDisplaySize(
  renderer: THREE.WebGLRenderer,
  setSize: (width: number, height: number, updateStyles: boolean) => void
): boolean {
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    setSize(width, height, false)
  }
  return needResize
}

const defaultDistortion: Distortion = {
  uniforms: {
    uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 3)),
    uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 2.5)),
  },
  // here uniformValues and flatUniformValues have no effect
  uniformValues: {
    uFreq: new THREE.Vector2(1, 1),
    uAmp: new THREE.Vector2(1, 1),
  },
  flatUniformValues: {
    uFreq: new THREE.Vector2(1, 1),
    uAmp: new THREE.Vector2(1, 1),
  },
  getDistortion: `
  #define PI 3.14159265358979
    uniform vec2 uDistortionX;
    uniform vec2 uDistortionY;
  
      float nsin(float val){
      return sin(val) * 0.5+0.5;
      }
    vec3 getDistortion(float progress){
          progress = clamp(progress, 0.,1.);
          float xAmp = uDistortionX.r;
          float xFreq = uDistortionX.g;
          float yAmp = uDistortionY.r;
          float yFreq = uDistortionY.g;
          return vec3(
              xAmp * nsin(progress* PI * xFreq   - PI / 2. ) ,
              yAmp * nsin(progress * PI *yFreq - PI / 2.  ) ,
              0.
          );
      }
  `,
}

export default class App {
  options: AppOptions
  private readonly container: HTMLElement
  private readonly renderer: THREE.WebGLRenderer
  readonly camera: THREE.PerspectiveCamera
  private readonly composer: any
  scene: THREE.Scene
  readonly fogUniforms: Uniforms
  private readonly clock: THREE.Clock
  private readonly assets: any
  private disposed: boolean

  readonly road: Road
  readonly leftCarLights: CarLights
  readonly rightCarLights: CarLights
  readonly leftSticks: LightsSticks
  readonly attributeSetter: AppAttributeSetter

  private fovTarget: number
  private speedUpTarget: number
  private speedUp: number
  private timeOffset: number

  private renderPass: any
  private bloomPass: any

  enableMouseEffect = false

  // camera autoLookAt
  private isAutoLookAt = true
  private readonly autoLookAtVector3 = new THREE.Vector3(0, 0, -1)
  private readonly autoLookAtRealVector3 = new THREE.Vector3(0, 0, -1)
  // eslint-disable-next-line prettier/prettier
  private autoLookAtEaseQuaternions: [THREE.Quaternion, THREE.Quaternion?] = [new THREE.Quaternion(0, 0, 0, 0)]
  private autoLookAtTargetTime = -1

  // flat road
  private isFlatRoad = false
  private flatRoadTargetTime = -1
  // eslint-disable-next-line prettier/prettier
  private readonly flatRoadRealVector3s?: DistortionUniformsValues<LerpVector>

  // camera position
  private moveCameraTargetTime = -1
  private readonly moveCameraStartVector3 = new THREE.Vector3(0, 0, -1)
  private readonly moveCameraTargetVector3 = new THREE.Vector3(0, 0, -1)
  private readonly moveCameraRealVector3 = new THREE.Vector3(0, 0, -1)

  constructor(container: HTMLElement, options: AppOptions) {
    // Init ThreeJS Basics
    this.options = options
    this.attributeSetter = new AppAttributeSetter(this, options)

    if (!this.options.distortion) {
      this.options.distortion = defaultDistortion
    }
    // flat road
    if (
      this.options.distortion.uniforms.uFreq &&
      this.options.distortion.uniforms.uAmp
    ) {
      this.flatRoadRealVector3s = {
        uFreq: (
          this.options.distortion.uniforms.uFreq.value as LerpVector
        ).clone(),
        uAmp: (
          this.options.distortion.uniforms.uAmp.value as LerpVector
        ).clone(),
      }
      if (this.options.distortion.uniforms.uPowY) {
        this.flatRoadRealVector3s.uPowY = (
          this.options.distortion.uniforms.uPowY.value as LerpVector
        ).clone()
      }
    }

    this.container = container
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
    })
    this.renderer.setSize(container.offsetWidth, container.offsetHeight, false)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.domElement.id = 'backgroundAnime'
    this.composer = new EffectComposer(this.renderer)
    container.append(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      options.fov,
      container.offsetWidth / container.offsetHeight,
      0.1,
      10000
    )
    this.camera.position.x = 0
    this.camera.position.y = 8
    this.camera.position.z = -5

    // this.camera.rotateX(-0.4);
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(options.colors.background)

    const fog = new THREE.Fog(
      options.colors.background,
      options.length * 0.2,
      options.length * 500
    )
    this.scene.fog = fog
    this.fogUniforms = {
      fogColor: { type: 'c', value: fog.color },
      fogNear: { type: 'f', value: fog.near },
      fogFar: { type: 'f', value: fog.far },
    }
    this.clock = new THREE.Clock()
    this.assets = {}
    this.disposed = false

    // Create Objects
    this.road = new Road(this, options)
    this.leftCarLights = new CarLights(
      this,
      options,
      options.colors.leftCars,
      options.movingAwaySpeed,
      new THREE.Vector2(0, 1 - options.carLightsFade)
    )
    this.rightCarLights = new CarLights(
      this,
      options,
      options.colors.rightCars,
      options.movingCloserSpeed,
      new THREE.Vector2(1, 0 + options.carLightsFade)
    )
    this.leftSticks = new LightsSticks(this, options)

    this.fovTarget = options.fov

    this.speedUpTarget = 0
    this.speedUp = 0
    this.timeOffset = 0

    // Binds
    this.tick = this.tick.bind(this)
    this.init = this.init.bind(this)
    this.setSize = this.setSize.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  initPasses(): void {
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.bloomPass = new EffectPass(
      this.camera,
      new BloomEffect({
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0,
        resolutionScale: 1,
      })
    )
    const smaaPass = new EffectPass(
      this.camera,
      new SMAAEffect(
        this.assets.smaa.search,
        this.assets.smaa.area,
        SMAAPreset.MEDIUM
      )
    )
    this.renderPass.renderToScreen = false
    this.bloomPass.renderToScreen = false
    smaaPass.renderToScreen = true
    this.composer.addPass(this.renderPass)
    this.composer.addPass(this.bloomPass)
    this.composer.addPass(smaaPass)
  }

  async loadAssets(): Promise<void> {
    const assets = this.assets
    return await new Promise((resolve, reject) => {
      const manager = new THREE.LoadingManager(resolve as any)

      const searchImage = new Image()
      const areaImage = new Image()
      assets.smaa = {}
      searchImage.addEventListener('load', function () {
        assets.smaa.search = this
        manager.itemEnd('smaa-search')
      })

      areaImage.addEventListener('load', function () {
        assets.smaa.area = this
        manager.itemEnd('smaa-area')
      })
      manager.itemStart('smaa-search')
      manager.itemStart('smaa-area')

      searchImage.src = SMAAEffect.searchImageDataURL
      areaImage.src = SMAAEffect.areaImageDataURL
    })
  }

  init(): void {
    this.initPasses()
    const options = this.options
    this.road.init()
    this.leftCarLights.init()
    if (this.leftCarLights.mesh) {
      this.leftCarLights.mesh.position.setX(
        -options.roadWidth / 2 - options.islandWidth / 2
      )
    }
    this.rightCarLights.init()
    if (this.rightCarLights.mesh) {
      this.rightCarLights.mesh.position.setX(
        options.roadWidth / 2 + options.islandWidth / 2
      )
    }
    this.leftSticks.init()
    if (this.leftSticks.mesh) {
      this.leftSticks.mesh.position.setX(
        -(options.roadWidth + options.islandWidth / 2)
      )
    }

    this.container.addEventListener('mousedown', this.onMouseDown)
    this.container.addEventListener('mouseup', this.onMouseUp)
    this.container.addEventListener('mouseout', this.onMouseUp)

    this.tick()
  }

  onMouseDown(ev: MouseEvent): void {
    if (!this.enableMouseEffect) return
    if (this.options.onSpeedUp) this.options.onSpeedUp(ev)
    this.fovTarget = this.options.fovSpeedUp
    this.speedUpTarget = this.options.speedUp
  }

  onMouseUp(ev: MouseEvent): void {
    if (!this.enableMouseEffect) return
    if (this.options.onSlowDown) this.options.onSlowDown(ev)
    this.fovTarget = this.options.fov
    this.speedUpTarget = 0
    // this.speedupLerp = 0.1;
  }

  update(delta: number): void {
    const lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta)
    this.speedUp += lerp(
      this.speedUp,
      this.speedUpTarget,
      lerpPercentage,
      0.00001
    )
    this.timeOffset += this.speedUp * delta

    const time = this.clock.elapsedTime + this.timeOffset

    this.rightCarLights.update(time)
    this.leftCarLights.update(time)
    this.leftSticks.update(time)
    this.road.update(time)

    let updateCamera = false
    // camera fov
    const fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage)
    if (fovChange !== 0) {
      this.camera.fov += fovChange * delta * 6
      updateCamera = true
    }
    // camera position
    if (this.moveCameraTargetTime >= time) {
      const alpha =
        1 -
        formattedAlpha(
          this.moveCameraTargetTime - time,
          MOVECAMERA_TIMESPIN,
          0.04
        )
      this.moveCameraRealVector3.lerpVectors(
        this.moveCameraStartVector3,
        this.moveCameraTargetVector3,
        alpha
      )
      this.camera.position.copy(this.moveCameraRealVector3)
      updateCamera = true
    }

    // camera rotate
    if (this.options.distortion.getJS) {
      if (this.isAutoLookAt) {
        // start auto look at
        const distortion = this.options.distortion.getJS(0.025, time)
        this.autoLookAtVector3.set(
          this.camera.position.x + distortion.x,
          this.camera.position.y + distortion.y,
          this.camera.position.z + distortion.z
        )
        if (this.autoLookAtTargetTime >= time) {
          const alpha =
            1 -
            formattedAlpha(
              this.autoLookAtTargetTime - time,
              AUTOLOOKAT_TIMESPIN,
              0.04
            )
          const ca = this.camera.clone()
          ca.lookAt(this.autoLookAtVector3)
          this.camera.quaternion.slerpQuaternions(
            this.autoLookAtEaseQuaternions[0],
            ca.quaternion,
            alpha
          )
        } else {
          this.autoLookAtRealVector3.copy(this.autoLookAtVector3)
          this.camera.lookAt(this.autoLookAtRealVector3)
        }
        updateCamera = true
      } else if (
        this.autoLookAtTargetTime >= time &&
        this.autoLookAtEaseQuaternions[1]
      ) {
        // finish auto look at then move to a point
        const alpha =
          1 -
          formattedAlpha(
            this.autoLookAtTargetTime - time,
            AUTOLOOKAT_TIMESPIN,
            0.04
          )
        this.camera.quaternion.slerpQuaternions(
          this.autoLookAtEaseQuaternions[0],
          this.autoLookAtEaseQuaternions[1],
          alpha
        )
        updateCamera = true
      }
    }
    if (updateCamera) {
      this.camera.updateProjectionMatrix()
    }

    // flatRoad
    if (this.flatRoadRealVector3s && this.flatRoadTargetTime >= time) {
      let alpha = formattedAlpha(
        this.flatRoadTargetTime - time,
        FLATROAD_TIMESPIN,
        0.04
      )
      if (!this.isFlatRoad) {
        // 1 -> 0
        alpha = 1 - alpha
      }
      const optionDistortion = this.options.distortion
      this.flatRoadRealVector3s.uAmp.lerpVectors(
        optionDistortion.flatUniformValues.uAmp,
        optionDistortion.uniformValues.uAmp,
        alpha
      )
      this.flatRoadRealVector3s.uFreq.lerpVectors(
        optionDistortion.flatUniformValues.uFreq,
        optionDistortion.uniformValues.uFreq,
        alpha
      )
      if (this.flatRoadRealVector3s.uPowY) {
        this.flatRoadRealVector3s.uPowY.lerpVectors(
          optionDistortion.flatUniformValues.uPowY,
          optionDistortion.uniformValues.uPowY,
          alpha
        )
      }
      ;(optionDistortion.uniforms.uFreq.value as LerpVector).copy(
        this.flatRoadRealVector3s.uFreq as any
      )
      ;(optionDistortion.uniforms.uAmp.value as LerpVector).copy(
        this.flatRoadRealVector3s.uAmp as any
      )
      if (optionDistortion.uniforms.uPowY) {
        ;(optionDistortion.uniforms.uPowY.value as LerpVector).copy(
          this.flatRoadRealVector3s.uPowY as any
        )
      }
      if (optionDistortion.uniforms.uMovementProgressFix) {
        const currentMovementProgressFix =
          (optionDistortion.flatUniformValues.uMovementProgressFix as number) -
          (optionDistortion.flatUniformValues.uMovementProgressFix -
            optionDistortion.uniformValues.uMovementProgressFix) *
            alpha
        optionDistortion.uniforms.uMovementProgressFix.value =
          currentMovementProgressFix
      }
    }
  }

  render(delta: number): void {
    this.composer.render(delta)
  }

  dispose(): void {
    this.disposed = true
  }

  setSize(width: number, height: number, updateStyles: boolean): void {
    this.composer.setSize(width, height, updateStyles)
  }

  tick(): void {
    if (this.disposed || !this) return
    if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {
      const canvas = this.renderer.domElement
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }
    const delta = this.clock.getDelta()
    this.render(delta)
    this.update(delta)
    requestAnimationFrame(this.tick)
  }

  cameraAutoLookAt(isAutoLookAt: boolean, direction?: THREE.Quaternion): void {
    if (this.isAutoLookAt && !isAutoLookAt) {
      // off
      this.isAutoLookAt = isAutoLookAt
      this.autoLookAtEaseQuaternions[0] = this.camera.quaternion.clone()
      this.autoLookAtEaseQuaternions[1] = undefined
      if (direction) {
        this.autoLookAtEaseQuaternions[1] = direction
      }
      this.autoLookAtTargetTime = this.clock.elapsedTime + AUTOLOOKAT_TIMESPIN
    } else if (!this.isAutoLookAt && isAutoLookAt) {
      // on
      this.isAutoLookAt = isAutoLookAt
      this.autoLookAtEaseQuaternions[0] = this.camera.quaternion.clone()
      this.autoLookAtEaseQuaternions[1] = undefined
      this.autoLookAtTargetTime = this.clock.elapsedTime + AUTOLOOKAT_TIMESPIN
    } else if (!this.isAutoLookAt && direction) {
      // off, change the direction
      this.autoLookAtEaseQuaternions[0] = this.camera.quaternion.clone()
      this.autoLookAtEaseQuaternions[1] = undefined
      if (direction) {
        this.autoLookAtEaseQuaternions[1] = direction
      }
      this.autoLookAtTargetTime = this.clock.elapsedTime + AUTOLOOKAT_TIMESPIN
    }
  }

  cameraManualLookAt(direction: THREE.Vector3): void {
    if (this.isAutoLookAt) return
    const { camera } = this
    const v = new THREE.Vector3(
      camera.position.x + direction.x,
      camera.position.y + direction.y,
      camera.position.z + direction.z
    )
    this.camera.lookAt(v)
    this.camera.updateProjectionMatrix()
  }

  moveCameraPosition(position: THREE.Vector3): void {
    if (position.equals(this.camera.position)) return
    this.moveCameraTargetTime = this.clock.elapsedTime + MOVECAMERA_TIMESPIN
    this.moveCameraTargetVector3.copy(position)
    this.moveCameraStartVector3.copy(this.camera.position)
  }

  flatRoad(isFlatRoad: boolean): void {
    if (this.isFlatRoad && !isFlatRoad) {
      // off
      this.isFlatRoad = isFlatRoad
      this.flatRoadTargetTime = this.clock.elapsedTime + FLATROAD_TIMESPIN
    } else if (!this.isFlatRoad && isFlatRoad) {
      // on
      this.isFlatRoad = isFlatRoad
      this.flatRoadTargetTime = this.clock.elapsedTime + FLATROAD_TIMESPIN
    }
  }
}
