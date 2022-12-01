
import * as THREE from '../THREE_js/three.module.js'; // three.module.js 파일을 모듈 버전으로 불러옴
import { OrbitControls } from "../THREE_js/OrbitControls.js";
import { RectAreaLightUniformsLib } from "../THREE_js/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "../THREE_js/RectAreaLightHelper.js";

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
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
        new OrbitControls(this._camera, this._divContainer);
    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        //camera.position.z = 2;
        camera.position.set(7,7,0);
        camera.lookAt(0,0,0);

        this._camera = camera;
    }

    _setupLight() { //형광등이나 창문에서 들어오는 광원...?
        RectAreaLightUniformsLib.init();

        const light = new THREE.RectAreaLight(0xffffff, 10, 3, 0.5); //(색상, 세기, 세로길이, 가로길이)
        light.position.set(0, 5, 0); //광원의 위치
        light.rotation.x = THREE.MathUtils.degToRad(-90); //광원이 빛을 비추는 방향. 각도로 지정

        //광원을 시각화 하는 helper 코드 추가
        const helper = new RectAreaLightHelper(light);
        light.add(helper);

        this._scene.add(light);
        this._light = light;
    }

    _setupModel() {
        const groundGeometry = new THREE.PlaneGeometry(10, 10);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: "#2c3e50",
            roughness: 0.5,
            metalness: 0.5,
            side: THREE.DoubleSide,
        });

        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = THREE.MathUtils.degToRad(-90);
        this._scene.add(ground);


        const bigSphereGeometry = new THREE.SphereGeometry(1.5, 64, 64, 0, Math.PI);
        const bigSphereMaterial = new THREE.MeshStandardMaterial({
            color: "#ffffff",
            roughness: 0.1,
            metalness: 0.2,
        });
        
        const bigSphere = new THREE.Mesh(bigSphereGeometry, bigSphereMaterial);
        bigSphere.rotation.x = THREE.MathUtils.degToRad(-90);
        this._scene.add(bigSphere);


        const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: "#9b59b6",
            roughness: 0.5,
            metalness: 0.9,
        });

        for(let i=0; i<8; i++) {
            const torusPivot = new THREE.Object3D();
            const torus = new THREE.Mesh(torusGeometry, torusMaterial);
            torusPivot.rotation.y = THREE.MathUtils.degToRad(45*i);
            torus.position.set(3, 0.5, 0);
            torusPivot.add(torus);
            this._scene.add(torusPivot);
        }


        const smallSphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const smallSphereMaterial = new THREE.MeshStandardMaterial({
            color: "#e74c3c",
            roughness: 0.2,
            metalness: 0.5
        });
        const smallSpherePivot = new THREE.Object3D();
        const smallSphere = new THREE.Mesh(smallSphereGeometry, smallSphereMaterial);
        smallSpherePivot.add(smallSphere);
        smallSpherePivot.name = "smallSpherePivot"; //이름을 부여해두면 scene객체를 통해 언제든 조회할 수 있다.
        smallSphere.position.set(3, 0.5, 0);
        this._scene.add(smallSpherePivot);

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
        
        const smallSpherePivot = this._scene.getObjectByName("smallSpherePivot");
        if (smallSpherePivot) {
            smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time*50);

            //광원이 smallSphere를 추척하게하는 코드
            if (this._light.target) {
                const smallSphere = smallSpherePivot.children[0];
                smallSphere.getWorldPosition(this._light.target.position);

                if (this._lightHelper) this._lightHelper.update();
            }
        }
    }
}

window.onload = function() {
    new App();
}