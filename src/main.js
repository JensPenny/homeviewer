import * as THREE from 'three';
import * as WORLD from './world/world';
import * as CONTROLS from './world/controls';
import * as HOME from './world/loader';
import * as MENU from './world/gui';

import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

export function startApp() {
    const clock = new THREE.Clock();

    const scene = WORLD.createScene();
    const ambientLight = WORLD.createAmbientLight();
    scene.add(ambientLight);

    const directionalLight = WORLD.createSunWithLight();
    scene.add(directionalLight);

    //const camera = WORLD.createOrthoCamera();
    const camera = WORLD.createPerspectiveCamera();
    //const spotLight = WORLD.createFlashlightSpot(camera);

    //Rotation for the light

    /*     const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    camera.addEventListener('change', function () {
        console.log('camera changed');
        euler.setFromQuaternion(camera.quaternion);
        spotLight.quaternion.setFromEuler(euler);
    });
 */ //const spotLight = WORLD.createFlashlightSpot(camera);
    //camera.add(spotLight);
    scene.add(camera);

    const renderer = WORLD.createRenderer(scene, camera);

    const canvas = renderer.domElement;
    document.body.appendChild(canvas);

    const floor = WORLD.createFloor();
    scene.add(floor);

    const stats = Stats();
    document.body.appendChild(stats.dom);

    //HOME.loadFbxHome(scene); //Wonky, maybe due to missing materials?
    //HOME.loadObjHome(scene); //Works pretty well - lighting seems off
    //HOME.load3mfHome(scene); //Works the same as obj - looks a bit better with a phong material
    //HOME.loadStlHome(scene); //Works - but loads without the material
    //HOME.loadGlbHome(scene, 'floorplan.glb');
    const manipulationable = HOME.loadGlbHome(scene, 'home_twofloors.glb');

    const gui = new GUI();
    MENU.createCameraMenu(gui, camera, 'reset cam');
    MENU.createSunMenu(gui, directionalLight);
    MENU.createElementManipulationMenu(gui, manipulationable.lights);

    const controls = CONTROLS.createOrbitControls(camera, canvas);
    //const controls = CONTROLS.createPointerLockControls(camera, canvas);
    //const fpscontrols = CONTROLS.createFirstPersonControls(camera, canvas);
    //fpscontrols.movementSpeed = 2;

    //Helpers (if needed)
    const axesHelper = new THREE.AxesHelper(2000);
    scene.add(axesHelper);

    // Render Loop
    var render = function () {
        requestAnimationFrame(render);
        let delta = clock.getDelta();
        //fpscontrols.update(delta);
        //spotLight.target.updateMatrixWorld();
        // Render the scene
        renderer.render(scene, camera);
        stats.update();
    };

    //Listeners on window events
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }

    render();
}
