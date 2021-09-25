import * as THREE from 'three';
import * as WORLD from './world/world';
import * as CONTROLS from './world/controls';
import { loadHome } from './world/loader';

export function startApp() {
    const clock = new THREE.Clock();

    const scene = WORLD.createScene();
    const ambientLight = WORLD.createAmbientLight();
    scene.add(ambientLight);

    const directionalLight = WORLD.createDirectionalLight();
    scene.add(directionalLight);

    const camera = WORLD.createCamera();
    const renderer = WORLD.createRenderer(scene, camera);

    const canvas = renderer.domElement;
    document.body.appendChild(canvas);

    const floor = WORLD.createFloor();
    scene.add(floor);

    loadHome(scene);

    const controls = CONTROLS.createOrbitControls(camera, canvas);
    //const fpscontrols = CONTROLS.createFirstPersonControls(camera, canvas);

    //Helpers (if needed)
    const axesHelper = new THREE.AxesHelper(2000);
    scene.add(axesHelper);

    // Render Loop
    var render = function () {
        let delta = clock.getDelta();
        //fpsconstrols.update(delta);
        // Render the scene
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();
}
