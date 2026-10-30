import * as THREE from "three"

import {
  box,
  COLORS,
  createStage,
  cylinder,
  glow,
  makeConveyor,
  makePress,
  makeProducts,
  makeRobot,
  makeStackLight,
  makeWaveField,
  runLoop,
  steel,
  textSprite,
} from "./kit"

export type EcosystemLabels = {
  stations: string[]
  panels: { role: string; kind: "status" | "alarms" | "oee" | "energy" | "report" }[]
}

export const STAGE_COUNT = 7
const STAGE_SECONDS = 6.5

// Węzły ułożone zygzakiem, żeby widok ogólny wypełniał kadr
const NODES = [
  [0, -8],
  [10, 5],
  [19, -8],
  [28, 5],
  [37, -8],
  [52, 5],
] as const
const NODE_X = NODES.map(([x]) => x)
const NODE_Z = NODES.map(([, z]) => z)

function makeCabinet() {
  const group = new THREE.Group()
  group.add(box([3, 4.4, 0.25], steel(), [0, 2.2, -0.9]))
  group.add(box([0.14, 4.4, 1.2], steel(COLORS.steelLight), [-1.5, 2.2, -0.3]))
  group.add(box([0.14, 4.4, 1.2], steel(COLORS.steelLight), [1.5, 2.2, -0.3]))
  group.add(box([3, 0.14, 1.2], steel(COLORS.steelLight), [0, 4.4, -0.3]))
  group.add(box([3, 0.14, 1.2], steel(COLORS.steelLight), [0, 0, -0.3]))
  group.add(box([2.6, 0.08, 0.1], steel(0x6b7692), [0, 3, -0.7]))
  group.add(box([2.6, 0.08, 0.1], steel(0x6b7692), [0, 1.5, -0.7]))

  const leds: THREE.MeshStandardMaterial[] = []
  for (let index = 0; index < 6; index += 1) {
    const x = -1.05 + index * 0.42
    group.add(box([0.36, 1, 0.5], steel(index === 0 ? 0x2a3f6e : 0x262f47), [x, 3, -0.45]))
    for (let led = 0; led < 3; led += 1) {
      const material = glow(led === 2 ? COLORS.amber : COLORS.green, 2)
      group.add(box([0.07, 0.05, 0.02], material, [x, 3.3 - led * 0.13, -0.2]))
      leds.push(material)
    }
  }
  return { group, leds }
}

function makeGateway(label: string) {
  const group = new THREE.Group()
  group.add(box([2.4, 3, 0.2], steel(), [0, 1.9, -0.6]))
  group.add(box([2.2, 0.08, 0.1], steel(0x6b7692), [0, 1.9, -0.46]))
  group.add(box([1.5, 2.1, 0.7], steel(0x2a3145), [0, 1.9, -0.1]))

  const canvas = document.createElement("canvas")
  canvas.width = 384
  canvas.height = 96
  const context = canvas.getContext("2d") as CanvasRenderingContext2D
  context.fillStyle = "#0d1322"
  context.fillRect(0, 0, 384, 96)
  context.font = "700 54px system-ui, 'Segoe UI', sans-serif"
  context.fillStyle = "#dfe7ff"
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.fillText(label, 192, 52)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(1.24, 0.31),
    new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
  )
  plate.position.set(0, 2.5, 0.26)
  group.add(plate)

  const leds: THREE.MeshStandardMaterial[] = []
  ;[COLORS.green, COLORS.blue, COLORS.amber].forEach((color, index) => {
    const material = glow(color, 2.2)
    group.add(box([0.1, 0.1, 0.02], material, [-0.4 + index * 0.25, 2.14, 0.26]))
    leds.push(material)
  })
  // Gniazda Ethernet i COM
  for (let index = 0; index < 3; index += 1) {
    group.add(box([0.34, 0.26, 0.04], steel(0x080b12), [-0.42 + index * 0.42, 1.34, 0.25]))
  }
  return { group, leds }
}

function makeServer() {
  const group = new THREE.Group()
  group.add(box([2.6, 5, 2], steel(), [0, 2.5, 0]))
  const leds: THREE.MeshStandardMaterial[] = []
  for (let unit = 0; unit < 7; unit += 1) {
    const y = 0.7 + unit * 0.62
    group.add(box([2.3, 0.5, 0.05], steel(0x10172a), [0, y, 1.02]))
    group.add(box([1.2, 0.05, 0.02], glow(COLORS.blue, 1.4), [-0.3, y, 1.06]))
    const material = glow(unit % 3 === 0 ? COLORS.magenta : COLORS.green, 2.4)
    group.add(box([0.1, 0.1, 0.02], material, [0.9, y, 1.06]))
    leds.push(material)
  }
  return { group, leds }
}

function makeDatabase() {
  const group = new THREE.Group()
  const rings: THREE.MeshStandardMaterial[] = []
  for (let index = 0; index < 3; index += 1) {
    const y = 0.75 + index * 1.45
    group.add(cylinder(1.7, 1.15, steel(COLORS.steelLight), [0, y, 0]))
    const material = glow(index === 1 ? COLORS.violet : COLORS.blue, 1.9)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.035, 12, 80), material)
    ring.rotation.x = Math.PI / 2
    ring.position.y = y + 0.58
    group.add(ring)
    rings.push(material)
  }
  return { group, rings }
}

function panelTexture(role: string, kind: EcosystemLabels["panels"][number]["kind"]) {
  const canvas = document.createElement("canvas")
  canvas.width = 640
  canvas.height = 400
  const c = canvas.getContext("2d") as CanvasRenderingContext2D
  c.fillStyle = "#0a0f1f"
  c.fillRect(0, 0, 640, 400)
  c.fillStyle = "#e8edff"
  c.font = "600 42px system-ui, 'Segoe UI', sans-serif"
  c.textBaseline = "middle"
  c.fillText(role, 32, 50)
  c.fillStyle = "#222b47"
  c.fillRect(32, 86, 576, 2)

  const green = "#22e58a"
  const red = "#ff3b5c"
  const blue = "#2f9bff"
  const violet = "#7c5cff"
  if (kind === "status") {
    for (let index = 0; index < 8; index += 1) {
      c.fillStyle = index === 5 ? red : green
      c.fillRect(32 + (index % 4) * 146, 116 + Math.floor(index / 4) * 136, 124, 112)
    }
  } else if (kind === "alarms") {
    for (let index = 0; index < 5; index += 1) {
      c.fillStyle = index === 0 ? red : index === 1 ? "#ffb020" : "#2a3657"
      c.fillRect(32, 116 + index * 52, 18, 34)
      c.fillStyle = "#2a3657"
      c.fillRect(64, 122 + index * 52, 544 - index * 60, 22)
    }
  } else if (kind === "oee") {
    ;[0.86, 0.72, 0.93].forEach((value, index) => {
      c.strokeStyle = "#222b47"
      c.lineWidth = 22
      c.beginPath()
      c.arc(128 + index * 192, 240, 72, 0, Math.PI * 2)
      c.stroke()
      c.strokeStyle = index === 1 ? "#ffb020" : green
      c.beginPath()
      c.arc(128 + index * 192, 240, 72, -Math.PI / 2, -Math.PI / 2 + value * Math.PI * 2)
      c.stroke()
    })
  } else if (kind === "energy") {
    c.strokeStyle = violet
    c.lineWidth = 6
    c.beginPath()
    ;[0.5, 0.45, 0.6, 0.42, 0.38, 0.8, 0.46, 0.4, 0.36, 0.33].forEach((value, index) => {
      const x = 40 + index * 62
      const y = 360 - value * 250
      if (index === 0) c.moveTo(x, y)
      else c.lineTo(x, y)
    })
    c.stroke()
  } else {
    ;[0.4, 0.55, 0.5, 0.7, 0.65, 0.8, 0.9].forEach((value, index) => {
      c.fillStyle = index === 6 ? violet : blue
      c.fillRect(44 + index * 82, 370 - value * 260, 56, value * 260)
    })
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function makePanel(role: string, kind: EcosystemLabels["panels"][number]["kind"]) {
  const group = new THREE.Group()
  group.add(box([3.3, 2.15, 0.12], steel(0x141a2c), [0, 2.55, 0]))
  group.add(
    new THREE.Mesh(
      new THREE.PlaneGeometry(3.12, 1.95),
      new THREE.MeshBasicMaterial({
        map: panelTexture(role, kind),
        color: 0xb4b4b4,
        toneMapped: false,
      })
    )
  )
  ;(group.children[1] as THREE.Mesh).position.set(0, 2.55, 0.07)
  group.add(box([0.18, 1.5, 0.18], steel(COLORS.steelLight), [0, 0.75, -0.04]))
  group.add(box([1.2, 0.08, 0.7], steel(COLORS.steelLight), [0, 0.04, 0]))
  return group
}

export function mountEcosystem(
  canvas: HTMLCanvasElement,
  labels: EcosystemLabels,
  options: { compact: boolean; still: boolean; onStage: (stage: number) => void }
) {
  const stage = createStage(canvas, options)
  const { scene, camera } = stage
  scene.fog = new THREE.Fog(COLORS.background, 40, 110)

  const wave = makeWaveField(110, 44, options.compact ? 1.1 : 1.8)
  wave.points.position.set(26, 0, -2)
  scene.add(wave.points)

  // 1. Linia produkcyjna
  const line = new THREE.Group()
  const conveyor = makeConveyor(9)
  const products = makeProducts(5, 9)
  const press = makePress()
  const robot = makeRobot()
  const lamp = makeStackLight()
  press.group.position.x = -2
  robot.group.position.set(2, 0, 1.45)
  lamp.group.position.set(-0.75, 2.6, 0.4)
  line.add(conveyor.group, products.mesh, press.group, robot.group, lamp.group)
  line.position.set(NODE_X[0], 0, NODE_Z[0])
  scene.add(line)

  // 2–5. Sterownik, bramka, serwer, baza
  const cabinet = makeCabinet()
  cabinet.group.position.set(NODE_X[1], 0, NODE_Z[1])
  const gateway = makeGateway("cMT-G01")
  gateway.group.position.set(NODE_X[2], 0, NODE_Z[2])
  const server = makeServer()
  server.group.position.set(NODE_X[3], 0, NODE_Z[3])
  const database = makeDatabase()
  database.group.position.set(NODE_X[4], 0, NODE_Z[4])
  scene.add(cabinet.group, gateway.group, server.group, database.group)

  // 6. Panele dla ludzi w zakładzie
  const spread = labels.panels.length
  const panelSpots = labels.panels.map((panel, index) => {
    const offset = index - (spread - 1) / 2
    const group = makePanel(panel.role, panel.kind)
    group.position.set(NODE_X[5] + offset * 3.7, 0, NODE_Z[5] - Math.abs(offset) * 0.9)
    group.rotation.y = -offset * 0.12
    scene.add(group)
    return group.position.clone().add(new THREE.Vector3(0, 0.5, 0.3))
  })

  // Etykiety nad węzłami
  const captions = labels.stations.map((text, index) => {
    const sprite = textSprite(text, 5.2)
    const height = [4.6, 5.3, 4.2, 5.8, 5.2, 4.9][index]
    sprite.position.set(NODE_X[index], height, NODE_Z[index] + 0.6)
    scene.add(sprite)
    return sprite
  })

  // Trasa danych i rozgałęzienie do paneli
  const y = 0.14
  const route = [new THREE.Vector3(NODE_X[0] + 4.5, y, NODE_Z[0] + 0.9)]
  for (let index = 1; index <= 4; index += 1) {
    const middle = (NODE_X[index - 1] + NODE_X[index]) / 2
    route.push(new THREE.Vector3(middle, y, (NODE_Z[index - 1] + NODE_Z[index]) / 2 + 1.5))
    route.push(new THREE.Vector3(NODE_X[index], y, NODE_Z[index] + 1.4))
  }
  const main = new THREE.CatmullRomCurve3(route, false, "centripetal")
  const fork = route[route.length - 1]
  const branches = panelSpots.map(
    (spot) =>
      new THREE.CatmullRomCurve3(
        [
          fork.clone(),
          new THREE.Vector3(NODE_X[4] + 5, y, NODE_Z[4] + 3.4),
          new THREE.Vector3(spot.x, y, spot.z - 1.8),
          new THREE.Vector3(spot.x, y, spot.z),
        ],
        false,
        "centripetal"
      )
  )
  const cable = new THREE.MeshStandardMaterial({
    color: 0x0b1020,
    emissive: COLORS.blue,
    emissiveIntensity: 0.65,
  })
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(main, 260, 0.05, 8), cable))
  for (const branch of branches) {
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(branch, 60, 0.04, 8), cable))
  }

  const count = options.compact ? 40 : 90
  const packets = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.085, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x9fd8ff, toneMapped: false }),
    count
  )
  packets.frustumCulled = false
  scene.add(packets)
  const states = Array.from({ length: count }, (_, index) => ({
    progress: index / count,
    branch: index % branches.length,
  }))

  const focus = new THREE.PointLight(0xffffff, 120, 20)
  focus.position.set(0, 7, 6)
  scene.add(focus)

  const closeUps = [
    [1, 7.5, 17],
    [2.5, 4.8, 11.5],
    [1.8, 3.9, 9],
    [3.5, 5, 13.5],
    [3, 5, 13.5],
    [0, 3.9, 17.5],
  ]
  const cameras = closeUps.map(([x, height, z], index) => ({
    position: new THREE.Vector3(NODE_X[index] + x, height, NODE_Z[index] + z),
    look: new THREE.Vector3(NODE_X[index], index === 5 ? 2 : 2.7, NODE_Z[index]),
  }))
  const wide = camera.aspect >= 1.6 ? 1 : 1.75
  cameras.push({
    position: new THREE.Vector3(27.5, 41 * wide, 45 * wide),
    look: new THREE.Vector3(27.5, 0, -1.5),
  })

  let current = options.still ? STAGE_COUNT - 1 : 0
  let elapsed = 0
  const lookAt = cameras[current].look.clone()
  camera.position.copy(cameras[current].position)
  camera.lookAt(lookAt)
  options.onStage(current)

  const matrix = new THREE.Matrix4()
  const spot = new THREE.Vector3()
  const blink = (materials: THREE.MeshStandardMaterial[], time: number, rate: number) => {
    materials.forEach((material, index) => {
      material.emissiveIntensity = Math.sin(time * rate + index * 2.1) > 0.1 ? 2.6 : 0.2
    })
  }

  const frame = (delta: number, time: number, real = delta) => {
    elapsed += real
    if (!options.still && elapsed > STAGE_SECONDS) {
      elapsed = 0
      current = (current + 1) % STAGE_COUNT
      options.onStage(current)
    }

    const shot = cameras[current]
    const ease = 1 - Math.exp(-real * 1.7)
    camera.position.lerp(shot.position, ease)
    lookAt.lerp(shot.look, ease)
    camera.lookAt(lookAt)
    focus.position.lerp(spot.set(shot.look.x, 7, shot.look.z + 6), ease)
    const scale = current === STAGE_COUNT - 1 ? 1.9 : 1
    for (const caption of captions) {
      caption.scale.x += (5.2 * scale - caption.scale.x) * ease
      caption.scale.y = caption.scale.x / 6
    }

    conveyor.update(delta, 1)
    products.update(delta, 1)
    press.update(time, true)
    robot.update(time, true)
    lamp.set("run", time)
    wave.update(time)
    blink(cabinet.leds, time, 7)
    blink(gateway.leds, time, 11)
    blink(server.leds, time, 9)
    database.rings.forEach((ring, index) => {
      ring.emissiveIntensity = 1.5 + Math.sin(time * 2.4 + index * 1.4) * 0.9
    })

    states.forEach((packet, index) => {
      packet.progress += delta * 0.075
      if (packet.progress >= 2) {
        packet.progress -= 2
        packet.branch = (packet.branch + 1) % branches.length
      }
      if (packet.progress < 1) main.getPointAt(packet.progress, spot)
      else branches[packet.branch].getPointAt(packet.progress - 1, spot)
      spot.y += 0.04
      matrix.makeTranslation(spot.x, spot.y, spot.z)
      packets.setMatrixAt(index, matrix)
    })
    packets.instanceMatrix.needsUpdate = true
    stage.render()
  }

  // Bez animacji: jedna klatka, a kamera przeskakuje na wybrany etap
  const still = () => {
    camera.position.copy(cameras[current].position)
    lookAt.copy(cameras[current].look)
    frame(0.016, 1)
  }
  const loop = options.still ? null : runLoop(canvas, frame, stage.degrade)
  if (options.still) {
    still()
    stage.onResize(still)
  }

  return {
    setStage(next: number) {
      current = next
      elapsed = 0
      options.onStage(current)
      if (options.still) still()
    },
    setPaused(value: boolean) {
      loop?.setPaused(value)
    },
    dispose() {
      loop?.stop()
      stage.dispose()
    },
  }
}
