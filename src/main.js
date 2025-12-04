import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="layout">
    <div class="controls">
      <h1 class="controls-title">3D Object Studio</h1>
      <p class="controls-subtitle">Load STL files or create basic shapes, then orbit, zoom and inspect.</p>

      <section class="panel-section">
        <h2>Load STL</h2>
        <div class="panel-body">
          <input type="file" id="fileInput" accept=".stl" multiple />
        </div>
      </section>

      <section class="panel-section">
        <h2>Create shape</h2>
        <div class="panel-body">
          <div class="field-row">
            <select id="primitiveType" class="select">
              <option value="box">Box</option>
              <option value="sphere">Sphere</option>
              <option value="cylinder">Cylinder</option>
              <option value="plane">Plane</option>
            </select>
            <button id="addPrimitive" class="btn btn-primary">Add</button>
          </div>
        </div>
      </section>

      <section class="panel-section">
        <h2>Objects</h2>
        <div class="panel-body">
          <ul id="objectList" class="object-list"></ul>
        </div>
      </section>

      <section class="panel-section">
        <h2>Selection</h2>
        <div class="panel-body">
          <div class="stats-grid">
            <div>
              <div class="stats-grid-item-label">Width</div>
              <div id="stat-width" class="stats-grid-item-value">-</div>
            </div>
            <div>
              <div class="stats-grid-item-label">Height</div>
              <div id="stat-height" class="stats-grid-item-value">-</div>
            </div>
            <div>
              <div class="stats-grid-item-label">Depth</div>
              <div id="stat-depth" class="stats-grid-item-value">-</div>
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">Color</span>
            <input type="color" id="colorInput" value="#4caf50" class="color-input" />
          </div>

          <div class="field-row">
            <span class="field-label">Scale</span>
            <input type="range" id="scaleInput" min="0.1" max="3" step="0.1" value="1" class="slider" />
          </div>

          <div class="field-row">
            <span class="field-label">Orient</span>
            <div>
              <button id="rotateUp" type="button" class="btn btn-ghost btn-icon">↑</button>
              <button id="rotateDown" type="button" class="btn btn-ghost btn-icon">↓</button>
              <button id="rotateLeft" type="button" class="btn btn-ghost btn-icon">⟲</button>
              <button id="rotateRight" type="button" class="btn btn-ghost btn-icon">⟳</button>
            </div>
          </div>

          <div class="field-row">
            <button id="resetView" class="btn btn-ghost">Frame</button>
            <button id="deleteObject" class="btn btn-danger">Delete</button>
          </div>

          <button id="exportStl" class="btn btn-primary btn-full">Save as STL</button>
        </div>
      </section>

      <section class="panel-section">
        <h2>Tools</h2>
        <div class="panel-body">
          <div class="radio-list">
            <label class="radio-item">
              <input type="radio" name="toolMode" value="select" checked />
              <span>Select / drag</span>
            </label>
            <label class="radio-item">
              <input type="radio" name="toolMode" value="draw" />
              <span>Draw lines</span>
            </label>
          </div>
        </div>
      </section>
    </div>

    <div class="viewer">
      <canvas id="viewerCanvas"></canvas>
    </div>
  </div>
`

const canvas = document.getElementById('viewerCanvas')
const fileInput = document.getElementById('fileInput')
const resetButton = document.getElementById('resetView')
const deleteButton = document.getElementById('deleteObject')
const exportButton = document.getElementById('exportStl')
const widthEl = document.getElementById('stat-width')
const heightEl = document.getElementById('stat-height')
const depthEl = document.getElementById('stat-depth')
const primitiveTypeSelect = document.getElementById('primitiveType')
const addPrimitiveButton = document.getElementById('addPrimitive')
const objectListEl = document.getElementById('objectList')
const colorInput = document.getElementById('colorInput')
const scaleInput = document.getElementById('scaleInput')
const toolModeInputs = document.querySelectorAll('input[name="toolMode"]')
const rotateUpButton = document.getElementById('rotateUp')
const rotateDownButton = document.getElementById('rotateDown')
const rotateLeftButton = document.getElementById('rotateLeft')
const rotateRightButton = document.getElementById('rotateRight')

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x151515)

const viewerContainer = canvas.parentElement
const fov = 45
const camera = new THREE.PerspectiveCamera(
  fov,
  viewerContainer.clientWidth / viewerContainer.clientHeight,
  0.1,
  2000,
)
camera.position.set(120, 120, 120)

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight, false)

// Lighting and helpers
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222233, 0.6)
hemiLight.position.set(0, 1, 0)
scene.add(hemiLight)

const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
dirLight1.position.set(1, 1, 1)
scene.add(dirLight1)

const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
dirLight2.position.set(-1, 0.5, -0.5)
scene.add(dirLight2)

const grid = new THREE.GridHelper(400, 40, 0x444444, 0x222222)
grid.position.y = -0.01
scene.add(grid)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 0, 0)

const loader = new STLLoader()

let objects = [] // { id, name, mesh }
let selectedId = null
let nextId = 1
let currentToolMode = 'select'

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
let isDragging = false
let dragOffset = new THREE.Vector3()
let dragMesh = null
let isVerticalDrag = false
let isRotateDrag = false
let lastClientY = 0
let lastClientX = 0
let lastPointerPlanePoint = null
let lastDrawPoint = null
let verticalDragFactor = 1

function toHexColor(color) {
  const hex = color.getHexString()
  return `#${hex}`
}

function updateStatsFromBox(box) {
  if (!box) {
    widthEl.textContent = '-'
    heightEl.textContent = '-'
    depthEl.textContent = '-'
    return
  }

  const size = new THREE.Vector3()
  box.getSize(size)
  widthEl.textContent = size.x.toFixed(2)
  heightEl.textContent = size.y.toFixed(2)
  depthEl.textContent = size.z.toFixed(2)
}

function frameBox(box) {
  if (!box) return
  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  box.getSize(size)
  box.getCenter(center)

  const maxDim = Math.max(size.x, size.y, size.z)
  const fovRad = (camera.fov * Math.PI) / 180
  let cameraDist = maxDim / (2 * Math.tan(fovRad / 2))
  cameraDist *= 1.5

  camera.position.copy(
    new THREE.Vector3(1, 1, 1)
      .normalize()
      .multiplyScalar(cameraDist),
  )
  camera.position.add(center)
  controls.target.copy(center)
  controls.update()
}

function getObjectBox(mesh) {
  if (!mesh) return null
  const box = new THREE.Box3().setFromObject(mesh)
  return box
}

function getSceneBox() {
  if (!objects.length) return null
  const box = new THREE.Box3()
  objects.forEach((obj) => {
    box.expandByObject(obj.mesh)
  })
  return box
}

function updateSelectionUI() {
  const selected = objects.find((o) => o.id === selectedId)
  if (!selected) {
    updateStatsFromBox(null)
    return
  }
  const box = getObjectBox(selected.mesh)
  updateStatsFromBox(box)

  const material = selected.mesh.material
  if (material && material.color) {
    colorInput.value = toHexColor(material.color)
  }

  const s = selected.mesh.scale.x
  scaleInput.value = s.toFixed(1)
}

function refreshObjectList() {
  objectListEl.innerHTML = ''
  objects.forEach((obj) => {
    const li = document.createElement('li')
    li.textContent = obj.name
    li.dataset.id = String(obj.id)
    li.className = 'object-list-item'
    if (obj.id === selectedId) {
      li.classList.add('selected')
    }
    li.addEventListener('click', () => {
      selectedId = obj.id
      refreshObjectList()
      updateSelectionUI()
    })
    objectListEl.appendChild(li)
  })
}

function addObject(mesh, name) {
  const id = nextId++
  mesh.userData.id = id
  mesh.userData.name = name
  scene.add(mesh)
  objects.push({ id, name, mesh })
  selectedId = id
  refreshObjectList()
  updateSelectionUI()

  const box = getObjectBox(mesh)
  frameBox(box)
}

function createMaterial(baseColor) {
  return new THREE.MeshStandardMaterial({
    color: baseColor,
    metalness: 0.1,
    roughness: 0.6,
    side: THREE.DoubleSide,
  })
}

function createPrimitiveGeometry(type) {
  switch (type) {
    case 'box':
      return new THREE.BoxGeometry(20, 20, 20)
    case 'sphere':
      return new THREE.SphereGeometry(12, 32, 16)
    case 'cylinder':
      return new THREE.CylinderGeometry(10, 10, 24, 32)
    case 'plane':
      return new THREE.PlaneGeometry(40, 40)
    default:
      return new THREE.BoxGeometry(20, 20, 20)
  }
}

function loadStlBuffers(buffers, names) {
  buffers.forEach((buffer, index) => {
    const geometry = loader.parse(buffer)
    geometry.computeVertexNormals()

    const baseColor = new THREE.Color().setHSL(Math.random(), 0.5, 0.5)
    const material = createMaterial(baseColor)

    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = false
    mesh.receiveShadow = false

    const name = names[index] || 'STL object'
    addObject(mesh, name)
  })
}

fileInput.addEventListener('change', (event) => {
  const files = Array.from(event.target.files || [])
  if (!files.length) return

  const buffers = []
  const names = []

  let remaining = files.length

  files.forEach((file, index) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      buffers[index] = e.target.result
      names[index] = file.name
      remaining -= 1
      if (remaining === 0) {
        loadStlBuffers(buffers, names)
      }
    })
    reader.readAsArrayBuffer(file)
  })
})

addPrimitiveButton.addEventListener('click', () => {
  const type = primitiveTypeSelect.value
  const geometry = createPrimitiveGeometry(type)
  const baseColor = new THREE.Color().setHSL(Math.random(), 0.5, 0.55)
  const material = createMaterial(baseColor)
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(
    (Math.random() - 0.5) * 40,
    10,
    (Math.random() - 0.5) * 40,
  )

  const prettyName = `${type.charAt(0).toUpperCase()}${type.slice(1)} ${nextId}`
  addObject(mesh, prettyName)
})

colorInput.addEventListener('input', () => {
  const selected = objects.find((o) => o.id === selectedId)
  if (!selected) return
  const material = selected.mesh.material
  if (material && material.color) {
    material.color.set(colorInput.value)
  }
})

scaleInput.addEventListener('input', () => {
  const selected = objects.find((o) => o.id === selectedId)
  if (!selected) return
  const s = parseFloat(scaleInput.value) || 1
  selected.mesh.scale.set(s, s, s)
})

resetButton.addEventListener('click', () => {
  const selected = objects.find((o) => o.id === selectedId)
  const box = selected ? getObjectBox(selected.mesh) : getSceneBox()
  frameBox(box)
  if (box) {
    updateStatsFromBox(box)
  }
})

deleteButton.addEventListener('click', () => {
  const index = objects.findIndex((o) => o.id === selectedId)
  if (index === -1) return

  const obj = objects[index]
  const mesh = obj.mesh
  scene.remove(mesh)

  if (mesh.geometry && typeof mesh.geometry.dispose === 'function') {
    mesh.geometry.dispose()
  }
  if (mesh.material) {
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((m) => m && typeof m.dispose === 'function' && m.dispose())
    } else if (typeof mesh.material.dispose === 'function') {
      mesh.material.dispose()
    }
  }

  objects.splice(index, 1)

  if (objects.length === 0) {
    selectedId = null
  } else {
    const nextIndex = Math.min(index, objects.length - 1)
    selectedId = objects[nextIndex].id
  }

  refreshObjectList()
  updateSelectionUI()
})

exportButton.addEventListener('click', () => {
  if (!objects.length) return

  const defaultName = 'scene'
  const inputName = window.prompt('File name for STL (without extension):', defaultName)
  if (!inputName) return

  const group = new THREE.Group()
  objects.forEach((obj) => {
    if (obj.mesh) {
      group.add(obj.mesh)
    }
  })

  const exporter = new STLExporter()
  const result = exporter.parse(group)

  const blob = new Blob([result], { type: 'application/vnd.ms-pki.stl' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const safeName = inputName.replace(/[^a-z0-9_\-]/gi, '_') || defaultName
  a.download = `${safeName}.stl`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
})

rotateUpButton.addEventListener('click', () => {
  const selected = objects.find((o) => o.id === selectedId)
  if (!selected) return
  selected.mesh.rotation.x -= Math.PI / 18
  const box = getObjectBox(selected.mesh)
  frameBox(box)
})

rotateDownButton.addEventListener('click', () => {
  const selected = objects.find((o) => o.id === selectedId)
  if (!selected) return
  selected.mesh.rotation.x += Math.PI / 18
  const box = getObjectBox(selected.mesh)
  frameBox(box)
})

rotateLeftButton.addEventListener('click', () => {
  const selected = objects.find((o) => o.id === selectedId)
  if (!selected) return
  selected.mesh.rotation.y += Math.PI / 18
  const box = getObjectBox(selected.mesh)
  frameBox(box)
})

rotateRightButton.addEventListener('click', () => {
  const selected = objects.find((o) => o.id === selectedId)
  if (!selected) return
  selected.mesh.rotation.y -= Math.PI / 18
  const box = getObjectBox(selected.mesh)
  frameBox(box)
})

toolModeInputs.forEach((input) => {
  input.addEventListener('change', () => {
    if (input.checked) {
      currentToolMode = input.value
      isDragging = false
      lastDrawPoint = null
      controls.enabled = currentToolMode === 'select'
    }
  })
})

function updateMouseFromEvent(event) {
  const rect = renderer.domElement.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  mouse.set(x, y)
  raycaster.setFromCamera(mouse, camera)
}

function intersectGround() {
  const point = new THREE.Vector3()
  if (raycaster.ray.intersectPlane(groundPlane, point)) {
    lastPointerPlanePoint = point.clone()
    return point
  }
  return null
}

function getIntersectedObject() {
  const meshes = objects.map((o) => o.mesh)
  const hits = raycaster.intersectObjects(meshes, false)
  return hits.length ? hits[0] : null
}

canvas.addEventListener('pointerdown', (event) => {
  if (event.button !== 0) return
  updateMouseFromEvent(event)

  if (currentToolMode === 'select') {
    const hit = getIntersectedObject()
    if (hit) {
      const mesh = hit.object
      const obj = objects.find((o) => o.mesh === mesh)
      if (obj) {
        selectedId = obj.id
        refreshObjectList()
        updateSelectionUI()
        dragMesh = mesh
        // compute how far the grab point is from the mesh vertical center
        const box = getObjectBox(mesh)
        if (box) {
          const size = new THREE.Vector3()
          const center = new THREE.Vector3()
          box.getSize(size)
          box.getCenter(center)
          const offsetY = hit.point.y - center.y
          const h = size.y || 1
          // factor between 1 and 3 depending on distance from center
          verticalDragFactor = 1 + Math.min(2, Math.abs(offsetY) / h)
        } else {
          verticalDragFactor = 1
        }
        isVerticalDrag = event.shiftKey && !event.ctrlKey
        isRotateDrag = event.shiftKey && event.ctrlKey
        lastClientY = event.clientY
        lastClientX = event.clientX

        if (!isVerticalDrag && !isRotateDrag) {
          const point = intersectGround()
          if (point) {
            dragOffset.copy(point).sub(mesh.position)
            isDragging = true
            controls.enabled = false
          }
        } else {
          isDragging = true
          controls.enabled = false
        }
      }
    } else {
      intersectGround()
    }
  } else if (currentToolMode === 'draw') {
    const point = intersectGround()
    if (!point) return

    if (!lastDrawPoint) {
      lastDrawPoint = point.clone()
    } else {
      const points = [lastDrawPoint.clone(), point.clone()]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const baseColor = new THREE.Color().setHSL(Math.random(), 0.7, 0.6)
      const material = new THREE.LineBasicMaterial({ color: baseColor })
      const line = new THREE.Line(geometry, material)
      const name = `Line ${nextId}`
      addObject(line, name)
      lastDrawPoint = point.clone()
    }
  }
})

canvas.addEventListener('pointermove', (event) => {
  updateMouseFromEvent(event)
  const point = intersectGround()

  if (currentToolMode === 'select' && isDragging && dragMesh) {
    if (isRotateDrag) {
      const dx = event.clientX - lastClientX
      lastClientX = event.clientX
      dragMesh.rotation.y -= (dx * Math.PI) / 360
    } else if (isVerticalDrag) {
      const dy = event.clientY - lastClientY
      lastClientY = event.clientY
      dragMesh.position.y -= dy * 0.5 * verticalDragFactor
    } else {
      if (!point) return
      dragMesh.position.copy(point.clone().sub(dragOffset))
    }
    updateSelectionUI()
  }
})

canvas.addEventListener('pointerup', () => {
  if (isDragging) {
    isDragging = false
    dragMesh = null
    isVerticalDrag = false
    isRotateDrag = false
    controls.enabled = currentToolMode === 'select'
  }
})

// Collapsible sidebar sections
const panelSections = document.querySelectorAll('.panel-section')
panelSections.forEach((section) => {
  const header = section.querySelector('h2')
  const body = section.querySelector('.panel-body')
  if (!header || !body) return

  header.addEventListener('click', (event) => {
    const targetTag = event.target.tagName.toLowerCase()
    if (['button', 'input', 'select', 'label'].includes(targetTag)) return
    section.classList.toggle('collapsed')
  })
})

function onWindowResize() {
  const width = viewerContainer.clientWidth
  const height = viewerContainer.clientHeight
  if (width === 0 || height === 0) return

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height, false)
}

window.addEventListener('resize', onWindowResize)

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

onWindowResize()
animate()

