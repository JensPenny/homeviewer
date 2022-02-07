import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

function createOrbitControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    return controls;
}

function createFirstPersonControls(camera, canvas) {
    const controls = new FirstPersonControls(camera, canvas);
    controls.lookSpeed = 0.1;
    controls.movementSpeed = 0.2;
    //controls.noFly = true;
    controls.lookVertical = true;
    controls.constrainVertical = true;
    controls.verticalMin = 0.5;
    controls.verticalMax = 2.0;
    //controls.lon = -150;
    //controls.lat = 120;
    return controls;
}

function createPointerLockControls(camera, canvas) {
    const controls = new PointerLockControls(camera, canvas);

    return controls;
}

export { createOrbitControls, createFirstPersonControls, createPointerLockControls };
