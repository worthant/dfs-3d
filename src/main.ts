import * as th from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { sphere, plane } from './terrain';

function initScene(): th.Scene {
  const scene = new th.Scene();
  scene.background = new th.Color(0x87ceeb);
  return scene;
}

function initLighting(sc: th.Scene): void {
  const direct = new th.DirectionalLight(0xffffff, 1);
  direct.position.set(5, 15, 5);
  // setup shadows
  direct.castShadow = true;
  direct.shadow.mapSize.width = 1024;
  direct.shadow.mapSize.height = 1024;
  direct.shadow.camera.near = 0.5;
  direct.shadow.camera.far = 100;
  sc.add(direct);
}


function initCamera(): th.PerspectiveCamera {
  const camera = new th.PerspectiveCamera(
    40, // FOV - Field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // don't render anything closer than 0.1 units
    1000, // don't render anything further than 1000 units
  );
  camera.position.set(20, 20, 20); // move camera to those xyz coords
  return camera;
}

function initRenderer(): th.WebGLRenderer {
  // turn on antialiasing for smoother looks
  const renderer = new th.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function initControls(
  camera: th.Camera,
  renderer: th.WebGLRenderer,
): OrbitControls {
  // allow orbiting camera around the (0;0;0) of the scene
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0); // focus on the center of the scene
  controls.update();
  return controls;
}

function handleResize(
  camera: th.PerspectiveCamera,
  renderer: th.WebGLRenderer,
): void {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate(
  renderer: th.WebGLRenderer,
  scene: th.Scene,
  camera: th.Camera,
): void {
  function loop() {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  loop();
}

function main(): void {
  const scene = initScene(),
    camera = initCamera(),
    renderer = initRenderer();
  initLighting(scene);
  initControls(camera, renderer);
  // const simpleCube = cube(scene);
  sphere(scene);
  plane(scene);
  handleResize(camera, renderer);
  animate(renderer, scene, camera);
}

main();
