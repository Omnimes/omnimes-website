import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"

export const COLORS = {
  background: 0x05060f,
  steel: 0x2d3757,
  steelLight: 0x4c5a82,
  body: 0x717e9e,
  bright: 0x8d99b5,
  robot: 0x6d5cff,
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

/** Lakier proszkowy, jak na obudowach maszyn. */
export function paint(color: number, roughness = 0.46) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.12, roughness })
}

export function glow(color: number, intensity = 1.6) {
  return new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: color,
    emissiveIntensity: intensity,
  })
}

function solid<T extends THREE.Object3D>(mesh: T) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function box(
  size: [number, number, number],
  material: THREE.Material,
  position: [number, number, number] = [0, 0, 0],
  radius = 0.05
) {
  const smallest = Math.min(...size)
  const geometry =
    smallest < 0.08
      ? new THREE.BoxGeometry(...size)
      : new RoundedBoxGeometry(...size, 4, Math.min(radius, smallest * 0.45))
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(...position)
  return solid(mesh)
}

export function cylinder(
  radius: number,
  height: number,
  material: THREE.Material,
  position: [number, number, number] = [0, 0, 0]
) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 64), material)
  mesh.position.set(...position)
  return solid(mesh)
}

/** Ramię o zaokrąglonych końcach, biegnące wzdłuż osi X albo Y. */
function capsule(
  radius: number,
  length: number,
  material: THREE.Material,
  position: [number, number, number],
  axis: "x" | "y" = "y"
) {
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 12, 40), material)
  mesh.position.set(...position)
  if (axis === "x") mesh.rotation.z = Math.PI / 2
  return solid(mesh)
}

function sphere(radius: number, material: THREE.Material, position: [number, number, number]) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 32), material)
  mesh.position.set(...position)
  return solid(mesh)
}

function canvasTexture(width: number, height: number, draw: (c: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  draw(canvas.getContext("2d") as CanvasRenderingContext2D)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

let wordmarkSource: Promise<{ path: Path2D; box: number[]; dot: number[] }> | undefined

export function loadWordmark() {
  wordmarkSource ??= fetch("/images/hero/omnimes-wordmark.svg")
    .then((response) => response.text())
    .then((svg) => ({
      path: new Path2D(svg.match(/ d="([^"]+)"/)?.[1] ?? ""),
      box: (svg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 1 1").split(" ").map(Number),
      dot: ["cx", "cy", "r"].map((name) =>
        Number(svg.match(new RegExp(` ${name}="([^"]+)"`))?.[1] ?? 0)
      ),
    }))
  return wordmarkSource
}

/** Logo OmniMES jako płaski znak w scenie. */
export function addWordmark(
  parent: THREE.Object3D,
  width: number,
  position: [number, number, number],
  options: { flat?: boolean; opacity?: number } = {}
) {
  const material = new THREE.MeshBasicMaterial({
    color: 0xdcdcdc,
    transparent: true,
    opacity: options.opacity ?? 1,
    depthWrite: false,
    toneMapped: false,
    visible: false,
  })
  const plate = new THREE.Mesh(new THREE.PlaneGeometry(width, width / 5.09), material)
  plate.position.set(...position)
  if (options.flat) plate.rotation.x = -Math.PI / 2
  parent.add(plate)

  loadWordmark()
    .then(({ path, box, dot }) => {
      const scale = 1536 / box[2]
      const texture = canvasTexture(1536, Math.round(box[3] * scale), (c) => {
        c.scale(scale, scale)
        c.translate(-box[0], -box[1])
        c.fillStyle = "#ffffff"
        c.fill(path, "evenodd")
        c.fillStyle = "#1a8cff"
        c.beginPath()
        c.arc(dot[0], dot[1], dot[2], 0, Math.PI * 2)
        c.fill()
      })
      material.map = texture
      material.visible = true
      material.needsUpdate = true
    })
    .catch(() => {})
}

/** Napis na podłodze, czytelny z góry. */
export function addFloorText(
  parent: THREE.Object3D,
  text: string,
  width: number,
  position: [number, number, number]
) {
  const texture = canvasTexture(1024, 200, (c) => {
    c.font = "800 150px system-ui, 'Segoe UI', sans-serif"
    c.textAlign = "center"
    c.textBaseline = "middle"
    c.fillStyle = "#ffffff"
    c.fillText(text, 512, 104)
  })
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(width, width / 5.12),
    new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xc8c8c8,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    })
  )
  plate.position.set(...position)
  plate.rotation.x = -Math.PI / 2
  parent.add(plate)
}

function hazardMaterial() {
  const texture = canvasTexture(128, 32, (c) => {
    c.fillStyle = "#12141c"
    c.fillRect(0, 0, 128, 32)
    c.fillStyle = "#f2b01e"
    for (let x = -32; x < 160; x += 32) {
      c.beginPath()
      c.moveTo(x, 32)
      c.lineTo(x + 16, 32)
      c.lineTo(x + 32, 0)
      c.lineTo(x + 16, 0)
      c.fill()
    }
  })
  return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.6 })
}

/** Panel operatora na słupku. */
export function makeHmi() {
  const group = new THREE.Group()
  group.add(cylinder(0.05, 1.15, steel(COLORS.steelLight), [0, 0.58, 0]))
  group.add(box([0.9, 0.62, 0.1], paint(0x1a2133), [0, 1.42, 0]))
  const texture = canvasTexture(256, 160, (c) => {
    c.fillStyle = "#08101f"
    c.fillRect(0, 0, 256, 160)
    c.fillStyle = "#2f9bff"
    c.fillRect(14, 14, 228, 22)
    ;["#22e58a", "#22e58a", "#22e58a", "#ffb020"].forEach((color, index) => {
      c.fillStyle = color
      c.fillRect(14 + index * 58, 50, 50, 40)
    })
    c.fillStyle = "#28344f"
    c.fillRect(14, 104, 228, 12)
    c.fillRect(14, 126, 150, 12)
  })
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.8, 0.5),
    new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, color: 0xa8a8a8 })
  )
  screen.position.set(0, 1.42, 0.056)
  group.add(screen)
  return group
}

/** Kolumna sygnalizacyjna maszyny. */
export function makeStackLight() {
  const group = new THREE.Group()
  const lamps = (["stop", "warn", "run"] as MachineState[]).map((state, index) => {
    const material = glow(STATE_COLOR[state], 0.08)
    const lamp = cylinder(0.11, 0.2, material, [0, 0.24 + (2 - index) * 0.21, 0])
    group.add(lamp)
    return { state, material }
  })
  group.add(cylinder(0.05, 0.16, steel(), [0, 0.06, 0]))
  group.add(sphere(0.11, steel(COLORS.steelLight), [0, 0.68, 0]))

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
  const rail = steel(0x9aa7c4)
  group.add(box([length, 0.2, 0.09], rail, [0, 0.78, 0.7]))
  group.add(box([length, 0.2, 0.09], rail, [0, 0.78, -0.7]))
  group.add(box([length, 0.05, 0.03], glow(COLORS.blue, 1.1), [0, 0.74, 0.76]))
  group.add(box([length, 0.14, 1.3], steel(), [0, 0.64, 0]))
  ;[-length / 2, length / 2].forEach((x) => {
    const roller = cylinder(0.14, 1.34, steel(0x9aa7c4), [x, 0.79, 0])
    roller.rotation.x = Math.PI / 2
    group.add(roller)
  })

  const texture = canvasTexture(256, 32, (c) => {
    c.fillStyle = "#0a0d18"
    c.fillRect(0, 0, 256, 32)
    c.fillStyle = "#26304e"
    for (let x = 0; x < 256; x += 32) c.fillRect(x, 0, 5, 32)
  })
  texture.wrapS = THREE.RepeatWrapping
  texture.repeat.set(length / 1.4, 1)
  const belt = new THREE.Mesh(
    new THREE.BoxGeometry(length, 0.04, 1.26),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.85 })
  )
  belt.position.y = 0.87
  belt.receiveShadow = true
  group.add(belt)

  const leg = steel(COLORS.steelLight)
  for (let x = -length / 2 + 1; x < length / 2; x += 2.6) {
    group.add(box([0.12, 0.6, 0.12], leg, [x, 0.3, 0.6]))
    group.add(box([0.12, 0.6, 0.12], leg, [x, 0.3, -0.6]))
    group.add(box([0.1, 0.08, 1.2], leg, [x, 0.22, 0]))
  }

  return {
    group,
    update(delta: number, speed: number) {
      texture.offset.x -= delta * speed * 0.55
    },
  }
}

/** Wyroby zmieniają wygląd po każdej maszynie: blacha, wytłoczka, detal, karton. */
export function makeProducts(count: number, length: number, stages: number[], pickAt = Infinity) {
  const looks = [
    { color: new THREE.Color(0xc2cadb), scale: [1, 0.42, 1] },
    { color: new THREE.Color(0x9fb0d4), scale: [1, 0.78, 1] },
    { color: new THREE.Color(0x5b8cff), scale: [0.94, 1, 0.94] },
    { color: new THREE.Color(0xc99a63), scale: [1.16, 1.3, 1.16] },
  ]
  const mesh = new THREE.InstancedMesh(
    new RoundedBoxGeometry(0.5, 0.34, 0.6, 4, 0.05),
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.28, roughness: 0.42 }),
    count
  )
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.frustumCulled = false
  const matrix = new THREE.Matrix4()
  const spacing = length / count
  let distance = 0

  return {
    mesh,
    spacing,
    distance: () => distance,
    update(delta: number, speed: number) {
      distance += delta * speed * 1.2
      for (let index = 0; index < count; index += 1) {
        const x = ((distance + index * spacing) % length) - length / 2
        const look = looks[Math.min(stages.filter((stage) => x > stage).length, looks.length - 1)]
        const height = 0.34 * look.scale[1]
        const size = x > pickAt ? 0 : 1
        matrix
          .makeScale(look.scale[0] * size, look.scale[1] * size, look.scale[2] * size)
          .setPosition(x, 0.89 + height / 2, 0)
        mesh.setMatrixAt(index, matrix)
        mesh.setColorAt(index, look.color)
      }
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    },
  }
}

/** Iskry przy obróbce. */
export function makeSparks(count: number) {
  const positions = new Float32Array(count * 3).fill(-100)
  const velocities = Array.from({ length: count }, () => new THREE.Vector3())
  const ages = new Float32Array(count).fill(1)
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const dot = canvasTexture(32, 32, (c) => {
    const gradient = c.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, "rgba(255,255,255,1)")
    gradient.addColorStop(1, "rgba(255,255,255,0)")
    c.fillStyle = gradient
    c.fillRect(0, 0, 32, 32)
  })
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      map: dot,
      color: 0xffc46b,
      size: 0.14,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
  )
  points.frustumCulled = false
  let next = 0

  return {
    points,
    burst(origin: THREE.Vector3, amount: number) {
      for (let index = 0; index < amount; index += 1) {
        const id = next
        next = (next + 1) % count
        ages[id] = 0
        positions[id * 3] = origin.x
        positions[id * 3 + 1] = origin.y
        positions[id * 3 + 2] = origin.z
        velocities[id].set(
          (Math.random() - 0.5) * 3,
          Math.random() * 1.8 + 0.4,
          (Math.random() - 0.5) * 3
        )
      }
    },
    update(delta: number) {
      for (let id = 0; id < count; id += 1) {
        if (ages[id] >= 1) {
          positions[id * 3 + 1] = -100
          continue
        }
        ages[id] += delta * 2.4
        velocities[id].y -= delta * 7
        positions[id * 3] += velocities[id].x * delta
        positions[id * 3 + 1] += velocities[id].y * delta
        positions[id * 3 + 2] += velocities[id].z * delta
      }
      geometry.attributes.position.needsUpdate = true
    },
  }
}

export function makePress() {
  const group = new THREE.Group()
  const body = paint(COLORS.body)
  group.add(box([2.5, 0.42, 1.5], paint(COLORS.steelLight), [0, 0.21, -0.08], 0.08))
  group.add(box([0.38, 3.1, 0.5], body, [-1, 1.65, 0], 0.09))
  group.add(box([0.38, 3.1, 0.5], body, [1, 1.65, 0], 0.09))
  group.add(box([2.5, 0.72, 1.14], body, [0, 3.32, 0], 0.12))
  group.add(box([2.36, 0.1, 0.03], hazardMaterial(), [0, 3.1, 0.58]))
  ;[-0.46, 0.46].forEach((x) => group.add(cylinder(0.05, 1.5, steel(0xa7b3cc), [x, 2.25, 0])))
  const ram = box([1.42, 0.6, 0.94], paint(0x3f4d73), [0, 2.1, 0], 0.08)
  group.add(ram)
  addWordmark(group, 1.7, [0, 3.34, 0.585])
  const strip = box([1.1, 0.05, 0.03], glow(COLORS.blue), [0, 0, 0.48])
  ram.add(strip)
  let wasDown = false

  return {
    group,
    update(time: number, running: boolean) {
      if (!running) return false
      ram.position.y = 1.62 + Math.abs(Math.sin(time * 2.2)) * 1.05
      const down = ram.position.y < 1.68
      const hit = down && !wasDown
      wasDown = down
      return hit
    },
  }
}

export function makeCnc() {
  const group = new THREE.Group()
  const body = paint(COLORS.bright)
  group.add(box([2.6, 2.5, 2], body, [0, 1.25, 0], 0.16))
  group.add(box([2.66, 0.36, 2.06], paint(0x28324f), [0, 0.18, 0], 0.08))
  group.add(box([2.4, 0.08, 0.03], hazardMaterial(), [0, 0.42, 1.02]))
  const glass = new THREE.MeshStandardMaterial({
    color: 0x0b1a33,
    emissive: COLORS.blue,
    emissiveIntensity: 0.55,
    metalness: 0.4,
    roughness: 0.12,
  })
  group.add(box([1.5, 1.1, 0.06], paint(0x28324f), [-0.25, 1.46, 1]))
  group.add(box([1.36, 0.96, 0.03], glass, [-0.25, 1.46, 1.03]))
  group.add(box([0.05, 0.62, 0.05], steel(0xa7b3cc), [0.42, 1.46, 1.06]))
  const spindle = cylinder(0.08, 0.72, glow(COLORS.violet, 2), [0, 1.5, 1.05])
  group.add(spindle)
  const panel = box([0.5, 0.86, 0.08], paint(0x1a2133), [0.92, 1.46, 1.02])
  group.add(panel)
  ;[COLORS.green, COLORS.amber, COLORS.blue].forEach((color, index) => {
    group.add(box([0.1, 0.05, 0.02], glow(color, 1.6), [0.8 + index * 0.12, 1.74, 1.07]))
  })

  return {
    group,
    update(time: number, running: boolean) {
      glass.emissiveIntensity = running ? 0.6 + Math.sin(time * 6) * 0.18 : 0.12
      if (running) spindle.position.x = -0.25 + Math.sin(time * 1.4) * 0.48
    },
  }
}

const UPPER_ARM = 1.7
const FOREARM = 1.52
const SHOULDER_HEIGHT = 0.52

export function makeRobot() {
  const group = new THREE.Group()
  const body = paint(COLORS.robot, 0.34)
  const joint = paint(0x1d2336, 0.4)
  group.add(cylinder(0.62, 0.14, paint(0x28324f), [0, 0.07, 0]))
  group.add(cylinder(0.44, 0.34, body, [0, 0.31, 0]))
  const shoulder = new THREE.Group()
  shoulder.position.y = SHOULDER_HEIGHT
  group.add(shoulder)
  shoulder.add(sphere(0.3, joint, [0, 0, 0]))
  const upper = new THREE.Group()
  shoulder.add(upper)
  upper.add(capsule(0.17, 1.42, body, [0, 0.85, 0]))
  const elbow = new THREE.Group()
  elbow.position.y = UPPER_ARM
  upper.add(elbow)
  elbow.add(sphere(0.25, joint, [0, 0, 0]))
  elbow.add(cylinder(0.15, 0.56, glow(COLORS.magenta, 1.2)).rotateX(Math.PI / 2))
  elbow.add(capsule(0.13, 1.2, body, [0.76, 0, 0], "x"))
  const wrist = new THREE.Group()
  wrist.position.x = FOREARM
  elbow.add(wrist)
  wrist.add(sphere(0.15, joint, [0, 0, 0]))
  wrist.add(box([0.3, 0.1, 0.34], steel(0xa7b3cc), [0, -0.2, 0], 0.03))
  wrist.add(box([0.05, 0.3, 0.09], steel(0xa7b3cc), [-0.11, -0.38, 0]))
  wrist.add(box([0.05, 0.3, 0.09], steel(0xa7b3cc), [0.11, -0.38, 0]))

  return {
    group,
    /** Ustawia nadgarstek w punkcie, chwytak zawsze patrzy w dół. */
    reach(x: number, y: number, z: number) {
      shoulder.rotation.y = Math.atan2(-z, x)
      const radial = Math.hypot(x, z)
      const height = y - SHOULDER_HEIGHT
      const span = Math.min(Math.hypot(radial, height), UPPER_ARM + FOREARM - 0.02)
      const first =
        Math.atan2(height, radial) +
        Math.acos((UPPER_ARM ** 2 + span ** 2 - FOREARM ** 2) / (2 * UPPER_ARM * span))
      const inner = Math.acos(
        (UPPER_ARM ** 2 + FOREARM ** 2 - span ** 2) / (2 * UPPER_ARM * FOREARM)
      )
      const second = first - (Math.PI - inner)
      upper.rotation.z = first - Math.PI / 2
      elbow.rotation.z = second - upper.rotation.z
      wrist.rotation.z = -second
    },
  }
}

/** Robot zdejmuje kartony z końca linii i układa je warstwami na palecie. */
export function makePalletCell(options: {
  base: [number, number]
  pickX: number
  pallet: [number, number]
  spacing: number
  length: number
}) {
  const { base, pickX, pallet, spacing, length } = options
  const group = new THREE.Group()
  const robot = makeRobot()
  robot.group.position.set(base[0], 0, base[1])
  group.add(robot.group)

  const wood = paint(0xa27a4e, 0.72)
  for (let index = -1; index <= 1; index += 1) {
    group.add(box([2.2, 0.14, 0.2], wood, [pallet[0], 0.07, pallet[1] + index * 0.62], 0.02))
  }
  for (let index = -3; index <= 3; index += 1) {
    group.add(box([0.26, 0.06, 1.5], wood, [pallet[0] + index * 0.31, 0.17, pallet[1]], 0.02))
  }

  const cartonSize: [number, number, number] = [0.58, 0.44, 0.69]
  const cartonGeometry = new RoundedBoxGeometry(...cartonSize, 4, 0.04)
  const cartonMaterial = paint(0xc99a63, 0.6)
  const slots: THREE.Vector3[] = []
  for (let layer = 0; layer < 2; layer += 1) {
    for (let row = 0; row < 2; row += 1) {
      for (let column = 0; column < 3; column += 1) {
        slots.push(
          new THREE.Vector3(
            pallet[0] + (column - 1) * 0.66,
            0.2 + cartonSize[1] * (layer + 0.5),
            pallet[1] + (row - 0.5) * 0.74
          )
        )
      }
    }
  }
  const stack = new THREE.InstancedMesh(cartonGeometry, cartonMaterial, slots.length)
  stack.castShadow = true
  stack.receiveShadow = true
  stack.frustumCulled = false
  const matrix = new THREE.Matrix4()
  slots.forEach((slot, index) => stack.setMatrixAt(index, matrix.makeTranslation(slot)))
  stack.count = 0
  group.add(stack)
  const held = new THREE.Mesh(cartonGeometry, cartonMaterial)
  held.castShadow = true
  group.add(held)

  const polar = (x: number, y: number, z: number) => ({
    angle: Math.atan2(z - base[1], x - base[0]),
    radius: Math.hypot(x - base[0], z - base[1]),
    y,
  })
  const beltTop = 0.89 + cartonSize[1]
  const lifted = 2.5
  const release = 0.54
  const keys = [0, 0.14, 0.42, release, 0.66, 0.9, 1]
  const smooth = (value: number) => value * value * (3 - 2 * value)

  return {
    group,
    /** Ruch wynika z drogi taśmy, więc robot zawsze trafia w karton i staje razem z linią. */
    update(distance: number) {
      const cycle = (distance - (pickX + length / 2)) / spacing
      const round = Math.floor(cycle)
      const phase = cycle - round
      const placed = ((round % slots.length) + slots.length) % slots.length
      const slot = slots[placed]
      const top = slot.y + cartonSize[1] / 2

      const pick = polar(pickX, beltTop, 0)
      const pickHigh = { ...pick, y: lifted }
      const drop = polar(slot.x, top, slot.z)
      const dropHigh = { ...drop, y: lifted }
      const route = [pick, pickHigh, dropHigh, drop, dropHigh, pickHigh, pick]

      let segment = 0
      while (phase > keys[segment + 1]) segment += 1
      const from = route[segment]
      const to = route[segment + 1]
      const blend = smooth((phase - keys[segment]) / (keys[segment + 1] - keys[segment]))
      const angle =
        from.angle +
        Math.atan2(Math.sin(to.angle - from.angle), Math.cos(to.angle - from.angle)) * blend
      const radius = from.radius + (to.radius - from.radius) * blend
      const y = from.y + (to.y - from.y) * blend

      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      robot.reach(x, y + 0.53, z)

      const carrying = phase < release
      held.visible = carrying
      held.position.set(base[0] + x, y - cartonSize[1] / 2, base[1] + z)
      held.rotation.y = -angle + pick.angle
      stack.count = placed + (carrying ? 0 : 1)
    },
  }
}

export function makePacker() {
  const group = new THREE.Group()
  const body = paint(COLORS.body)
  group.add(box([0.3, 2.4, 2], body, [-0.95, 1.2, 0], 0.08))
  group.add(box([0.3, 2.4, 2], body, [0.95, 1.2, 0], 0.08))
  group.add(box([2.3, 0.56, 2.1], paint(COLORS.bright), [0, 2.6, 0], 0.14))
  group.add(box([2.1, 0.08, 0.03], hazardMaterial(), [0, 2.32, 1.06]))
  const beam = box([1.5, 0.05, 1.5], glow(COLORS.green, 2), [0, 1.6, 0])
  group.add(beam)

  return {
    group,
    update(time: number, running: boolean) {
      beam.position.y = running ? 1.55 + Math.sin(time * 3) * 0.3 : 1.55
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

export function createStage(
  canvas: HTMLCanvasElement,
  options: { compact: boolean; shadowSpan?: number }
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance",
  })
  renderer.setClearColor(0x000000, 1)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(COLORS.background, 26, 70)
  const environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04)
  scene.environment = environment.texture
  scene.environmentIntensity = 0.5
  scene.add(new THREE.HemisphereLight(0x8aa4ff, 0x10122a, 1.6))

  const sun = new THREE.DirectionalLight(0xffffff, 2.2)
  sun.position.set(6, 14, 10)
  sun.castShadow = !options.compact
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.bias = -0.0004
  sun.shadow.normalBias = 0.03
  sun.shadow.radius = 5
  const span = options.shadowSpan ?? 16
  sun.shadow.camera.left = -span
  sun.shadow.camera.right = span
  sun.shadow.camera.top = span
  sun.shadow.camera.bottom = -span
  sun.shadow.camera.near = 1
  sun.shadow.camera.far = 60
  scene.add(sun, sun.target)

  const rim = new THREE.DirectionalLight(COLORS.violet, 2.4)
  rim.position.set(-8, 6, -10)
  scene.add(rim)
  const grid = new THREE.GridHelper(160, 160, 0x1c2848, 0x121a33)
  grid.position.y = -0.02
  scene.add(grid)

  // Cień pada na przezroczystą płaszczyznę, żeby fala punktów pozostała widoczna
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.ShadowMaterial({ opacity: 0.62, depthWrite: false })
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = 0.002
  ground.receiveShadow = true
  ground.renderOrder = 2
  scene.add(ground)

  const camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 200)
  // Efekty renderują do osobnego bufora, więc wygładzanie krawędzi trzeba włączyć tutaj
  const target = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    samples: options.compact ? 4 : 8,
  })
  const composer = new EffectComposer(renderer, target)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.42, 0.5, 0.74)
  if (!options.compact) composer.addPass(bloom)
  composer.addPass(new OutputPass())

  let limit = 2
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
    sun,
    render: () => composer.render(),
    degrade() {
      bloom.enabled = false
      sun.castShadow = false
      limit = 1.25
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
      target.dispose()
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
