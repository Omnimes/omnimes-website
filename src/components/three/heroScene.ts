import * as THREE from "three"

import {
  COLORS,
  createStage,
  makeCnc,
  makeConveyor,
  makePacker,
  makePress,
  makeProducts,
  makeRobot,
  makeStackLight,
  makeWaveField,
  MachineState,
  runLoop,
} from "./kit"

export type HeroChips = {
  stop: HTMLElement
  stopValue: HTMLElement
  energy: HTMLElement
  energyValue: HTMLElement
  oee: HTMLElement
  oeeValue: HTMLElement
  ring: HTMLElement
}

const CYCLE = 15
const STOP_FROM = 7
const STOP_TO = 11.5
const STOPPED_STATION = 2

export function mountHero(canvas: HTMLCanvasElement, chips: HeroChips, options: { compact: boolean }) {
  const stage = createStage(canvas, options)
  const { scene, camera } = stage
  camera.position.set(8.5, 7.2, 18.4)

  const look = new THREE.Vector3(0, 3.95, 0)
  camera.lookAt(look)

  const wave = makeWaveField(52, 34, options.compact ? 1.6 : 2.6)
  wave.points.position.set(0, 0, -3)
  scene.add(wave.points)

  const conveyor = makeConveyor(15)
  scene.add(conveyor.group)
  const products = makeProducts(9, 15)
  scene.add(products.mesh)

  const press = makePress()
  const cnc = makeCnc()
  const robot = makeRobot()
  const packer = makePacker()
  const machines = [press, cnc, robot, packer]
  const stations = [
    { x: -5.1, z: 0 },
    { x: -1.7, z: -1.9 },
    { x: 1.9, z: 1.45 },
    { x: 5.2, z: 0 },
  ]
  const lights = machines.map((machine, index) => {
    machine.group.position.set(stations[index].x, 0, stations[index].z)
    scene.add(machine.group)
    const light = makeStackLight()
    light.group.position.set(stations[index].x + 1.25, index === 2 ? 0.8 : 2.6, stations[index].z + 0.4)
    scene.add(light.group)
    return light
  })

  // Pierścień OmniMES, do którego spływają dane
  const hub = new THREE.Group()
  hub.position.set(0, 7.2, -1.6)
  scene.add(hub)
  const ringGeometry = new THREE.TorusGeometry(1.75, 0.04, 16, 160)
  const left = new THREE.Color(COLORS.blue)
  const right = new THREE.Color(COLORS.magenta)
  const colors = new Float32Array(ringGeometry.attributes.position.count * 3)
  const position = ringGeometry.attributes.position
  for (let index = 0; index < position.count; index += 1) {
    left.clone().lerp(right, position.getX(index) / 3.5 + 0.5).toArray(colors, index * 3)
  }
  ringGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  hub.add(
    new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }))
  )
  const web = new THREE.Group()
  hub.add(web)
  const webGeometry = new THREE.IcosahedronGeometry(1.25, 1)
  web.add(
    new THREE.LineSegments(
      new THREE.EdgesGeometry(webGeometry),
      new THREE.LineBasicMaterial({ color: 0x69b7ff, transparent: true, opacity: 0.55 })
    )
  )
  web.add(
    new THREE.Points(
      webGeometry,
      new THREE.PointsMaterial({ color: 0xcfe6ff, size: 0.13, toneMapped: false })
    )
  )

  // Paczki danych z maszyn do pierścienia
  const perStation = options.compact ? 3 : 5
  const curves = stations.map((station) => {
    const start = new THREE.Vector3(station.x, 3, station.z)
    const end = hub.position.clone().add(new THREE.Vector3(station.x * 0.2, -1.6, 0))
    const middle = start.clone().lerp(end, 0.5).add(new THREE.Vector3(0, 0.5, 0))
    return new THREE.QuadraticBezierCurve3(start, middle, end)
  })
  const packets = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.075, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }),
    stations.length * perStation
  )
  packets.frustumCulled = false
  scene.add(packets)
  const beams = curves.map((curve) => {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)),
      new THREE.LineBasicMaterial({ color: COLORS.blue, transparent: true, opacity: 0.22 })
    )
    scene.add(line)
    return line
  })

  const point = new THREE.PointLight(COLORS.violet, 60, 22)
  point.position.set(0, 6.5, 1)
  scene.add(point)
  const alarm = new THREE.PointLight(COLORS.red, 0, 8)
  alarm.position.set(stations[STOPPED_STATION].x, 2.2, stations[STOPPED_STATION].z + 0.6)
  scene.add(alarm)

  const place = (element: HTMLElement, target: THREE.Vector3) => {
    const projected = target.clone().project(camera)
    const x = ((projected.x + 1) / 2) * canvas.clientWidth
    const y = ((1 - projected.y) / 2) * canvas.clientHeight
    element.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`
  }
  const anchors = {
    stop: new THREE.Vector3(options.compact ? -0.6 : stations[2].x, options.compact ? 4.3 : 3.5, stations[2].z),
    energy: new THREE.Vector3(options.compact ? stations[3].x + 0.6 : stations[3].x, 3.4, 0),
    oee: new THREE.Vector3(stations[0].x, 4.1, 0),
    ring: new THREE.Vector3(3.9, 8, -1.6),
  }

  const matrix = new THREE.Matrix4()
  const color = new THREE.Color()
  const blue = new THREE.Color(0x7cc7ff)
  const red = new THREE.Color(COLORS.red)
  let speed = 1
  let oee = 84
  let energy = 1.24

  const frame = (delta: number, time: number) => {
    const phase = time % CYCLE
    const stopped = phase >= STOP_FROM && phase < STOP_TO
    speed += ((stopped ? 0 : 1) - speed) * Math.min(delta * 3, 1)

    conveyor.update(delta, speed)
    products.update(delta, speed)
    wave.update(time)
    web.rotation.y = time * 0.18
    web.rotation.x = Math.sin(time * 0.2) * 0.2
    hub.lookAt(camera.position)

    machines.forEach((machine, index) => {
      const blocked = stopped && Math.abs(index - STOPPED_STATION) === 1
      const down = stopped && index === STOPPED_STATION
      machine.update(time, !down && !blocked)
      const state: MachineState = down ? "stop" : blocked ? "warn" : "run"
      lights[index].set(state, time)
    })

    let instance = 0
    curves.forEach((curve, station) => {
      const alert = stopped && station === STOPPED_STATION
      ;(beams[station].material as THREE.LineBasicMaterial).color.set(alert ? COLORS.red : COLORS.blue)
      for (let index = 0; index < perStation; index += 1) {
        const progress = (time * 0.26 + index / perStation + station * 0.13) % 1
        const spot = curve.getPoint(progress)
        const scale = Math.sin(progress * Math.PI) * 1.2 + 0.25
        matrix.makeScale(scale, scale, scale).setPosition(spot)
        packets.setMatrixAt(instance, matrix)
        packets.setColorAt(instance, color.copy(alert ? red : blue))
        instance += 1
      }
    })
    packets.instanceMatrix.needsUpdate = true
    if (packets.instanceColor) packets.instanceColor.needsUpdate = true

    alarm.intensity = stopped ? 30 + Math.sin(time * 9) * 18 : 0

    // Wartości poglądowe: postój obniża OEE i podbija energię na sztukę
    oee += ((stopped ? 71 : 84) - oee) * delta * (stopped ? 0.32 : 0.16)
    energy += ((stopped ? 1.62 : 1.24) - energy) * delta * (stopped ? 0.4 : 0.2)
    chips.oeeValue.textContent = `${Math.round(oee)}%`
    chips.energyValue.textContent = energy.toFixed(2)
    const seconds = Math.max(0, Math.floor((phase - STOP_FROM) * 12))
    chips.stopValue.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
    chips.stop.style.opacity = stopped ? "1" : "0"

    place(chips.stop, anchors.stop)
    place(chips.energy, anchors.energy)
    place(chips.oee, anchors.oee)
    place(chips.ring, anchors.ring)

    // Lekki ruch kamery
    camera.position.x = 8.5 + Math.sin(time * 0.13) * 1.5
    camera.position.y = 7.2 + Math.sin(time * 0.09) * 0.4
    camera.lookAt(look)
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
