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
        sunMaxHeight: 300,
        sunMaxWidth: 400,
    };
    const updateSunlight = function () {
        const angle = sunData.sunPosition * (Math.PI / 180);
        directionalLight.position.x = sunData.sunMaxWidth * Math.cos(angle);
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

function createElementManipulationMenu(gui, lights) {
    const manipulator = {
        lightsVisible: true,
    };

    const updateManipulator = function () {
        for (const light of lights) {
            light.visible = manipulator.lightsVisible;
        }
    };

    const manipulations = gui.addFolder('manipulations');
    manipulations.add(manipulator, 'lightsVisible', true);
    manipulations.open();

    return updateManipulator;
}

export { createCameraMenu, createSunMenu, createElementManipulationMenu };
