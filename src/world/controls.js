import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function createOrbitControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    return controls;
}

export { createOrbitControls };
