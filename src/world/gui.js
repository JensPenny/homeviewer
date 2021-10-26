import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

function createCameraMenu(gui, camera, itemName) {
    const cameraMenu = gui.addFolder(itemName);
    //todo: can be used to jump to floors
    cameraMenu.add(camera.position, 'y', 0, 10);
    cameraMenu.open();
}

function createSunMenu(gui, directionalLight) {
    const sunMenu = gui.addFolder('sunlight');
    sunMenu.add(directionalLight.position, 'x', -50, 50, 0.01);
    sunMenu.add(directionalLight.position, 'y', -50, 50, 0.01);
    sunMenu.add(directionalLight.position, 'z', -50, 50, 0.01);
    sunMenu.open();
}

export { createCameraMenu, createSunMenu };
