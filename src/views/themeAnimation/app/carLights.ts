import * as THREE from 'three'
import App, { AppOptions, MinMax, RawColor } from '.'
import { pickOrdered, random } from './math'

const carLightsFragment = `
  #define USE_FOG;
  ${THREE.ShaderChunk.fog_pars_fragment}
  varying vec3 vColor;
  varying vec2 vUv; 
  uniform vec2 uFade;
  void main() {
  vec3 color = vec3(vColor);
  float fadeStart = 0.4;
  float maxFade = 0.;
  float alpha = 1.;
  
  alpha = smoothstep(uFade.x, uFade.y, vUv.x);
  gl_FragColor = vec4(color,alpha);
  if (gl_FragColor.a < 0.0001) discard;
  ${THREE.ShaderChunk.fog_fragment}
  }
`

const carLightsVertex = `
  #define USE_FOG;
  ${THREE.ShaderChunk.fog_pars_vertex}
  attribute vec3 aOffset;
  attribute vec3 aMetrics;
  attribute vec3 aColor;

  uniform float uTravelLength;
  uniform float uTime;
  uniform float uSpeed;

  varying vec2 vUv; 
  varying vec3 vColor; 
  #include <getDistortion_vertex>

  void main() {
    vec3 transformed = position.xyz;
    float radius = aMetrics.r;
    float myLength = aMetrics.g;
    float speed = aMetrics.b;

    transformed.xy *= radius ;
    transformed.z *= myLength;
  
    // Add my length to make sure it loops after the lights hits the end
    transformed.z += myLength-mod( uTime *speed + aOffset.z, uTravelLength);
    transformed.xy += aOffset.xy;


    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);

    vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    vColor = aColor;
    ${THREE.ShaderChunk.fog_vertex}
  }`

export default class CarLights {
  private readonly app: App
  private readonly options: AppOptions
  private readonly colors: RawColor[] | RawColor
  private readonly speed: MinMax
  private readonly fade: THREE.Vector2
  mesh?: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>

  constructor(
    app: App,
    options: AppOptions,
    colors: RawColor[] | RawColor,
    speed: MinMax,
    fade: THREE.Vector2
  ) {
    this.app = app
    this.options = options
    this.colors = colors
    this.speed = speed
    this.fade = fade
  }

  generateColor(colors: RawColor[] | RawColor, repeat: number): any[] {
    let useColors: THREE.Color | THREE.Color[]
    if (Array.isArray(colors)) {
      useColors = colors.map((c) => new THREE.Color(c))
    } else {
      useColors = new THREE.Color(colors)
    }

    const aColor = []

    for (let i = 0; i < repeat; i++) {
      const color = pickOrdered(useColors, i)
      // console.log(color)
      aColor.push(color.r)
      aColor.push(color.g)
      aColor.push(color.b)

      aColor.push(color.r)
      aColor.push(color.g)
      aColor.push(color.b)
    }
    return aColor
  }

  init(): void {
    const options = this.options
    // Curve with length 1
    const curve = new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    )
    // Tube with radius = 1
    const geometry = new THREE.TubeBufferGeometry(curve, 40, 1, 8, false)

    const instanced = new THREE.InstancedBufferGeometry().copy(geometry)
    instanced.instanceCount = options.lightPairsPerRoadWay * 2

    const laneWidth = options.roadWidth / options.lanesPerRoad

    const aOffset = []
    const aMetrics = []

    for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
      const radius = random(options.carLightsRadius)
      const length = random(options.carLightsLength)
      const speed = random(this.speed)

      const carLane = i % 3
      let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2

      const carWidth = random(options.carWidthPercentage) * laneWidth
      // Drunk Driving
      const carShiftX = random(options.carShiftX) * laneWidth
      // Both lights share same shiftX and lane;
      laneX += carShiftX

      const offsetY = random(options.carFloorSeparation) + radius * 1.3

      const offsetZ = -random(options.length)

      aOffset.push(laneX - carWidth / 2)
      aOffset.push(offsetY)
      aOffset.push(offsetZ)

      aOffset.push(laneX + carWidth / 2)
      aOffset.push(offsetY)
      aOffset.push(offsetZ)

      aMetrics.push(radius)
      aMetrics.push(length)
      aMetrics.push(speed)

      aMetrics.push(radius)
      aMetrics.push(length)
      aMetrics.push(speed)
    }

    const aColor = this.generateColor(this.colors, options.lightPairsPerRoadWay)

    instanced.setAttribute(
      'aOffset',
      new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false)
    )
    instanced.setAttribute(
      'aMetrics',
      new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false)
    )
    instanced.setAttribute(
      'aColor',
      new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false)
    )
    const material = new THREE.ShaderMaterial({
      fragmentShader: carLightsFragment,
      vertexShader: carLightsVertex,
      transparent: true,
      uniforms: Object.assign(
        {
          // uColor: new THREE.Uniform(new THREE.Color(this.color)),
          uTime: new THREE.Uniform(0),
          uTravelLength: new THREE.Uniform(options.length),
          uFade: new THREE.Uniform(this.fade),
        },
        this.app.fogUniforms,
        options.distortion.uniforms
      ),
    })
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <getDistortion_vertex>',
        options.distortion.getDistortion
      )
    }
    const mesh = new THREE.Mesh(instanced, material)
    mesh.frustumCulled = false
    this.app.scene.add(mesh)
    this.mesh = mesh
  }

  update(time: number): void {
    if (this.mesh) {
      this.mesh.material.uniforms.uTime.value = time
    }
  }
}
