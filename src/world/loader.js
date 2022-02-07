import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { FlatShading, MeshLambertMaterial, MeshPhongMaterial } from 'three';
import { MeshBasicMaterial } from 'three';

function loadFbxHome(scene) {
    const loader = new FBXLoader();
    loader.load('/assets/models/floorplan.fbx', onLoad(scene), undefined, onError());
}

function load3mfHome(scene) {
    const loader = new ThreeMFLoader();
    loader.load('/assets/models/floorplan.3mf', onLoad(scene), undefined, onError());
}

function loadObjHome(scene) {
    const loader = new OBJLoader();
    loader.load('/assets/models/floorplan.obj', onLoad(scene), undefined, onError());
}

function loadStlHome(scene) {
    const loader = new STLLoader();
    loader.load(
        '/assets/models/floorplan.stl',
        function (geom) {
            const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            const mesh = new THREE.Mesh(geom, material);

            mesh.rotation.x -= THREE.MathUtils.degToRad(90);
            mesh.position.y += 60;
            scene.add(mesh);
        },
        undefined,
        onError()
    );
}

function loadGlbHome(scene, name) {
    const loader = new GLTFLoader();

    loader.load(
        '/assets/models/' + name,
        function (gltf) {
            gltf.scene.traverse(function (element) {
                console.log('traversing ' + element.name + ' - ' + element.type);
                if (element instanceof THREE.Mesh) {
                    const mesh = element;
                    mesh.receiveShadow = true;
                    mesh.castShadow = true;

                    //mesh.material = new MeshPhongMaterial({ color: '#888888' });
                }

                if (element instanceof THREE.Light) {
                    const light = element;
                    light.castShadow = false;
                }
            });

            scene.add(gltf.scene);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        onError()
    );
}

function onLoad(scene) {
    return function (model) {
        model.rotation.x -= THREE.MathUtils.degToRad(90);
        model.position.y += 60;
        scene.add(model);
    };
}

function onError() {
    return function (error) {
        console.error(error);
    };
}

export { loadFbxHome, load3mfHome, loadObjHome, loadStlHome, loadGlbHome };
