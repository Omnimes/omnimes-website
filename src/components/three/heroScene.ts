import * as THREE from "three"

import {
  COLORS,
  createStage,
  MachineState,
  makeCnc,
  makeConveyor,
  makeHmi,
  makePacker,
  makePalletCell,
  makePress,
  makeProducts,
  makeSparks,
  makeStackLight,
  makeWaveField,
  runLoop,
} from "./kit"

export type HeroOverlay = {
  stop: HTMLElement
  stopValue: HTMLElement
  resume: HTMLElement
  energyValue: HTMLElement
  oeeValue: HTMLElement
  chart: SVGPolylineElement
  rows: { dot: HTMLElement; state: HTMLElement }[]
}

export type HeroLabels = Record<MachineState, string>

const CYCLE = 13
const STOP_FROM = 4.5
const STOP_TO = 8.5
const RESUME_TO = 10.5
const STOPPED_STATION = 3

const DOT: Record<MachineState, string> = { run: "#22e58a", warn: "#ffb020", stop: "#ff3b5c" }

export function mountHero(
  canvas: HTMLCanvasElement,
  overlay: HeroOverlay,
  labels: HeroLabels,
  options: { compact: boolean; locale: string }
) {
  const stage = createStage(canvas, { compact: options.compact, shadowSpan: 13 })
  const { scene, camera } = stage
  const number = new Intl.NumberFormat(options.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const wideCamera = new THREE.Vector3(8.5, 7.8, 21)
  const wideLook = new THREE.Vector3(0.4, 3.5, 0.4)
  const closeCamera = new THREE.Vector3(9.5, 5.4, 15)
  const closeLook = new THREE.Vector3(4.6, 2.2, 1.6)
  const position = wideCamera.clone()
  const look = wideLook.clone()
  camera.position.copy(position)
  camera.lookAt(look)

  const wave = makeWaveField(52, 34, options.compact ? 1.6 : 2.6)
  wave.points.position.set(0, 0, -3)
  scene.add(wave.points)

  const conveyor = makeConveyor(15)
  scene.add(conveyor.group)
  const stations = [
    { x: -5.1, z: 0 },
    { x: -2.5, z: -2.05 },
    { x: 2.1, z: 0 },
    { x: 6.1, z: 2 },
  ]
  const pickX = 6.1
  const products = makeProducts(
    5,
    15,
    stations.slice(0, 3).map((station) => station.x),
    pickX
  )
  scene.add(products.mesh)

  const press = makePress()
  const cnc = makeCnc()
  const packer = makePacker()
  const machines = [press, cnc, packer]
  machines.forEach((machine, index) => {
    machine.group.position.set(stations[index].x, 0, stations[index].z)
    scene.add(machine.group)
  })
  const cell = makePalletCell({
    base: [stations[3].x, stations[3].z],
    pickX,
    pallet: [4.3, 3.5],
    spacing: products.spacing,
    length: 15,
  })
  scene.add(cell.group)

  const lights = stations.map((station, index) => {
    const light = makeStackLight()
    const height = [3.68, 2.5, 2.88, 0][index]
    const side = index === 3 ? [0.95, 0.35] : [1.05, 0.3]
    light.group.position.set(station.x + side[0], height, station.z + side[1])
    scene.add(light.group)
    return light
  })

  const hmi = makeHmi()
  hmi.position.set(-3.4, 0, 1.6)
  hmi.rotation.y = 0.35
  scene.add(hmi)

  const sparks = makeSparks(options.compact ? 40 : 90)
  scene.add(sparks.points)
  const sparkOrigin = new THREE.Vector3(stations[0].x, 1.3, 0.2)

  // Pierścień alarmu wokół zatrzymanej maszyny
  const alertMaterial = new THREE.MeshBasicMaterial({
    color: COLORS.red,
    transparent: true,
    opacity: 0,
    toneMapped: false,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
  const alert = new THREE.Mesh(new THREE.RingGeometry(1.3, 1.42, 128), alertMaterial)
  alert.rotation.x = -Math.PI / 2
  alert.position.set(stations[STOPPED_STATION].x, 0.03, stations[STOPPED_STATION].z)
  scene.add(alert)

  // Pierścień OmniMES, do którego spływają dane
  const hub = new THREE.Group()
  hub.position.set(0, 7.2, -1.6)
  scene.add(hub)
  const ringGeometry = new THREE.TorusGeometry(1.75, 0.045, 32, 256)
  const left = new THREE.Color(COLORS.blue)
  const right = new THREE.Color(COLORS.magenta)
  const colors = new Float32Array(ringGeometry.attributes.position.count * 3)
  const ringPoints = ringGeometry.attributes.position
  for (let index = 0; index < ringPoints.count; index += 1) {
    left
      .clone()
      .lerp(right, ringPoints.getX(index) / 3.5 + 0.5)
      .toArray(colors, index * 3)
  }
  ringGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  const ring = new THREE.Mesh(
    ringGeometry,
    new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false })
  )
  hub.add(ring)
  const web = new THREE.Group()
  hub.add(web)
  const webGeometry = new THREE.IcosahedronGeometry(1.25, 1)
  web.add(
    new THREE.LineSegments(
      new THREE.EdgesGeometry(webGeometry),
      new THREE.LineBasicMaterial({ color: 0x69b7ff, transparent: true, opacity: 0.5 })
    )
  )
  const unique = new Map<string, THREE.Vector3>()
  const webPoints = webGeometry.attributes.position
  for (let index = 0; index < webPoints.count; index += 1) {
    const point = new THREE.Vector3().fromBufferAttribute(webPoints, index)
    unique.set(
      point
        .toArray()
        .map((value) => value.toFixed(3))
        .join(),
      point
    )
  }
  const nodes = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.055, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0xcfe6ff, toneMapped: false }),
    unique.size
  )
  const nodeMatrix = new THREE.Matrix4()
  ;[...unique.values()].forEach((point, index) => {
    nodes.setMatrixAt(index, nodeMatrix.makeTranslation(point.x, point.y, point.z))
  })
  web.add(nodes)

  // Paczki danych z maszyn do pierścienia
  const perStation = options.compact ? 3 : 5
  const curves = stations.map((station, index) => {
    const start = new THREE.Vector3(station.x, [4.3, 3.2, 3.6, 3.4][index], station.z)
    const end = hub.position.clone().add(new THREE.Vector3(station.x * 0.2, -1.6, 0))
    const middle = start
      .clone()
      .lerp(end, 0.5)
      .add(new THREE.Vector3(0, 0.5, 0))
    return new THREE.QuadraticBezierCurve3(start, middle, end)
  })
  const packets = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.075, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }),
    stations.length * perStation
  )
  packets.frustumCulled = false
  scene.add(packets)
  const beams = curves.map((curve) => {
    const material = new THREE.MeshBasicMaterial({
      color: COLORS.blue,
      transparent: true,
      opacity: 0.32,
      toneMapped: false,
    })
    const beam = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.012, 8), material)
    scene.add(beam)
    return material
  })

  const point = new THREE.PointLight(COLORS.violet, 60, 22)
  point.position.set(0, 6.5, 1)
  scene.add(point)
  const alarm = new THREE.PointLight(COLORS.red, 0, 8)
  alarm.position.set(stations[STOPPED_STATION].x, 2.2, stations[STOPPED_STATION].z + 0.6)
  scene.add(alarm)

  const anchor = new THREE.Vector3(stations[STOPPED_STATION].x, 3.5, stations[STOPPED_STATION].z)
  const place = (element: HTMLElement) => {
    const projected = anchor.clone().project(camera)
    const x = ((projected.x + 1) / 2) * canvas.clientWidth
    const y = ((1 - projected.y) / 2) * canvas.clientHeight
    element.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`
  }

  const history: number[] = Array.from({ length: 40 }, () => 1.24)
  let historyClock = 0
  const matrix = new THREE.Matrix4()
  const color = new THREE.Color()
  const blue = new THREE.Color(0x7cc7ff)
  const red = new THREE.Color(COLORS.red)
  let speed = 1
  let push = 0
  let oee = 84
  let energy = 1.24

  const frame = (delta: number, time: number) => {
    const phase = time % CYCLE
    const stopped = phase >= STOP_FROM && phase < STOP_TO
    const resumed = phase >= STOP_TO && phase < RESUME_TO
    speed += ((stopped ? 0 : 1) - speed) * Math.min(delta * 3, 1)
    push += ((stopped ? 1 : 0) - push) * Math.min(delta * 1.7, 1)

    conveyor.update(delta, speed)
    products.update(delta, speed)
    cell.update(products.distance())
    sparks.update(delta)
    wave.update(time)
    web.rotation.y = time * 0.18
    web.rotation.x = Math.sin(time * 0.2) * 0.2
    hub.lookAt(camera.position)
    ring.scale.setScalar(1 + Math.sin(time * 2.2) * 0.008)

    stations.forEach((_, index) => {
      const blocked = stopped && index === STOPPED_STATION - 1
      const down = stopped && index === STOPPED_STATION
      const running = !down && !blocked
      if (index === 0) {
        if (press.update(time, running)) sparks.burst(sparkOrigin, options.compact ? 6 : 12)
      } else if (index < 3) {
        machines[index].update(time, running)
      }
      const state: MachineState = down ? "stop" : blocked ? "warn" : "run"
      lights[index].set(state, time)
      overlay.rows[index].dot.style.background = DOT[state]
      overlay.rows[index].state.textContent = labels[state]
    })

    let instance = 0
    curves.forEach((curve, station) => {
      const alerted = stopped && station === STOPPED_STATION
      beams[station].color.set(alerted ? COLORS.red : COLORS.blue)
      for (let index = 0; index < perStation; index += 1) {
        const progress = (time * 0.26 + index / perStation + station * 0.13) % 1
        const spot = curve.getPoint(progress)
        const scale = Math.sin(progress * Math.PI) * 1.2 + 0.25
        matrix.makeScale(scale, scale, scale).setPosition(spot)
        packets.setMatrixAt(instance, matrix)
        packets.setColorAt(instance, color.copy(alerted ? red : blue))
        instance += 1
      }
    })
    packets.instanceMatrix.needsUpdate = true
    if (packets.instanceColor) packets.instanceColor.needsUpdate = true

    alarm.intensity = stopped ? 30 + Math.sin(time * 9) * 18 : 0
    alertMaterial.color.set(resumed ? COLORS.green : COLORS.red)
    const pulse = (time * 1.1) % 1
    alert.scale.setScalar(stopped ? 1 + pulse * 0.5 : resumed ? 1.1 : 1)
    alertMaterial.opacity = stopped ? 0.9 * (1 - pulse) : resumed ? 0.65 : 0

    // Wartości poglądowe: postój obniża OEE i podbija energię na sztukę
    oee += ((stopped ? 71 : 84) - oee) * delta * (stopped ? 0.45 : 0.28)
    energy += ((stopped ? 1.62 : 1.24) - energy) * delta * (stopped ? 0.55 : 0.32)
    overlay.oeeValue.textContent = `${Math.round(oee)}%`
    overlay.energyValue.textContent = number.format(energy)

    historyClock += delta
    if (historyClock > 0.2) {
      historyClock = 0
      history.shift()
      history.push(energy)
      overlay.chart.setAttribute(
        "points",
        history
          .map((value, index) => `${index * 3},${(30 - (value - 1.15) * 54).toFixed(1)}`)
          .join(" ")
      )
    }

    const seconds = Math.max(0, Math.floor((phase - STOP_FROM) * 15))
    overlay.stopValue.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
    overlay.stop.style.opacity = stopped ? "1" : "0"
    overlay.resume.style.opacity = resumed ? "1" : "0"

    // Kamera podjeżdża do zatrzymanej maszyny i wraca
    const eased = push * push * (3 - 2 * push)
    position.copy(wideCamera).lerp(closeCamera, eased)
    position.x += Math.sin(time * 0.13) * 1.5 * (1 - eased)
    position.y += Math.sin(time * 0.09) * 0.4 * (1 - eased)
    look.copy(wideLook).lerp(closeLook, eased)
    camera.position.copy(position)
    camera.lookAt(look)
    place(overlay.stop)
    place(overlay.resume)
    stage.render()
  }

  const loop = runLoop(canvas, frame, stage.degrade)
  return {
    dispose() {
      loop.stop()
      stage.dispose()
    },
  }
}
