import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

function createCameraMenu(gui, camera, itemName) {
    const cameraMenu = gui.addFolder(itemName);
    //todo: can be used to jump to floors
    cameraMenu.add(camera.position, 'y', 0, 10);
    cameraMenu.open();
}

function createSunMenu(gui, sunPosition) {
    const sunMenu = gui.addFolder('sunlight');
    sunMenu.add(sunPosition.sun.position, 'x', -50, 50, 0.01);
    sunMenu.add(sunPosition.sun.position, 'y', -50, 50, 0.01);
    sunMenu.add(sunPosition.sun.position, 'z', -50, 50, 0.01);
    sunMenu.open();
}

export { createCameraMenu, createSunMenu };
