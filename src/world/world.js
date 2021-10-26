import * as THREE from 'three';

function createScene() {
    const scene = new THREE.Scene();
    return scene;
}

function createAmbientLight() {
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    return ambientLight;
}

function createFloor() {
    const groundTexture = new THREE.TextureLoader().load('/assets/textures/floor.png');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(10000 / 100, 10000 / 50);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    const groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });
    const geom = new THREE.PlaneBufferGeometry(10000, 10000);
    const mesh = new THREE.Mesh(geom, groundMaterial);

    mesh.position.y = 0;
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    return mesh;
}

function createOrthoCamera() {
    let aspectRatio = window.innerWidth / window.innerHeight;
    let cameraWidth = 150;
    let cameraHeight = cameraWidth / aspectRatio;

    let camera = new THREE.OrthographicCamera(
        cameraWidth / -2,
        cameraWidth / 2,
        cameraHeight / 2,
        cameraHeight / -2,
        0,
        10000
    );
    camera.position.set(10, 0, 0);
    camera.lookAt(0, 10, 0);
    return camera;
}

function createPerspectiveCamera() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 10000);

    camera.position.set(10, 2, 0);
    camera.lookAt(0, 3, 0);
    return camera;
}

function createRenderer(scene, camera) {
    let renderer = new THREE.WebGL1Renderer({ antialias: true });
    // Configure renderer clear color
    //renderer.setClearColor(0x7a7a7a);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Physically correct lighting
    renderer.physicallyCorrectLights = true;

    //Start the rendering of the scene
    renderer.render(scene, camera);
    return renderer;
}

function createDirectionalLight() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    //directionalLight.shadow.mapSize.width = 512;
    //directionalLight.shadow.mapSize.height = 512;
    //directionalLight.shadow.camera.near = 0.5;
    //directionalLight.shadow.camera.far = 100;
    return directionalLight;
}

function createFlashlightSpot(camera) {
    const flashlight = new THREE.SpotLight(0xffffff, 0.8, 250, 10);
    camera.add(flashlight);
    //camera.add(flashlight.target);
    flashlight.target = camera;
    return flashlight;
}

function createPointLight(camera) {
    const pointLight = new THREE.PointLight(0xffffff, 1, 1000, 0.2);
    camera.add(pointLight);
    return pointLight;
}
export {
    createFloor,
    createOrthoCamera,
    createPerspectiveCamera,
    createRenderer,
    createAmbientLight,
    createDirectionalLight,
    createPointLight,
    createFlashlightSpot,
    createScene,
};
