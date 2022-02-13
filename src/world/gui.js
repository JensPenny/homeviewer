import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

function createCameraMenu(gui, camera, itemName) {
    const cameraMenu = gui.addFolder(itemName);
    //todo: can be used to jump to floors
    cameraMenu.add(camera.position, 'y', 0, 10);
    cameraMenu.open();
}

function createBasicSunMenu(gui, directionalLight) {
    const sunData = {
        sunPosition: 0, //Sun position in degrees (0 - 180)
        sunAngle: 0, //Sun inclination angle (-90 - 90)
        sunMaxHeight: 300,
        sunMaxWidth: 400,
    };
    const updateSunlight = function () {
        const angle = sunData.sunPosition * (Math.PI / 180);
        const inclination = (sunData.sunAngle + 90) * (Math.PI / 180); //add 90deg to the inclination so that we can do math with 0-180 deg

        directionalLight.position.x = sunData.sunMaxWidth * Math.cos(angle);
        directionalLight.position.y = sunData.sunMaxHeight * Math.sin(angle) * Math.sin(inclination);
        directionalLight.position.z = sunData.sunMaxHeight * Math.cos(inclination) * Math.sin(angle);

        console.log(directionalLight.position);
    };
    const sunMenu = gui.addFolder('sunlight');
    sunMenu.add(sunData, 'sunPosition', 0, 180, 1);
    sunMenu.add(sunData, 'sunAngle', -90, 90, 1);
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

export { createCameraMenu, createBasicSunMenu as createSunMenu, createElementManipulationMenu };
