import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

function createOrbitControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    return controls;
}

function createFirstPersonControls(camera, canvas) {
    const controls = new FirstPersonControls(camera, canvas);
    controls.lookSpeed = 0.4;
    controls.movementSpeed = 20;
    //controls.noFly = true;
    controls.lookVertical = true;
    controls.constrainVertical = true;
    controls.verticalMin = 1.0;
    controls.verticalMax = 2.0;
    //controls.lon = -150;
    //controls.lat = 120;
    return controls;
}

export { createOrbitControls, createFirstPersonControls };
