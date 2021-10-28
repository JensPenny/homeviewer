import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

function createCameraMenu(gui, camera, itemName) {
    const cameraMenu = gui.addFolder(itemName);
    //todo: can be used to jump to floors
    cameraMenu.add(camera.position, 'y', 0, 10);
    cameraMenu.open();
}

function createSunMenu(gui, directionalLight) {
    const sunData = {
        sunPosition: 0, //sunposition in degrees (0 - 180)
        sunMaxHeight: 5,
    };
    const updateSunlight = function () {
        const angle = sunData.sunPosition * (Math.PI / 180);
        directionalLight.position.x = sunData.sunMaxHeight * Math.cos(angle);
        directionalLight.position.y = sunData.sunMaxHeight * Math.sin(angle);
    };
    const sunMenu = gui.addFolder('sunlight');
    sunMenu.add(sunData, 'sunPosition', 0, 180, 1);
    //sunMenu.add(directionalLight.position, 'x', -50, 50, 0.01);
    //sunMenu.add(directionalLight.position, 'y', -50, 50, 0.01);
    //sunMenu.add(directionalLight.position, 'z', -50, 50, 0.01);
    sunMenu.open();
    return updateSunlight;
}

export { createCameraMenu, createSunMenu };
