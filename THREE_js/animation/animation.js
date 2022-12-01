import * as THREE from '../three.module.js'; // three.module.js 파일을 모듈 버전으로 불러옴
import { OrbitControls } from '../OrbitControls.js';
import { GLTFLoader } from "../GLTFLoader.js";

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        this._controls = new OrbitControls(this._camera, this._divContainer);
    }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            5000
        );

        camera.position.set(0, 100, 500);
        this._camera = camera;
    }

    _addPointLight(x, y, z, helperColor) {
        const color = 0xffffff;
        const intensity = 1.5;

        const pointLight = new THREE.PointLight(color, intensity, 2000);
        pointLight.position.set(x, y, z);

        this._scene.add(pointLight);

        const pointLightHelper = new THREE.PointLightHelper(pointLight, 10, helperColor);
        this._scene.add(pointLightHelper);
    }

    _setupLight() {
        const ambientLight = new THREE.AmbientLight(0xffffff, .5);
        this._scene.add(ambientLight);

        this._addPointLight(500, 150, 500, 0xff0000);
        this._addPointLight(-500, 150, 500, 0xffff00);
        this._addPointLight(-500, 150, -500, 0x00ff00);
        this._addPointLight(500, 150, -500, 0x0000ff);

        const shadowLight = new THREE.DirectionalLight(0xffffff, 0.2);
        shadowLight.position.set(200, 500, 200);
        shadowLight.target.position.set(0, 0, 0);
        const directionalLightHelper = new THREE.DirectionalLightHelper(shadowLight, 10);
        this._scene.add(directionalLightHelper);

        this._scene.add(shadowLight);
        this._scene.add(shadowLight.target);

        shadowLight.castShadow = true;
        shadowLight.shadow.mapSize.width = 1024;
        shadowLight.shadow.mapSize.height = 1024;
        shadowLight.shadow.camera.top = shadowLight.shadow.camera.right = 700;
        shadowLight.shadow.camera.bottom = shadowLight.shadow.camera.left = -700;
        shadowLight.shadow.camera.near = 100;
        shadowLight.shadow.camera.far = 900;
        shadowLight.shadow.radius = 5;
        const shadowCameraHelper = new THREE.CameraHelper(shadowLight.shadow.camera);
        this._scene.add(shadowCameraHelper);
    }

    changeAnimation(animationName) {
        const previousAnimationAtion = this._currentAnimationAction;
        this._currentAnimationAction = this._animationsMap[animationName];

        if(previousAnimationAtion !== this._currentAnimationAction) {
            previousAnimationAtion.fadeOut(0.5);
            this._currentAnimationAction.reset().fadeIn(0.5).play();
        }
    }

    _setupAnimations(gltf) {
        const Timmy = gltf.scene;
        const mixer = new THREE.AnimationMixer(Timmy);
        const gltfAnimations = gltf.animations;
        const domControls = document.querySelector("#controls");
        const animationsMap = {};

        gltfAnimations.forEach(animationClip => {
            const name = animationClip.name;
            console.log(name);

            const domButton = document.createElement("div");
            domButton.classList.add("button");
            domButton.innerText = name;
            domControls.appendChild(domButton);

            domButton.addEventListener("click",() => {
                const animationName = domButton.innerHTML;
                this.changeAnimation(animationName);
            });

            const animationAction = mixer.clipAction(animationClip);
            animationsMap[name] = animationAction;
        });

        this._mixer = mixer;
        this._animationsMap = animationsMap;
        this._currentAnimationAction = this._animationsMap["Idle"];
        this._currentAnimationAction.play();
    }

    _setupModel() {
        const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
        const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x878787 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI/2;
        this._scene.add(plane);
        plane.receiveShadow = true;

        new GLTFLoader().load("data/Timmy.glb", (gltf) => {
            const Timmy = gltf.scene;
            this._scene.add(Timmy);

            Timmy.traverse(child => {
                if(child instanceof THREE.Mesh) {
                    child.castShadow = true;
                }
            });

            const box = (new THREE.Box3).setFromObject(Timmy);
            Timmy.position.y = (box.max.y - box.min.y) / 2;

            const axisHelper = new THREE.AxesHelper(1000);
            this._scene.add(axisHelper);

            const boxHelper = new THREE.BoxHelper(Timmy);
            this._scene.add(boxHelper);
            this._boxHelper = boxHelper;
            this._model = Timmy;
        });
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.001;

        this._controls.update();

        if (this._boxHelper) {
            this._boxHelper.update();
        } // #2 6:35
    }
}

window.onload = function() {
    new App();
}