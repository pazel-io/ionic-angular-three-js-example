import * as THREE from 'three';
import { OrbitControls } from './threejs/controls/OrbitControls.js';
import { GLTFLoader } from './threejs/loaders/GLTFLoader.js';

export const loadGLTF = ({
  fileName,
  filePath,
  container,
  position = [0, 0, 5],
  heightOffset = 95,
}) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / (window.innerHeight - heightOffset),
    0.1,
    1000
  );
  camera.position.set(...position);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0.0);
  renderer.setSize(window.innerWidth, window.innerHeight - heightOffset);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  // const axesHelper = new THREE.AxesHelper(50000);
  // scene.add(axesHelper);

  // Load the Orbitcontroller
  const controls = new OrbitControls(camera, renderer.domElement);

  // Load Light
  const ambientLight = new THREE.AmbientLight(0xcccccc); // soft white light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight2.position.set(1, 0, 0);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight3.position.set(0, 0, 1);
  scene.add(directionalLight3);

  const light = new THREE.PointLight(0xffffff, 2);
  camera.add(light);
  scene.add(camera);

  const loader = new GLTFLoader().setPath(filePath);
  loader.load(fileName, (gltf) => {
    scene.add(gltf.scene);
    animate();
  });

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight - heightOffset);
    camera.aspect = window.innerWidth / (window.innerHeight - heightOffset);
    camera.updateProjectionMatrix();
  });

  const animate = () => {
    requestAnimationFrame(animate);
    controls.autoRotate = true;
    controls.update();
    renderer.render(scene, camera);
  };
};
