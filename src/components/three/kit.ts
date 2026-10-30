import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"

export const COLORS = {
  background: 0x05060f,
  steel: 0x2d3757,
  steelLight: 0x4c5a82,
  blue: 0x2f9bff,
  violet: 0x7c5cff,
  magenta: 0xd946ef,
  green: 0x22e58a,
  amber: 0xffb020,
  red: 0xff3b5c,
}

export type MachineState = "run" | "warn" | "stop"

const STATE_COLOR: Record<MachineState, number> = {
  run: COLORS.green,
  warn: COLORS.amber,
  stop: COLORS.red,
}

export function steel(color: number = COLORS.steel) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.62, roughness: 0.38 })
}

export function glow(color: number, intensity = 1.6) {
  return new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: color,
    emissiveIntensity: intensity,
  })
}

export function box(
  size: [number, number, number],
  material: THREE.Material,
  position: [number, number, number] = [0, 0, 0]
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material)
  mesh.position.set(...position)
  return mesh
}

export function cylinder(
  radius: number,
  height: number,
  material: THREE.Material,
  position: [number, number, number] = [0, 0, 0]
) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 24), material)
  mesh.position.set(...position)
  return mesh
}

/** Kolumna sygnalizacyjna maszyny. */
export function makeStackLight() {
  const group = new THREE.Group()
  const lamps = (["stop", "warn", "run"] as MachineState[]).map((state, index) => {
    const material = glow(STATE_COLOR[state], 0.08)
    const lamp = cylinder(0.11, 0.2, material, [0, 0.2 + (2 - index) * 0.22, 0])
    group.add(lamp)
    return { state, material }
  })
  group.add(cylinder(0.05, 0.2, steel(), [0, 0, 0]))

  return {
    group,
    set(active: MachineState, time: number) {
      for (const lamp of lamps) {
        const on = lamp.state === active
        const blink = active === "stop" ? 2.6 + Math.sin(time * 9) * 1.4 : 2.6
        lamp.material.emissiveIntensity = on ? blink : 0.08
      }
    },
  }
}

export function makeConveyor(length: number) {
  const group = new THREE.Group()
  group.add(box([length, 0.22, 1.5], steel(), [0, 0.72, 0]))
  group.add(box([length, 0.08, 0.06], glow(COLORS.blue, 1.1), [0, 0.84, 0.76]))

  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 32
  const context = canvas.getContext("2d") as CanvasRenderingContext2D
  context.fillStyle = "#0a0d18"
  context.fillRect(0, 0, 256, 32)
  context.fillStyle = "#222c47"
  for (let x = 0; x < 256; x += 32) context.fillRect(x, 0, 6, 32)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.repeat.set(length / 1.4, 1)
  const belt = new THREE.Mesh(
    new THREE.BoxGeometry(length, 0.04, 1.26),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.9 })
  )
  belt.position.y = 0.85
  group.add(belt)

  for (let x = -length / 2 + 1; x < length / 2; x += 2.6) {
    group.add(box([0.14, 0.62, 0.14], steel(COLORS.steelLight), [x, 0.31, 0.6]))
    group.add(box([0.14, 0.62, 0.14], steel(COLORS.steelLight), [x, 0.31, -0.6]))
  }

  return {
    group,
    update(delta: number, speed: number) {
      texture.offset.x -= delta * speed * 0.55
    },
  }
}

/** Wyroby jadące po przenośniku. */
export function makeProducts(count: number, length: number) {
  const mesh = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.5, 0.34, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x8fa3c9, metalness: 0.5, roughness: 0.35 }),
    count
  )
  const matrix = new THREE.Matrix4()
  const offsets = Array.from({ length: count }, (_, index) => (index / count) * length)

  return {
    mesh,
    update(delta: number, speed: number) {
      offsets.forEach((offset, index) => {
        offsets[index] = (offset + delta * speed * 1.5) % length
        matrix.makeTranslation(offsets[index] - length / 2, 1.04, 0)
        mesh.setMatrixAt(index, matrix)
      })
      mesh.instanceMatrix.needsUpdate = true
    },
  }
}

export function makePress() {
  const group = new THREE.Group()
  const frame = steel(COLORS.steelLight)
  group.add(box([0.32, 3, 0.32], frame, [-0.95, 1.5, 0]))
  group.add(box([0.32, 3, 0.32], frame, [0.95, 1.5, 0]))
  group.add(box([2.3, 0.5, 1], steel(), [0, 3.1, 0]))
  const ram = box([1.3, 0.55, 0.9], steel(COLORS.steelLight), [0, 2.1, 0])
  group.add(ram)
  group.add(box([1.4, 0.05, 0.05], glow(COLORS.blue), [0, 2.82, 0.52]))

  return {
    group,
    update(time: number, running: boolean) {
      if (running) ram.position.y = 1.9 + Math.abs(Math.sin(time * 2.2)) * 0.7
    },
  }
}

export function makeCnc() {
  const group = new THREE.Group()
  group.add(box([2.3, 2.4, 1.9], steel(), [0, 1.2, 0]))
  const glass = new THREE.MeshStandardMaterial({
    color: 0x0b1a33,
    emissive: COLORS.blue,
    emissiveIntensity: 0.55,
    transparent: true,
    opacity: 0.9,
  })
  group.add(box([1.5, 1, 0.04], glass, [0, 1.5, 0.97]))
  const spindle = cylinder(0.09, 0.8, glow(COLORS.violet, 2), [0, 1.55, 0.99])
  group.add(spindle)

  return {
    group,
    update(time: number, running: boolean) {
      glass.emissiveIntensity = running ? 0.55 + Math.sin(time * 6) * 0.15 : 0.15
      if (running) spindle.position.x = Math.sin(time * 1.4) * 0.5
    },
  }
}

export function makeRobot() {
  const group = new THREE.Group()
  const metal = steel(COLORS.steelLight)
  group.add(cylinder(0.5, 0.3, steel(), [0, 0.15, 0]))
  const shoulder = new THREE.Group()
  shoulder.position.y = 0.34
  group.add(shoulder)
  const upper = new THREE.Group()
  shoulder.add(upper)
  upper.add(box([0.26, 1.7, 0.26], metal, [0, 0.85, 0]))
  const elbow = new THREE.Group()
  elbow.position.y = 1.7
  upper.add(elbow)
  elbow.add(cylinder(0.2, 0.34, glow(COLORS.magenta, 1.2)).rotateX(Math.PI / 2))
  elbow.add(box([1.5, 0.2, 0.2], metal, [0.75, 0, 0]))
  elbow.add(box([0.12, 0.4, 0.34], glow(COLORS.blue, 1.5), [1.5, -0.18, 0]))

  return {
    group,
    update(time: number, running: boolean) {
      if (!running) return
      shoulder.rotation.y = Math.sin(time * 1.1) * 0.9
      upper.rotation.z = -0.25 + Math.sin(time * 1.6) * 0.16
      elbow.rotation.z = -0.25 + Math.cos(time * 1.6) * 0.3
    },
  }
}

export function makePacker() {
  const group = new THREE.Group()
  const frame = steel(COLORS.steelLight)
  group.add(box([0.26, 2.3, 1.8], frame, [-0.8, 1.15, 0]))
  group.add(box([0.26, 2.3, 1.8], frame, [0.8, 1.15, 0]))
  group.add(box([1.86, 0.34, 1.8], steel(), [0, 2.4, 0]))
  const beam = box([1.3, 0.04, 1.3], glow(COLORS.green, 2), [0, 1.6, 0])
  group.add(beam)

  return {
    group,
    update(time: number, running: boolean) {
      beam.position.y = running ? 1.35 + Math.sin(time * 3) * 0.3 : 1.35
    },
  }
}

/** Falująca sieć punktów, ten sam motyw co na banerze. */
export function makeWaveField(width: number, depth: number, density: number) {
  const columns = Math.round(width * density)
  const rows = Math.round(depth * density)
  const positions = new Float32Array(columns * rows * 3)
  for (let x = 0; x < columns; x += 1) {
    for (let z = 0; z < rows; z += 1) {
      const index = (x * rows + z) * 3
      positions[index] = (x / (columns - 1) - 0.5) * width
      positions[index + 2] = (z / (rows - 1) - 0.5) * depth
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uWidth: { value: width },
      uDepth: { value: depth },
      uLeft: { value: new THREE.Color(COLORS.blue) },
      uRight: { value: new THREE.Color(COLORS.magenta) },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uWidth;
      uniform float uDepth;
      varying float vMix;
      varying float vLift;
      varying float vEdge;
      void main() {
        vec3 p = position;
        vEdge = smoothstep(1.0, 0.55, abs(p.x) / (uWidth * 0.5)) * smoothstep(1.0, 0.55, abs(p.z) / (uDepth * 0.5));
        float wave = sin(p.x * 0.34 + uTime * 0.5) * 0.42 + cos(p.z * 0.46 + uTime * 0.36) * 0.34;
        p.y = wave - 0.95;
        vMix = p.x / uWidth + 0.5;
        vLift = wave;
        vec4 view = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = min((96.0 + wave * 34.0) / -view.z, 4.5);
        gl_Position = projectionMatrix * view;
      }
    `,
    fragmentShader: `
      uniform vec3 uLeft;
      uniform vec3 uRight;
      varying float vMix;
      varying float vLift;
      varying float vEdge;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.05, d) * (0.5 + vLift * 0.3) * vEdge;
        gl_FragColor = vec4(mix(uLeft, uRight, vMix) * 1.5, alpha);
      }
    `,
  })

  const points = new THREE.Points(geometry, material)
  points.frustumCulled = false
  return {
    points,
    update(time: number) {
      material.uniforms.uTime.value = time
    },
  }
}

/** Tekst jako tekstura, dla etykiet w scenie. */
export function textSprite(text: string, width = 3.4) {
  const canvas = document.createElement("canvas")
  canvas.width = 768
  canvas.height = 128
  const context = canvas.getContext("2d") as CanvasRenderingContext2D
  context.font = "600 62px system-ui, 'Segoe UI', sans-serif"
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.fillStyle = "#b9c5ea"
  context.fillText(text, 384, 66)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false })
  )
  sprite.scale.set(width, width / 6, 1)
  return sprite
}

export function createStage(canvas: HTMLCanvasElement, options: { compact: boolean }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" })
  renderer.setClearColor(0x000000, 1)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(COLORS.background, 26, 70)
  const environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04)
  scene.environment = environment.texture
  scene.environmentIntensity = 0.5
  scene.add(new THREE.HemisphereLight(0x8aa4ff, 0x10122a, 1.6))
  const sun = new THREE.DirectionalLight(0xffffff, 2.2)
  sun.position.set(6, 14, 10)
  scene.add(sun)
  const rim = new THREE.DirectionalLight(COLORS.violet, 2.4)
  rim.position.set(-8, 6, -10)
  scene.add(rim)
  const grid = new THREE.GridHelper(160, 160, 0x1c2848, 0x121a33)
  grid.position.y = -0.02
  scene.add(grid)

  const camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 200)
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.42, 0.5, 0.74)
  if (!options.compact) composer.addPass(bloom)
  composer.addPass(new OutputPass())

  let limit = options.compact ? 1.5 : 1.75
  const resize = () => {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (!width || !height) return
    const ratio = Math.min(window.devicePixelRatio || 1, limit)
    renderer.setPixelRatio(ratio)
    renderer.setSize(width, height, false)
    composer.setPixelRatio(ratio)
    composer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    afterResize()
  }
  let afterResize = () => {}
  resize()
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)

  return {
    renderer,
    scene,
    camera,
    render: () => composer.render(),
    degrade() {
      bloom.enabled = false
      limit = 1
      resize()
    },
    onResize(callback: () => void) {
      afterResize = callback
    },
    dispose() {
      observer.disconnect()
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh
        mesh.geometry?.dispose()
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        for (const material of materials) {
          const map = (material as THREE.MeshStandardMaterial | undefined)?.map
          map?.dispose()
          material?.dispose()
        }
      })
      environment.dispose()
      composer.dispose()
      renderer.dispose()
    },
  }
}

/** Pętla rysowania, która stoi, gdy scena jest poza ekranem albo karta jest ukryta. */
export function runLoop(
  canvas: HTMLCanvasElement,
  frame: (delta: number, time: number, real: number) => void,
  onSlow?: () => void
) {
  let frames = 0
  let spent = 0
  let visible = true
  let paused = false
  let handle = 0
  let last = 0
  let time = 0

  const tick = (now: number) => {
    handle = 0
    const raw = (now - last) / 1000 || 0
    const delta = Math.min(raw, 0.05)
    last = now
    if (onSlow && raw < 0.5) {
      frames += 1
      spent += raw
      if (frames === 90) {
        if (spent / frames > 1 / 24) onSlow()
        onSlow = undefined
      }
    }
    time += delta
    frame(delta, time, Math.min(raw, 0.25))
    schedule()
  }
  const schedule = () => {
    if (!handle && visible && !paused && !document.hidden) {
      handle = requestAnimationFrame(tick)
    }
  }
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    last = performance.now()
    schedule()
  })
  intersection.observe(canvas)
  const onVisibility = () => {
    last = performance.now()
    schedule()
  }
  document.addEventListener("visibilitychange", onVisibility)
  schedule()

  return {
    setPaused(value: boolean) {
      paused = value
      last = performance.now()
      schedule()
    },
    stop() {
      if (handle) cancelAnimationFrame(handle)
      handle = 0
      visible = false
      intersection.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    },
  }
}
