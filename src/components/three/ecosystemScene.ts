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
  paint,
  runLoop,
  steel,
} from "./kit"

type PanelKind = "status" | "alarms" | "oee" | "energy" | "report"

export type EcosystemLabels = {
  gateway: string
  panels: { role: string; kind: PanelKind }[]
}

export type EcosystemOverlay = {
  /** Etykiety węzłów w kolejności trasy, ostatnia opisuje wspólny serwer. */
  stations: HTMLElement[]
  roles: HTMLElement[]
}

export const STAGE_COUNT = 7
const STAGE_SECONDS = 7
const OVERVIEW = STAGE_COUNT - 1

// Węzły ułożone zygzakiem, broker i baza stoją obok siebie na jednym serwerze
const NODES = [
  [0, -8],
  [11, 5],
  [22, -8],
  [33, 4],
  [41, 4],
  [58, -7],
] as const
const NODE_X = NODES.map(([x]) => x)
const NODE_Z = NODES.map(([, z]) => z)
const SIGNAL_STOPS = [0, 0.25, 0.5, 0.75, 1]

function makeCabinet() {
  const group = new THREE.Group()
  const body = paint(0x717e9e)
  group.add(box([3, 4.4, 0.25], paint(0x4c5a82), [0, 2.3, -0.9]))
  group.add(box([0.14, 4.4, 1.2], body, [-1.5, 2.3, -0.3]))
  group.add(box([0.14, 4.4, 1.2], body, [1.5, 2.3, -0.3]))
  group.add(box([3.1, 0.14, 1.2], body, [0, 4.5, -0.3]))
  group.add(box([3.1, 0.2, 1.2], paint(0x28324f), [0, 0.1, -0.3]))
  group.add(box([2.6, 0.08, 0.1], steel(0xc4cde0), [0, 3, -0.72]))
  group.add(box([2.6, 0.08, 0.1], steel(0xc4cde0), [0, 1.5, -0.72]))

  const leds: THREE.MeshStandardMaterial[] = []
  for (let index = 0; index < 6; index += 1) {
    const x = -1.05 + index * 0.42
    group.add(box([0.36, 1, 0.5], paint(index === 0 ? 0x2f5fd0 : 0x2a3350), [x, 3, -0.45]))
    for (let led = 0; led < 3; led += 1) {
      const material = glow(led === 2 ? COLORS.amber : COLORS.green, 2)
      group.add(box([0.07, 0.05, 0.02], material, [x, 3.3 - led * 0.13, -0.19]))
      leds.push(material)
    }
  }
  return { group, leds }
}

function makeGateway(label: string) {
  const group = new THREE.Group()
  group.add(box([2.6, 3.1, 0.2], paint(0x3f4b6b), [0, 2, -0.6]))
  group.add(box([2.3, 0.08, 0.1], steel(0xc4cde0), [0, 2, -0.46]))
  group.add(box([1.6, 2.2, 0.7], paint(0x2a3145), [0, 2, -0.1], 0.1))

  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 128
  const context = canvas.getContext("2d") as CanvasRenderingContext2D
  context.fillStyle = "#0d1322"
  context.fillRect(0, 0, 512, 128)
  context.font = "700 74px system-ui, 'Segoe UI', sans-serif"
  context.fillStyle = "#e4eaff"
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.fillText(label, 256, 68)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(1.32, 0.33),
    new THREE.MeshBasicMaterial({ map: texture, color: 0xc8c8c8, toneMapped: false })
  )
  plate.position.set(0, 2.62, 0.26)
  group.add(plate)

  const leds: THREE.MeshStandardMaterial[] = []
  ;[COLORS.green, COLORS.blue, COLORS.amber].forEach((color, index) => {
    const material = glow(color, 2.2)
    group.add(box([0.1, 0.1, 0.02], material, [-0.4 + index * 0.25, 2.2, 0.26]))
    leds.push(material)
  })
  // Gniazda Ethernet i COM
  for (let index = 0; index < 3; index += 1) {
    group.add(box([0.34, 0.26, 0.04], steel(0x080b12), [-0.42 + index * 0.42, 1.42, 0.25]))
  }
  return { group, leds }
}

function makeServer() {
  const group = new THREE.Group()
  group.add(box([2.8, 5, 2.2], paint(0x232b43), [0, 2.66, 0], 0.12))
  const leds: THREE.MeshStandardMaterial[] = []
  for (let unit = 0; unit < 7; unit += 1) {
    const y = 0.86 + unit * 0.62
    group.add(box([2.4, 0.5, 0.05], paint(0x10172a), [0, y, 1.12]))
    group.add(box([1.2, 0.05, 0.02], glow(COLORS.blue, 1.4), [-0.3, y, 1.16]))
    const material = glow(unit % 3 === 0 ? COLORS.magenta : COLORS.green, 2.4)
    group.add(box([0.1, 0.1, 0.02], material, [0.9, y, 1.16]))
    leds.push(material)
  }
  return { group, leds }
}

function makeDatabase() {
  const group = new THREE.Group()
  const rings: THREE.MeshStandardMaterial[] = []
  for (let index = 0; index < 3; index += 1) {
    const y = 0.91 + index * 1.45
    group.add(cylinder(1.7, 1.15, paint(0x5c6c96, 0.32), [0, y, 0]))
    const material = glow(index === 1 ? COLORS.violet : COLORS.blue, 1.9)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.035, 24, 160), material)
    ring.rotation.x = Math.PI / 2
    ring.position.y = y + 0.58
    group.add(ring)
    rings.push(material)
  }
  return { group, rings }
}

/** Platforma pokazuje, że broker i baza działają na jednym serwerze. */
function makeServerBase(width: number, depth: number) {
  const group = new THREE.Group()
  group.add(box([width, 0.16, depth], paint(0x141a2c), [0, 0.08, 0], 0.07))
  const edge = glow(COLORS.violet, 1.9)
  const thick = 0.07
  group.add(box([width, 0.06, thick], edge, [0, 0.19, depth / 2]))
  group.add(box([width, 0.06, thick], edge, [0, 0.19, -depth / 2]))
  group.add(box([thick, 0.06, depth], edge, [width / 2, 0.19, 0]))
  group.add(box([thick, 0.06, depth], edge, [-width / 2, 0.19, 0]))
  return group
}

function panelTexture(kind: PanelKind, alert: boolean) {
  const canvas = document.createElement("canvas")
  canvas.width = 768
  canvas.height = 480
  const c = canvas.getContext("2d") as CanvasRenderingContext2D
  c.fillStyle = "#0a0f1f"
  c.fillRect(0, 0, 768, 480)

  const green = "#22e58a"
  const red = "#ff3b5c"
  const blue = "#2f9bff"
  const violet = "#7c5cff"
  if (kind === "status") {
    for (let index = 0; index < 8; index += 1) {
      c.fillStyle = alert && index === 5 ? red : green
      c.beginPath()
      c.roundRect(40 + (index % 4) * 174, 50 + Math.floor(index / 4) * 196, 150, 170, 14)
      c.fill()
    }
  } else if (kind === "alarms") {
    for (let index = 0; index < 6; index += 1) {
      c.fillStyle = alert && index === 0 ? red : index === 1 ? "#ffb020" : "#2a3657"
      c.fillRect(40, 44 + index * 68, 24, 44)
      c.fillStyle = alert && index === 0 ? red : "#2a3657"
      c.fillRect(84, 52 + index * 68, 640 - index * 66, 28)
    }
  } else if (kind === "oee") {
    ;[0.86, 0.72, 0.93].forEach((value, index) => {
      c.strokeStyle = "#222b47"
      c.lineWidth = 30
      c.beginPath()
      c.arc(152 + index * 232, 240, 90, 0, Math.PI * 2)
      c.stroke()
      c.strokeStyle = index === 1 ? "#ffb020" : green
      c.lineCap = "round"
      c.beginPath()
      c.arc(152 + index * 232, 240, 90, -Math.PI / 2, -Math.PI / 2 + value * Math.PI * 2)
      c.stroke()
    })
  } else if (kind === "energy") {
    c.strokeStyle = violet
    c.lineWidth = 9
    c.lineJoin = "round"
    c.beginPath()
    ;[0.5, 0.45, 0.6, 0.42, 0.38, 0.8, 0.46, 0.4, 0.36, 0.33].forEach((value, index) => {
      const x = 48 + index * 75
      const y = 430 - value * 340
      if (index === 0) c.moveTo(x, y)
      else c.lineTo(x, y)
    })
    c.stroke()
  } else {
    ;[0.4, 0.55, 0.5, 0.7, 0.65, 0.8, 0.9].forEach((value, index) => {
      c.fillStyle = index === 6 ? violet : blue
      c.beginPath()
      c.roundRect(52 + index * 98, 440 - value * 380, 70, value * 380, 8)
      c.fill()
    })
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function makePanel(kind: PanelKind) {
  const group = new THREE.Group()
  group.add(box([3.6, 2.36, 0.14], paint(0x141a2c), [0, 2.8, 0], 0.06))
  const normal = panelTexture(kind, false)
  const alert = panelTexture(kind, true)
  const material = new THREE.MeshBasicMaterial({ map: normal, color: 0xb4b4b4, toneMapped: false })
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.13), material)
  screen.position.set(0, 2.8, 0.08)
  group.add(screen)
  group.add(box([0.2, 1.6, 0.2], paint(0x4c5a82), [0, 0.8, -0.04]))
  group.add(box([1.3, 0.09, 0.8], paint(0x4c5a82), [0, 0.05, 0]))
  return {
    group,
    setAlert(active: boolean) {
      material.map = active ? alert : normal
    },
    dispose() {
      alert.dispose()
    },
  }
}

export function mountEcosystem(
  canvas: HTMLCanvasElement,
  labels: EcosystemLabels,
  overlay: EcosystemOverlay,
  options: { compact: boolean; still: boolean; onStage: (stage: number) => void }
) {
  const stage = createStage(canvas, { compact: options.compact, shadowSpan: 46 })
  const { scene, camera, sun } = stage
  scene.fog = new THREE.Fog(COLORS.background, 40, 120)
  sun.shadow.mapSize.set(4096, 4096)
  sun.shadow.camera.far = 130
  sun.position.set(40, 34, 34)
  sun.target.position.set(28, 0, -1)

  const wave = makeWaveField(120, 50, options.compact ? 1 : 1.6)
  wave.points.position.set(28, 0, -2)
  scene.add(wave.points)

  // 1. Linia produkcyjna
  const line = new THREE.Group()
  const conveyor = makeConveyor(9)
  const products = makeProducts(5, 9, [-2, 2])
  const press = makePress()
  const robot = makeRobot()
  const lamp = makeStackLight()
  press.group.position.x = -2
  robot.group.position.set(2, 0, 1.6)
  lamp.group.position.set(-0.95, 3.68, 0.3)
  line.add(conveyor.group, products.mesh, press.group, robot.group, lamp.group)
  line.position.set(NODE_X[0], 0, NODE_Z[0])
  scene.add(line)

  // 2–5. Sterownik, bramka, serwer z brokerem i bazą
  const cabinet = makeCabinet()
  cabinet.group.position.set(NODE_X[1], 0, NODE_Z[1])
  const gateway = makeGateway(labels.gateway)
  gateway.group.position.set(NODE_X[2], 0, NODE_Z[2])
  const server = makeServer()
  server.group.position.set(NODE_X[3], 0.16, NODE_Z[3])
  const database = makeDatabase()
  database.group.position.set(NODE_X[4], 0.16, NODE_Z[4])
  const serverCenter = (NODE_X[3] + NODE_X[4]) / 2
  const serverBase = makeServerBase(15.5, 7.6)
  serverBase.position.set(serverCenter, 0, NODE_Z[3] + 0.3)
  scene.add(cabinet.group, gateway.group, server.group, database.group, serverBase)

  // 6. Panele dla ludzi w zakładzie
  const spread = labels.panels.length
  const panels = labels.panels.map((panel, index) => {
    const offset = index - (spread - 1) / 2
    const item = makePanel(panel.kind)
    item.group.position.set(NODE_X[5] + offset * 5.2, 0, NODE_Z[5] - Math.abs(offset) * 0.9)
    item.group.rotation.y = -offset * 0.08
    item.group.scale.setScalar(1.14)
    scene.add(item.group)
    return item
  })
  const panelSpots = panels.map((panel) =>
    panel.group.position.clone().add(new THREE.Vector3(0, 0.5, 0.3))
  )
  const setPanels = (active: boolean) => {
    panels[0].setAlert(active)
    panels[1].setAlert(active)
  }

  // Trasa danych i rozgałęzienie do paneli
  const y = 0.26
  const route = [new THREE.Vector3(NODE_X[0] + 4.5, y, NODE_Z[0] + 0.9)]
  for (let index = 1; index <= 4; index += 1) {
    const middle = (NODE_X[index - 1] + NODE_X[index]) / 2
    route.push(new THREE.Vector3(middle, y, (NODE_Z[index - 1] + NODE_Z[index]) / 2 + 1.5))
    route.push(new THREE.Vector3(NODE_X[index], y, NODE_Z[index] + 1.9))
  }
  const main = new THREE.CatmullRomCurve3(route, false, "centripetal")
  const fork = route[route.length - 1]
  const branches = panelSpots.map(
    (spot) =>
      new THREE.CatmullRomCurve3(
        [
          fork.clone(),
          new THREE.Vector3(NODE_X[4] + 7, y, NODE_Z[4] + 1.5),
          new THREE.Vector3(spot.x, y, spot.z + 2.2),
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
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(main, 320, 0.05, 12), cable))
  for (const branch of branches) {
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(branch, 80, 0.04, 12), cable))
  }

  // Robot łączy się z bramką własnym kablem
  const robotRoute = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(NODE_X[0] + 2, y, NODE_Z[0] + 2.3),
      new THREE.Vector3(NODE_X[0] + 7, y, NODE_Z[0] + 3),
      new THREE.Vector3(NODE_X[0] + 13, y, NODE_Z[0] - 3.2),
      new THREE.Vector3(NODE_X[2] - 1, y, NODE_Z[2] - 1),
    ],
    false,
    "centripetal"
  )
  scene.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(robotRoute, 120, 0.05, 12),
      new THREE.MeshStandardMaterial({
        color: 0x0b1020,
        emissive: COLORS.violet,
        emissiveIntensity: 1,
      })
    )
  )
  const robotCount = options.compact ? 6 : 12
  const robotPackets = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.075, 20, 14),
    new THREE.MeshBasicMaterial({ color: 0xcdbcff, toneMapped: false }),
    robotCount
  )
  robotPackets.frustumCulled = false
  scene.add(robotPackets)

  const count = options.compact ? 40 : 90
  const packets = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.075, 20, 14),
    new THREE.MeshBasicMaterial({ color: 0x9fd8ff, toneMapped: false }),
    count
  )
  packets.frustumCulled = false
  scene.add(packets)
  const states = Array.from({ length: count }, (_, index) => ({
    progress: index / count,
    branch: index % branches.length,
  }))

  // Jeden czerwony sygnał, który kamera śledzi od maszyny do paneli
  const signalMaterial = new THREE.MeshBasicMaterial({ color: COLORS.red, toneMapped: false })
  const signal = new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 24), signalMaterial)
  scene.add(signal)
  const copies = branches.map(() => {
    const copy = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 24), signalMaterial)
    copy.visible = false
    scene.add(copy)
    return copy
  })
  const signalLight = new THREE.PointLight(COLORS.red, 0, 9)
  scene.add(signalLight)

  const focus = new THREE.PointLight(0xffffff, 55, 20)
  focus.position.set(0, 7, 6)
  scene.add(focus)

  const closeUps = [
    [1, 7.5, 17],
    [2.5, 4.8, 11.5],
    [1.8, 3.9, 9],
    [4, 5, 13.5],
    [-3, 5, 13.5],
    [0, 5, 28],
  ]
  const cameras = closeUps.map(([x, height, z], index) => ({
    position: new THREE.Vector3(NODE_X[index] + x, height, NODE_Z[index] + z),
    look: new THREE.Vector3(NODE_X[index], index === 5 ? 2.1 : 2.7, NODE_Z[index]),
  }))
  const wide = camera.aspect >= 1.6 ? 1 : 1.62
  if (wide > 1) scene.fog = new THREE.Fog(COLORS.background, 70, 210)
  cameras.push({
    position: new THREE.Vector3(31.5, 45 * wide, 49 * wide),
    look: new THREE.Vector3(31.5, 0, -2),
  })

  // Punkty, nad którymi stoją etykiety. Ostatni opisuje wspólny serwer.
  const anchors = [
    new THREE.Vector3(NODE_X[0], 4.9, NODE_Z[0]),
    new THREE.Vector3(NODE_X[1], 5.2, NODE_Z[1]),
    new THREE.Vector3(NODE_X[2], 4, NODE_Z[2]),
    new THREE.Vector3(NODE_X[3], 5.9, NODE_Z[3]),
    new THREE.Vector3(NODE_X[4], 5.4, NODE_Z[4]),
    new THREE.Vector3(NODE_X[5], 8.4, NODE_Z[5]),
    new THREE.Vector3(serverCenter, 0.2, NODE_Z[3] + 4.4),
    new THREE.Vector3(NODE_X[0] + 5.6, 3.4, NODE_Z[0] + 1.6),
  ]
  // Z góry etykieta robota stoi przy jego kablu, żeby nie zasłaniać linii
  const robotAnchorWide = new THREE.Vector3(15.3, 0, -2.4)
  const roleAnchors = panels.map((panel) =>
    panel.group.position.clone().add(new THREE.Vector3(0, 4.75, 0))
  )
  const roleAnchorsLow = panels.map((panel) =>
    panel.group.position.clone().add(new THREE.Vector3(0, 0, 3.4))
  )
  const place = (element: HTMLElement, point: THREE.Vector3) => {
    const projected = point.clone().project(camera)
    const inside = projected.z < 1 && Math.abs(projected.x) < 1.02 && projected.y < 1.02
    const x = ((projected.x + 1) / 2) * canvas.clientWidth
    const y = ((1 - projected.y) / 2) * canvas.clientHeight
    element.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`
    element.style.visibility = inside ? "visible" : "hidden"
  }

  let current = options.still ? OVERVIEW : 0
  let elapsed = 0
  let signalProgress = 0
  let branchProgress = 0
  let speed = 1
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

    // Maszyna staje, sygnał rusza przez kolejne węzły i kończy na panelach
    const fault = current < OVERVIEW && (current > 0 || elapsed > 1.8 || options.still)
    const stopIndex = Math.min(current, SIGNAL_STOPS.length - 1)
    if (options.still) {
      signalProgress = SIGNAL_STOPS[stopIndex]
      branchProgress = 1
    } else if (fault) {
      signalProgress += (SIGNAL_STOPS[stopIndex] - signalProgress) * (1 - Math.exp(-real * 1.6))
    } else {
      signalProgress = 0
    }
    branchProgress = current === OVERVIEW - 1 ? Math.min(1, branchProgress + real * 0.42) : 0
    if (options.still && current === OVERVIEW - 1) branchProgress = 1
    const inBranches = current === OVERVIEW - 1

    signal.visible = fault && !inBranches
    if (signal.visible) {
      main.getPoint(signalProgress, signal.position)
      signal.position.y += 0.1
    }
    copies.forEach((copy, index) => {
      copy.visible = fault && inBranches
      if (copy.visible) branches[index].getPointAt(branchProgress, copy.position)
    })
    signalLight.intensity = fault ? 34 : 0
    signalLight.position.copy(inBranches ? copies[2].position : signal.position)
    signalLight.position.y += 1
    setPanels(inBranches && branchProgress > 0.96)

    speed += ((fault ? 0 : 1) - speed) * Math.min(delta * 3, 1)
    conveyor.update(delta, speed)
    products.update(delta, speed)
    press.update(time, !fault)
    robot.update(time, !fault)
    lamp.set(fault ? "stop" : "run", time)
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
    for (let index = 0; index < robotCount; index += 1) {
      robotRoute.getPointAt((time * 0.09 + index / robotCount) % 1, spot)
      matrix.makeTranslation(spot.x, spot.y + 0.04, spot.z)
      robotPackets.setMatrixAt(index, matrix)
    }
    robotPackets.instanceMatrix.needsUpdate = true

    overlay.stations.forEach((element, index) => {
      const robot = index === anchors.length - 1 && current === OVERVIEW
      place(element, robot ? robotAnchorWide : anchors[index])
    })
    overlay.roles.forEach((element, index) => {
      const low = current === OVERVIEW && index % 2 === 1
      place(element, low ? roleAnchorsLow[index] : roleAnchors[index])
    })
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
      panels.forEach((panel) => panel.dispose())
      stage.dispose()
    },
  }
}
