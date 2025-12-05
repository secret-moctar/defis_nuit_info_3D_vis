import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div id="dashboard" class="dashboard">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Utopia 3D Studio</h1>
        <p class="hero-subtitle">Visionneuse STL professionnelle & Éditeur 3D</p>
        <p class="hero-description">
          Importez, visualisez et manipulez des fichiers STL avec précision. Calculez les volumes, les dimensions,
          et exportez vos créations. Parfait pour l’impression 3D, l’analyse CAD et les projets créatifs.
        </p>

        <div class="hero-features">
          <div class="feature-item">
            <span class="feature-icon">📁</span>
            <span>Importation multi-fichiers STL</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📐</span>
            <span>Mesures précises</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <span>Outils de manipulation 3D</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📱</span>
            <span>Adapté au mobile</span>
          </div>
        </div>

        <div class="hero-actions">
          <button id="startButton" class="btn btn-primary btn-large">
            Commencer la création
          </button>
          <button id="loadSamplesButton" class="btn btn-ghost btn-large">
            Essayer des fichiers exemples
          </button>
        </div>
      </div>

      <div class="hero-visual">
        <div class="sample-preview">
          <div class="preview-cube"></div>
          <div class="preview-pyramid"></div>
          <div class="preview-sphere"></div>
        </div>
      </div>
    </div>
  </div>

  <div id="workspace" class="workspace" style="display: none;">
    <div class="sidebar">
      <div class="sidebar-header">
        <h1 class="sidebar-title">Utopia 3D</h1>
        <button id="backToDashboard" class="btn btn-ghost btn-icon">⬅</button>
      </div>

      <div class="sidebar-section">
        <div class="section-header" data-section="load">
          <span class="section-title">Charger des fichiers STL</span>
          <span class="section-toggle">▲</span>
        </div>
        <div class="section-content expanded" data-content="load">
          <input type="file" id="fileInput" accept=".stl" multiple />
          <div class="drag-drop-zone" id="dragDropZone">
            <span class="drag-drop-text">Glissez-déposez les fichiers STL ici</span>
            <span class="drag-drop-subtext">ou cliquez pour parcourir</span>
          </div>
          <div id="loadingIndicator" class="loading-indicator" style="display: none;">
            <div class="loading-spinner"></div>
            <span>Chargement des fichiers STL...</span>
          </div>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" data-section="recent">
          <span class="section-title">Fichiers récents</span>
          <span class="section-toggle">▼</span>
        </div>
        <div class="section-content" data-content="recent">
          <div id="recentFiles" class="recent-files-list">
            <div class="empty-state">Aucun fichier récent</div>
          </div>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" data-section="create">
          <span class="section-title">Créer des formes</span>
          <span class="section-toggle">▼</span>
        </div>
        <div class="section-content" data-content="create">
          <div class="field-row">
            <select id="primitiveType" class="select">
              <option value="box">Boîte</option>
              <option value="sphere">Sphère</option>
              <option value="cylinder">Cylindre</option>
              <option value="plane">Plan</option>
            </select>
            <button id="addPrimitive" class="btn btn-primary">Ajouter</button>
          </div>
          <button id="generateSample" class="btn btn-ghost btn-full">Générer un exemple</button>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" data-section="objects">
          <span class="section-title">Objets de la scène</span>
          <span class="section-toggle">▲</span>
        </div>
        <div class="section-content expanded" data-content="objects">
          <ul id="objectList" class="object-list"></ul>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" data-section="properties">
          <span class="section-title">Propriétés</span>
          <span class="section-toggle">▲</span>
        </div>
        <div class="section-content expanded" data-content="properties">
          <div class="stats-grid">
            <div>
              <div class="stats-grid-item-label">Largeur</div>
              <div id="stat-width" class="stats-grid-item-value">-</div>
            </div>
            <div>
              <div class="stats-grid-item-label">Hauteur</div>
              <div id="stat-height" class="stats-grid-item-value">-</div>
            </div>
            <div>
              <div class="stats-grid-item-label">Profondeur</div>
              <div id="stat-depth" class="stats-grid-item-value">-</div>
            </div>
            <div>
              <div class="stats-grid-item-label">Volume</div>
              <div id="stat-volume" class="stats-grid-item-value">-</div>
            </div>
            <div>
              <div class="stats-grid-item-label">Polygones</div>
              <div id="stat-polygons" class="stats-grid-item-value">-</div>
            </div>
            <div>
              <div class="stats-grid-item-label">Taille du fichier</div>
              <div id="stat-filesize" class="stats-grid-item-value">-</div>
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">Couleur</span>
            <input type="color" id="colorInput" value="#4caf50" class="color-input" />
          </div>

          <div class="field-row">
            <span class="field-label">Échelle</span>
            <input type="range" id="scaleInput" min="0.1" max="3" step="0.1" value="1" class="slider" />
            <span id="scaleValue">1.0</span>
          </div>

          <div class="control-buttons">
            <button id="resetView" class="btn btn-ghost">Cadrer la vue</button>
            <button id="deleteObject" class="btn btn-danger">Supprimer</button>
            <button id="clearAll" class="btn btn-danger">Tout effacer</button>
            <button id="exportStl" class="btn btn-primary btn-full">Exporter STL</button>
          </div>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" data-section="tools">
          <span class="section-title">Outils</span>
          <span class="section-toggle">▼</span>
        </div>
        <div class="section-content" data-content="tools">
          <div class="radio-list">
            <label class="radio-item">
              <input type="radio" name="toolMode" value="select" checked />
              <span>Sélection / déplacement</span>
            </label>
            <label class="radio-item">
              <input type="radio" name="toolMode" value="draw" />
              <span>Dessiner des lignes</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="viewer">
        <canvas id="viewerCanvas"></canvas>
        <div class="viewer-overlay">
          <div class="viewer-info">
            <span id="objectCount">0 objets</span>
            <span id="cameraInfo">Caméra : Accueil</span>
          </div>

          <div class="top-controls">
            <div class="rotation-controls">
              <span class="control-label">Orienter :</span>
              <button id="rotateUp" type="button" class="btn btn-ghost btn-icon" title="Tourner vers le haut">↑</button>
              <button id="rotateDown" type="button" class="btn btn-ghost btn-icon" title="Tourner vers le bas">↓</button>
              <button id="rotateLeft" type="button" class="btn btn-ghost btn-icon" title="Tourner à gauche">⟲</button>
              <button id="rotateRight" type="button" class="btn btn-ghost btn-icon" title="Tourner à droite">⟳</button>
            </div>

            <div class="camera-controls-compact">
              <span class="control-label">Vue :</span>
              <button id="viewTop" class="btn btn-ghost btn-icon" title="Vue de dessus">⬆</button>
              <button id="viewFront" class="btn btn-ghost btn-icon" title="Vue de face">↗</button>
              <button id="viewRight" class="btn btn-ghost btn-icon" title="Vue droite">➡</button>
              <button id="viewLeft" class="btn btn-ghost btn-icon" title="Vue gauche">⬅</button>
              <button id="viewHome" class="btn btn-primary btn-icon" title="Vue par défaut">🏠</button>
              <button id="viewBack" class="btn btn-ghost btn-icon" title="Vue arrière">↙</button>
              <button id="viewBottom" class="btn btn-ghost btn-icon" title="Vue dessous">⬇</button>
              <button id="viewIso" class="btn btn-ghost btn-icon" title="Vue isométrique">🔄</button>
              <button id="resetCamera" class="btn btn-ghost btn-icon" title="Réinitialiser la caméra">⭕</button>
            </div>

            <div class="scene-controls">
              <button id="clearAllTop" class="btn btn-danger btn-icon" title="Effacer tous les objets">🧹</button>
            </div>

            <div class="control-instructions">
              <div class="control-item">
                <span class="control-key">Glisser gauche :</span>
                <span class="control-desc">Tourner la vue</span>
              </div>
              <div class="control-item">
                <span class="control-key">Glisser droit :</span>
                <span class="control-desc">Déplacer la vue</span>
              </div>
              <div class="control-item">
                <span class="control-key">Molette :</span>
                <span class="control-desc">Zoom</span>
              </div>
              <div class="control-item">
                <span class="control-key">Shift+Glisser :</span>
                <span class="control-desc">Déplacer l’objet</span>
              </div>
              <div class="control-item">
                <span class="control-key">Shift+Ctrl+Glisser :</span>
                <span class="control-desc">Tourner l’objet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="dragOverlay" class="drag-overlay" style="display: none;">
        <div class="drag-overlay-content">
          <div class="drag-overlay-icon">📁</div>
          <div class="drag-overlay-text">Déposez les fichiers STL ici</div>
          <div class="drag-overlay-subtext">Plusieurs fichiers pris en charge</div>
        </div>
      </div>
    </div>
  </div>

`;

// Prevent double initialization
let isInitialized = false;

// Three.js globals
let scene, camera, renderer, controls, loader;

// Application state
let objects = [];
let selectedId = null;
let nextId = 1;
let currentToolMode = "select";

// Mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let isDragging = false;
let dragOffset = new THREE.Vector3();
let dragMesh = null;
let isVerticalDrag = false;
let isRotateDrag = false;
let lastClientY = 0;
let lastClientX = 0;
let verticalDragFactor = 1;

// Recent files
let recentFiles = JSON.parse(
  localStorage.getItem("utopia-recent-files") || "[]",
);

// DOM elements
const canvas = document.getElementById("viewerCanvas");
const fileInput = document.getElementById("fileInput");
const resetButton = document.getElementById("resetView");
const deleteButton = document.getElementById("deleteObject");
const clearAllButton = document.getElementById("clearAll");
const clearAllTopButton = document.getElementById("clearAllTop");
const exportButton = document.getElementById("exportStl");
const widthEl = document.getElementById("stat-width");
const heightEl = document.getElementById("stat-height");
const depthEl = document.getElementById("stat-depth");
const volumeEl = document.getElementById("stat-volume");
const polygonsEl = document.getElementById("stat-polygons");
const filesizeEl = document.getElementById("stat-filesize");
const primitiveTypeSelect = document.getElementById("primitiveType");
const addPrimitiveButton = document.getElementById("addPrimitive");
const generateSampleButton = document.getElementById("generateSample");
const objectListEl = document.getElementById("objectList");
const colorInput = document.getElementById("colorInput");
const scaleInput = document.getElementById("scaleInput");
const scaleValue = document.getElementById("scaleValue");
const toolModeInputs = document.querySelectorAll('input[name="toolMode"]');
const rotateUpButton = document.getElementById("rotateUp");
const rotateDownButton = document.getElementById("rotateDown");
const rotateLeftButton = document.getElementById("rotateLeft");
const rotateRightButton = document.getElementById("rotateRight");

// Initialize Three.js
function initThreeJS() {
  if (scene) return; // Prevent double initialization

  const viewerContainer = canvas.parentElement;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x151515);

  const fov = 45;
  camera = new THREE.PerspectiveCamera(
    fov,
    viewerContainer.clientWidth / viewerContainer.clientHeight,
    0.1,
    2000,
  );
  camera.position.set(120, 120, 120);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(
    viewerContainer.clientWidth,
    viewerContainer.clientHeight,
    false,
  );

  // Lighting and helpers
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222233, 0.6);
  hemiLight.position.set(0, 1, 0);
  scene.add(hemiLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
  dirLight2.position.set(-1, 0.5, -0.5);
  scene.add(dirLight2);

  const grid = new THREE.GridHelper(400, 40, 0x444444, 0x222222);
  grid.position.y = -0.01;
  scene.add(grid);

  // Enhanced controls with faster zoom
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 0, 0);
  controls.zoomSpeed = 2.5; // Much faster zoom!
  controls.rotateSpeed = 1.0;
  controls.panSpeed = 1.0;

  loader = new STLLoader();

  animate();
  console.log("Three.js initialized");
}

// Utility functions
function toHexColor(color) {
  const hex = color.getHexString();
  return `#${hex}`;
}

function calculateVolume(mesh) {
  if (!mesh || !mesh.geometry) return 0;
  const geometry = mesh.geometry;
  if (!geometry.attributes.position) return 0;

  const positions = geometry.attributes.position.array;
  let volume = 0;

  for (let i = 0; i < positions.length; i += 9) {
    const v1 = new THREE.Vector3(
      positions[i],
      positions[i + 1],
      positions[i + 2],
    );
    const v2 = new THREE.Vector3(
      positions[i + 3],
      positions[i + 4],
      positions[i + 5],
    );
    const v3 = new THREE.Vector3(
      positions[i + 6],
      positions[i + 7],
      positions[i + 8],
    );

    v1.multiply(mesh.scale);
    v2.multiply(mesh.scale);
    v3.multiply(mesh.scale);

    volume += v1.dot(v2.clone().cross(v3)) / 6;
  }

  return Math.abs(volume);
}

function updateStatsFromBox(box, mesh) {
  if (!box) {
    widthEl.textContent = "-";
    heightEl.textContent = "-";
    depthEl.textContent = "-";
    volumeEl.textContent = "-";
    polygonsEl.textContent = "-";
    filesizeEl.textContent = "-";
    return;
  }

  const size = new THREE.Vector3();
  box.getSize(size);
  widthEl.textContent = size.x.toFixed(2);
  heightEl.textContent = size.y.toFixed(2);
  depthEl.textContent = size.z.toFixed(2);

  if (mesh) {
    const volume = calculateVolume(mesh);
    volumeEl.textContent = volume > 0 ? volume.toFixed(3) : "N/A";

    const geometry = mesh.geometry;
    if (geometry && geometry.attributes.position) {
      const polygonCount = geometry.attributes.position.count / 3;
      polygonsEl.textContent = Math.floor(polygonCount).toLocaleString();
    } else {
      polygonsEl.textContent = "N/A";
    }

    if (mesh.userData.fileSize) {
      const size = mesh.userData.fileSize;
      if (size < 1024) {
        filesizeEl.textContent = size + " B";
      } else if (size < 1024 * 1024) {
        filesizeEl.textContent = (size / 1024).toFixed(1) + " KB";
      } else {
        filesizeEl.textContent = (size / (1024 * 1024)).toFixed(1) + " MB";
      }
    } else {
      filesizeEl.textContent = "N/A";
    }
  } else {
    volumeEl.textContent = "-";
    polygonsEl.textContent = "-";
    filesizeEl.textContent = "-";
  }
}

function frameBox(box) {
  if (!box) return;
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  const fovRad = (camera.fov * Math.PI) / 180;
  let cameraDist = maxDim / (2 * Math.tan(fovRad / 2));
  cameraDist *= 2.5;

  camera.position.copy(
    new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(cameraDist),
  );
  camera.position.add(center);
  controls.target.copy(center);
  controls.update();
}

function getObjectBox(mesh) {
  if (!mesh) return null;
  const box = new THREE.Box3().setFromObject(mesh);
  return box;
}

function getSceneBox() {
  if (!objects.length) return null;
  const box = new THREE.Box3();
  objects.forEach((obj) => {
    box.expandByObject(obj.mesh);
  });
  return box;
}

function updateSelectionUI() {
  const selected = objects.find((o) => o.id === selectedId);
  if (!selected) {
    updateStatsFromBox(null);
    return;
  }
  const box = getObjectBox(selected.mesh);
  updateStatsFromBox(box, selected.mesh);

  const material = selected.mesh.material;
  if (material && material.color) {
    colorInput.value = toHexColor(material.color);
  }

  const s = selected.mesh.scale.x;
  scaleInput.value = s.toFixed(1);
  scaleValue.textContent = s.toFixed(1);
}

function refreshObjectList() {
  objectListEl.innerHTML = "";
  objects.forEach((obj) => {
    const li = document.createElement("li");
    li.textContent = obj.name;
    li.dataset.id = String(obj.id);
    li.className = "object-list-item";
    if (obj.id === selectedId) {
      li.classList.add("selected");
    }
    li.addEventListener("click", () => {
      selectedId = obj.id;
      refreshObjectList();
      updateSelectionUI();
    });
    objectListEl.appendChild(li);
  });

  const objectCountEl = document.getElementById("objectCount");
  objectCountEl.textContent =
    objects.length === 0
      ? "0 objects"
      : `${objects.length} object${objects.length !== 1 ? "s" : ""}`;
}

function addObject(mesh, name, isFromFile = false) {
  const id = nextId++;
  mesh.userData.id = id;
  mesh.userData.name = name;
  scene.add(mesh);
  objects.push({ id, name, mesh });
  selectedId = id;
  refreshObjectList();
  updateSelectionUI();

  const box = getObjectBox(mesh);
  frameBox(box);

  if (isFromFile) {
    addToRecentFiles(name, mesh.userData.fileSize || 0);
  }

  // Single notification only
  showNotification(`✅ ${name} added`, "success");
}

function createMaterial(baseColor) {
  return new THREE.MeshStandardMaterial({
    color: baseColor,
    metalness: 0.1,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
}

function createPrimitiveGeometry(type) {
  switch (type) {
    case "box":
      return new THREE.BoxGeometry(20, 20, 20);
    case "sphere":
      return new THREE.SphereGeometry(12, 32, 16);
    case "cylinder":
      return new THREE.CylinderGeometry(10, 10, 24, 32);
    case "plane":
      return new THREE.PlaneGeometry(40, 40);
    default:
      return new THREE.BoxGeometry(20, 20, 20);
  }
}

// Notification system (prevent duplicates)
let currentNotification = null;
function showNotification(message, type = "info") {
  // Remove existing notification
  if (currentNotification && currentNotification.parentNode) {
    document.body.removeChild(currentNotification);
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  currentNotification = notification;

  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add("show"), 100);
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 2000);
}

function addToRecentFiles(filename, size) {
  const file = { name: filename, size: size, date: new Date().toISOString() };
  recentFiles = recentFiles.filter((f) => f.name !== filename);
  recentFiles.unshift(file);
  recentFiles = recentFiles.slice(0, 10);
  localStorage.setItem("utopia-recent-files", JSON.stringify(recentFiles));
  updateRecentFilesList();
}

function updateRecentFilesList() {
  const recentFilesEl = document.getElementById("recentFiles");
  if (recentFiles.length === 0) {
    recentFilesEl.innerHTML = '<div class="empty-state">No recent files</div>';
    return;
  }

  recentFilesEl.innerHTML = "";
  recentFiles.forEach((file) => {
    const item = document.createElement("div");
    item.className = "recent-file-item";
    const sizeStr =
      file.size < 1024
        ? `${file.size} B`
        : file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    const date = new Date(file.date).toLocaleDateString();
    item.innerHTML = `
      <div class="recent-file-name">${file.name}</div>
      <div class="recent-file-meta">${sizeStr} • ${date}</div>
    `;
    recentFilesEl.appendChild(item);
  });
}

function loadStlBuffers(buffers, names, fileSizes) {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "flex";

  setTimeout(() => {
    try {
      buffers.forEach((buffer, index) => {
        const geometry = loader.parse(buffer);
        geometry.computeVertexNormals();

        const baseColor = new THREE.Color().setHSL(Math.random(), 0.5, 0.5);
        const material = createMaterial(baseColor);

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = false;
        mesh.receiveShadow = false;

        if (fileSizes && fileSizes[index]) {
          mesh.userData.fileSize = fileSizes[index];
        }

        const name = names[index] || "STL object";
        addObject(mesh, name, true);
      });
    } catch (error) {
      console.error("Error loading STL files:", error);
      showNotification("❌ Error loading STL files", "error");
    } finally {
      loadingIndicator.style.display = "none";
    }
  }, 100);
}

function handleFiles(files) {
  const stlFiles = Array.from(files).filter((file) =>
    file.name.toLowerCase().endsWith(".stl"),
  );

  if (stlFiles.length === 0) {
    showNotification("Please select STL files only", "warning");
    return;
  }

  const oversizedFiles = stlFiles.filter(
    (file) => file.size > 50 * 1024 * 1024,
  );
  if (oversizedFiles.length > 0) {
    showNotification("Files too large (max 50MB each)", "error");
    return;
  }

  const buffers = [];
  const names = [];
  const fileSizes = [];
  let remaining = stlFiles.length;

  stlFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      buffers[index] = e.target.result;
      names[index] = file.name;
      fileSizes[index] = file.size;
      remaining -= 1;
      if (remaining === 0) {
        loadStlBuffers(buffers, names, fileSizes);
      }
    });
    reader.readAsArrayBuffer(file);
  });
}

// Mouse interaction functions
function updateMouseFromEvent(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  mouse.set(x, y);
  raycaster.setFromCamera(mouse, camera);
}

function intersectGround() {
  const point = new THREE.Vector3();
  if (raycaster.ray.intersectPlane(groundPlane, point)) {
    return point;
  }
  return null;
}

function getIntersectedObject() {
  const meshes = objects.map((o) => o.mesh);
  const hits = raycaster.intersectObjects(meshes, false);
  return hits.length ? hits[0] : null;
}

// Camera view functions
function setCameraView(x, y, z, name) {
  if (camera && controls) {
    camera.position.set(x, y, z);
    controls.target.set(0, 0, 0);
    controls.update();
    const cameraInfo = document.getElementById("cameraInfo");
    if (cameraInfo) cameraInfo.textContent = `Camera: ${name}`;
  }
}

function animate() {
  requestAnimationFrame(animate);
  if (controls) controls.update();
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

function onWindowResize() {
  if (!camera || !renderer) return;
  const viewerContainer = canvas.parentElement;
  const width = viewerContainer.clientWidth;
  const height = viewerContainer.clientHeight;
  if (width === 0 || height === 0) return;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

// Setup all event listeners (only once)
function setupEventListeners() {
  if (isInitialized) return;
  isInitialized = true;

  console.log("Setting up event listeners...");

  // Dashboard navigation
  document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("workspace").style.display = "flex";
    setTimeout(initThreeJS, 100);
  });

  document.getElementById("loadSamplesButton").addEventListener("click", () => {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("workspace").style.display = "flex";
    setTimeout(() => {
      initThreeJS();
      // Add sample objects
      setTimeout(() => {
        ["box", "sphere", "cylinder"].forEach((shape, index) => {
          const geometry = createPrimitiveGeometry(shape);
          const baseColor = new THREE.Color().setHSL(Math.random(), 0.6, 0.5);
          const material = createMaterial(baseColor);
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set((index - 1) * 30, 0, 0);
          addObject(
            mesh,
            `Sample ${shape.charAt(0).toUpperCase() + shape.slice(1)}`,
          );
        });
      }, 500);
    }, 100);
  });

  document.getElementById("backToDashboard").addEventListener("click", () => {
    document.getElementById("workspace").style.display = "none";
    document.getElementById("dashboard").style.display = "flex";
  });

  // Sidebar sections
  document.querySelectorAll(".section-header").forEach((header) => {
    header.addEventListener("click", () => {
      const section = header.dataset.section;
      const content = document.querySelector(`[data-content="${section}"]`);
      const toggle = header.querySelector(".section-toggle");
      const isExpanded = content.classList.contains("expanded");

      if (isExpanded) {
        content.classList.remove("expanded");
        toggle.textContent = "▼";
      } else {
        content.classList.add("expanded");
        toggle.textContent = "▲";
      }
    });
  });

  // File input
  fileInput.addEventListener("change", (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    handleFiles(files);
  });

  // Drag and drop
  document.getElementById("dragDropZone").addEventListener("click", () => {
    fileInput.click();
  });

  document.addEventListener("dragover", (e) => {
    e.preventDefault();
    const workspace = document.getElementById("workspace");
    const dragOverlay = document.getElementById("dragOverlay");
    if (workspace.style.display !== "none" && dragOverlay) {
      dragOverlay.style.display = "flex";
      dragOverlay.classList.add("active");
    }
  });

  document.addEventListener("dragleave", (e) => {
    if (!e.relatedTarget || !document.contains(e.relatedTarget)) {
      const dragOverlay = document.getElementById("dragOverlay");
      if (dragOverlay) {
        dragOverlay.style.display = "none";
        dragOverlay.classList.remove("active");
      }
    }
  });

  document.addEventListener("drop", (e) => {
    e.preventDefault();
    const dragOverlay = document.getElementById("dragOverlay");
    if (dragOverlay) {
      dragOverlay.style.display = "none";
      dragOverlay.classList.remove("active");
    }
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  });

  // Object creation
  addPrimitiveButton.addEventListener("click", () => {
    const type = primitiveTypeSelect.value;
    const geometry = createPrimitiveGeometry(type);
    const baseColor = new THREE.Color().setHSL(Math.random(), 0.5, 0.55);
    const material = createMaterial(baseColor);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(
      (Math.random() - 0.5) * 40,
      10,
      (Math.random() - 0.5) * 40,
    );

    const prettyName = `${type.charAt(0).toUpperCase()}${type.slice(1)} ${nextId}`;
    addObject(mesh, prettyName);
  });

  generateSampleButton.addEventListener("click", () => {
    const vertices = [
      0, 0, 0, 20, 0, 0, 10, 0, 17.32, 0, 0, 0, 10, 0, 17.32, -10, 0, 17.32, 0,
      0, 0, -10, 0, 17.32, -20, 0, 0, 0, 0, 0, -20, 0, 0, 10, 0, -17.32, 0, 0,
      0, 10, 0, -17.32, 20, 0, 0, 10, 15, 5.77, 20, 0, 0, 10, 0, 17.32, 10, 15,
      5.77, 10, 0, 17.32, -10, 0, 17.32, 10, 15, 5.77, -10, 0, 17.32, -20, 0, 0,
      10, 15, 5.77, -20, 0, 0, 10, 0, -17.32, 10, 15, 5.77, 10, 0, -17.32, 20,
      0, 0,
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    geometry.computeVertexNormals();

    const baseColor = new THREE.Color().setHSL(Math.random(), 0.6, 0.5);
    const material = createMaterial(baseColor);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(
      (Math.random() - 0.5) * 30,
      8,
      (Math.random() - 0.5) * 30,
    );

    addObject(mesh, `Sample Pyramid ${nextId}`);
  });

  // Object controls
  colorInput.addEventListener("input", () => {
    const selected = objects.find((o) => o.id === selectedId);
    if (!selected) return;
    const material = selected.mesh.material;
    if (material && material.color) {
      material.color.set(colorInput.value);
    }
  });

  scaleInput.addEventListener("input", () => {
    const selected = objects.find((o) => o.id === selectedId);
    if (!selected) return;
    const s = parseFloat(scaleInput.value) || 1;
    selected.mesh.scale.set(s, s, s);
    scaleValue.textContent = s.toFixed(1);
    updateSelectionUI();
  });

  resetButton.addEventListener("click", () => {
    const selected = objects.find((o) => o.id === selectedId);
    const box = selected ? getObjectBox(selected.mesh) : getSceneBox();
    frameBox(box);
    if (box) {
      updateStatsFromBox(box);
    }
  });

  deleteButton.addEventListener("click", () => {
    const index = objects.findIndex((o) => o.id === selectedId);
    if (index === -1) return;

    const obj = objects[index];
    const mesh = obj.mesh;
    scene.remove(mesh);

    if (mesh.geometry && typeof mesh.geometry.dispose === "function") {
      mesh.geometry.dispose();
    }
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(
          (m) => m && typeof m.dispose === "function" && m.dispose(),
        );
      } else if (typeof mesh.material.dispose === "function") {
        mesh.material.dispose();
      }
    }

    objects.splice(index, 1);

    if (objects.length === 0) {
      selectedId = null;
    } else {
      const nextIndex = Math.min(index, objects.length - 1);
      selectedId = objects[nextIndex].id;
    }

    refreshObjectList();
    updateSelectionUI();
    showNotification("🗑️ Object deleted", "info");
  });

  // Shared function to clear all objects
  function clearAllObjects() {
    if (objects.length === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to remove all ${objects.length} objects? This cannot be undone.`,
    );
    if (!confirmed) return;

    // Remove all objects from the scene and dispose of their resources
    objects.forEach((obj) => {
      const mesh = obj.mesh;
      scene.remove(mesh);

      // Dispose geometry
      if (mesh.geometry && typeof mesh.geometry.dispose === "function") {
        mesh.geometry.dispose();
      }

      // Dispose materials
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(
            (m) => m && typeof m.dispose === "function" && m.dispose(),
          );
        } else if (typeof mesh.material.dispose === "function") {
          mesh.material.dispose();
        }
      }
    });

    // Clear the objects array and reset selection
    objects.length = 0;
    selectedId = null;
    nextId = 1;

    // Update UI
    refreshObjectList();
    updateSelectionUI();

    // Reset camera to default position
    setCameraView(120, 120, 120, "Home");

    showNotification("🧹 All objects cleared", "success");
  }

  clearAllButton.addEventListener("click", clearAllObjects);
  clearAllTopButton.addEventListener("click", clearAllObjects);

  exportButton.addEventListener("click", () => {
    if (!objects.length) return;

    const defaultName = "scene";
    const inputName = window.prompt(
      "File name for STL (without extension):",
      defaultName,
    );
    if (!inputName) return;

    const group = new THREE.Group();
    objects.forEach((obj) => {
      if (obj.mesh) {
        group.add(obj.mesh);
      }
    });

    const exporter = new STLExporter();
    const result = exporter.parse(group);

    const blob = new Blob([result], { type: "application/vnd.ms-pki.stl" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = inputName.replace(/[^a-z0-9_\-]/gi, "_") || defaultName;
    a.download = `${safeName}.stl`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification("💾 STL exported", "success");
  });

  // Rotation buttons
  rotateUpButton.addEventListener("click", () => {
    const selected = objects.find((o) => o.id === selectedId);
    if (!selected) return;
    selected.mesh.rotation.x -= Math.PI / 18;
    const box = getObjectBox(selected.mesh);
    frameBox(box);
  });

  rotateDownButton.addEventListener("click", () => {
    const selected = objects.find((o) => o.id === selectedId);
    if (!selected) return;
    selected.mesh.rotation.x += Math.PI / 18;
    const box = getObjectBox(selected.mesh);
    frameBox(box);
  });

  rotateLeftButton.addEventListener("click", () => {
    const selected = objects.find((o) => o.id === selectedId);
    if (!selected) return;
    selected.mesh.rotation.y += Math.PI / 18;
    const box = getObjectBox(selected.mesh);
    frameBox(box);
  });

  rotateRightButton.addEventListener("click", () => {
    const selected = objects.find((o) => o.id === selectedId);
    if (!selected) return;
    selected.mesh.rotation.y -= Math.PI / 18;
    const box = getObjectBox(selected.mesh);
    frameBox(box);
  });

  // Camera view buttons
  const viewButtons = {
    viewTop: () => setCameraView(0, 150, 0, "Top"),
    viewFront: () => setCameraView(0, 0, 150, "Front"),
    viewRight: () => setCameraView(150, 0, 0, "Right"),
    viewLeft: () => setCameraView(-150, 0, 0, "Left"),
    viewBack: () => setCameraView(0, 0, -150, "Back"),
    viewBottom: () => setCameraView(0, -150, 0, "Bottom"),
    viewIso: () => setCameraView(105, 105, 105, "Isometric"),
    viewHome: () => setCameraView(120, 120, 120, "Home"),
    resetCamera: () => setCameraView(120, 120, 120, "Reset"),
  };

  Object.entries(viewButtons).forEach(([id, handler]) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", handler);
    }
  });

  // Tool mode selection
  toolModeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        currentToolMode = input.value;
        isDragging = false;
        controls.enabled = currentToolMode === "select";
      }
    });
  });

  // Mouse interaction for object manipulation
  canvas.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    updateMouseFromEvent(event);

    if (currentToolMode === "select") {
      const hit = getIntersectedObject();
      if (hit) {
        const mesh = hit.object;
        const obj = objects.find((o) => o.mesh === mesh);
        if (obj) {
          selectedId = obj.id;
          refreshObjectList();
          updateSelectionUI();
          dragMesh = mesh;

          const box = getObjectBox(mesh);
          if (box) {
            const size = new THREE.Vector3();
            const center = new THREE.Vector3();
            box.getSize(size);
            box.getCenter(center);
            const offsetY = hit.point.y - center.y;
            const h = size.y || 1;
            verticalDragFactor = 1 + Math.min(2, Math.abs(offsetY) / h);
          } else {
            verticalDragFactor = 1;
          }

          isVerticalDrag = event.shiftKey && !event.ctrlKey;
          isRotateDrag = event.shiftKey && event.ctrlKey;
          lastClientY = event.clientY;
          lastClientX = event.clientX;

          if (!isVerticalDrag && !isRotateDrag) {
            const point = intersectGround();
            if (point) {
              dragOffset.copy(point).sub(mesh.position);
              isDragging = true;
              controls.enabled = false;
            }
          } else {
            isDragging = true;
            controls.enabled = false;
          }
        }
      }
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    updateMouseFromEvent(event);
    const point = intersectGround();

    if (currentToolMode === "select" && isDragging && dragMesh) {
      if (isRotateDrag) {
        const dx = event.clientX - lastClientX;
        lastClientX = event.clientX;
        dragMesh.rotation.y -= (dx * Math.PI) / 360;
      } else if (isVerticalDrag) {
        const dy = event.clientY - lastClientY;
        lastClientY = event.clientY;
        dragMesh.position.y -= dy * 0.5 * verticalDragFactor;
      } else {
        if (!point) return;
        dragMesh.position.copy(point.clone().sub(dragOffset));
      }
      updateSelectionUI();
    }
  });

  canvas.addEventListener("pointerup", () => {
    if (isDragging) {
      isDragging = false;
      dragMesh = null;
      isVerticalDrag = false;
      isRotateDrag = false;
      controls.enabled = currentToolMode === "select";
    }
  });

  // Window resize
  window.addEventListener("resize", onWindowResize);

  console.log("All event listeners set up successfully");
}

// Initialize everything
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    updateRecentFilesList();
  });
} else {
  setupEventListeners();
  updateRecentFilesList();
}
