import * as THREE from 'three';
import * as WORLD from './world/world';
import * as CONTROLS from './world/controls';

export function startApp() {
    const scene = WORLD.createScene();
    const ambientLight = WORLD.createAmbientLight();
    scene.add(ambientLight);

    const directionalLight = WORLD.createDirectionalLight();
    scene.add(directionalLight);

    const camera = WORLD.createCamera();
    const renderer = WORLD.createRenderer(scene, camera);

    const canvas = renderer.domElement;
    document.body.appendChild(canvas);

    // Create a Cube Mesh with basic material
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: '#813f4e' });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    const floor = WORLD.createFloor();
    scene.add(floor);

    const controls = CONTROLS.createOrbitControls(camera, canvas);

    //Helpers (if needed)
    const axesHelper = new THREE.AxesHelper(2000);
    scene.add(axesHelper);

    // Render Loop
    var render = function () {
        requestAnimationFrame(render);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Render the scene
        renderer.render(scene, camera);
    };

    render();
}
