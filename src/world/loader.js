import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

function loadHome(scene) {
    const loader = new FBXLoader();
    loader.load(
        '/assets/models/floorplan_1.fbx',
        function (model) {
            model.rotation.x -= THREE.MathUtils.degToRad(90);
            model.position.y += 60;
            scene.add(model);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
}

export { loadHome };
