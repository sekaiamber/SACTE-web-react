import * as THREE from 'three'
import App, { AppOptions } from '.'
import { pickRandom, random } from './math'

const sideSticksFragment = `
#define USE_FOG;
${THREE.ShaderChunk.fog_pars_fragment}
varying vec3 vColor;
  void main(){
    vec3 color = vec3(vColor);
    gl_FragColor = vec4(color,1.);
    ${THREE.ShaderChunk.fog_fragment}
  }
`

const sideSticksVertex = `
#define USE_FOG;
${THREE.ShaderChunk.fog_pars_vertex}
attribute float aOffset;
attribute vec3 aColor;

attribute vec2 aMetrics;

uniform float uTravelLength;
uniform float uTime;

varying vec3 vColor;
mat4 rotationY( in float angle ) {
  return mat4(  cos(angle),    0,    sin(angle),  0,
               0,    1.0,       0,  0,
          -sin(angle),  0,    cos(angle),  0,
              0,     0,        0,  1);
}



  #include <getDistortion_vertex>
  void main(){
    vec3 transformed = position.xyz;
    float width = aMetrics.x;
    float height = aMetrics.y;

    transformed.xy *= vec2(width,height);
    float time = mod(uTime  * 60. *2. + aOffset , uTravelLength);

    transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;

    transformed.z +=  - uTravelLength + time;


    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);

    transformed.y += height /2.;
    transformed.x += -width/2.;
    vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
    gl_Position = projectionMatrix * mvPosition;
    vColor = aColor;
    ${THREE.ShaderChunk.fog_vertex}
  }
`

export default class LightsSticks {
  private readonly app: App
  private readonly options: AppOptions
  mesh?: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>

  constructor(app: App, options: AppOptions) {
    this.app = app
    this.options = options
  }

  init(): void {
    const options = this.options
    const geometry = new THREE.PlaneBufferGeometry(1, 1)
    const instanced = new THREE.InstancedBufferGeometry().copy(geometry)
    const totalSticks = options.totalSideLightSticks
    instanced.instanceCount = totalSticks

    const stickoffset = options.length / (totalSticks - 1)
    const aOffset = []
    const aColor = []
    const aMetrics = []

    const colors = options.colors.sticks
    let useColors: THREE.Color | THREE.Color[]
    if (Array.isArray(colors)) {
      useColors = colors.map((c) => new THREE.Color(c))
    } else {
      useColors = new THREE.Color(colors)
    }

    for (let i = 0; i < totalSticks; i++) {
      const width = random(options.lightStickWidth)
      const height = random(options.lightStickHeight)
      aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random())

      const color = pickRandom(useColors)
      aColor.push(color.r)
      aColor.push(color.g)
      aColor.push(color.b)

      aMetrics.push(width)
      aMetrics.push(height)
    }
    instanced.setAttribute(
      'aOffset',
      new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false)
    )
    instanced.setAttribute(
      'aColor',
      new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false)
    )
    instanced.setAttribute(
      'aMetrics',
      new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false)
    )
    const material = new THREE.ShaderMaterial({
      fragmentShader: sideSticksFragment,
      vertexShader: sideSticksVertex,
      // This ones actually need double side
      side: THREE.DoubleSide,
      uniforms: Object.assign(
        {
          uTravelLength: new THREE.Uniform(options.length),
          uTime: new THREE.Uniform(0),
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
    // The object is behind the camera before the vertex shader
    mesh.frustumCulled = false
    // mesh.position.y = options.lightStickHeight / 2;
    this.app.scene.add(mesh)
    this.mesh = mesh
  }

  update(time: number): void {
    if (this.mesh) {
      this.mesh.material.uniforms.uTime.value = time
    }
  }
}
