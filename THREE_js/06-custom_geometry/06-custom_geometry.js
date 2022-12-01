
import * as THREE from '../THREE_js/three.module.js'; // three.module.js 파일을 모듈 버전으로 불러옴
import { VertexNormalsHelper } from "../THREE_js/VertexNormalsHelper.js" //법선벡터의 시각화를 위해서 추가
import { OrbitControls } from "../THREE_js/OrbitControls.js" //마우스로 돌릴수 있게 하기위해서 추가

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
        camera.position.z = 2;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;  //광원의 색상
        const intensity = 1;  //광원의 세기
        const light = new THREE.DirectionalLight(color, intensity);  //색상과 세기로 광원 생성
        light.position.set(-1, 2, 4); //광원의 위치
        this._scene.add(light);
    }

    _setupModel() {
        const rawPositions = [
            -1,-1, 0,
             1,-1, 0,
            -1, 1, 0,
             1, 1, 0
        ];

        const rawNormals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        const rawColors = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
            1, 1, 0
        ];

        const rawUVs = [
            0, 0,
            1, 0,
            0, 1,
            1, 1
        ];

        const positions = new Float32Array(rawPositions);
        const normals = new Float32Array(rawNormals);
        const colors = new Float32Array(rawColors);
        const uvs = new Float32Array(rawUVs);

        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

        geometry.setIndex([
            0, 1, 2,
            2, 1, 3
        ]);

        //geometry.computeVertexNormals(); //알아서 법선벡터를 계산해줌

        const textureLoader = new THREE.TextureLoader();
        const map = textureLoader.load("../THREE_js/uv_grid_opengl.jpg");

        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            //vertexColors: true,
            map: map
        });

        const box = new THREE.Mesh(geometry, material);
        this._scene.add(box);

        const helper = new VertexNormalsHelper(box, 0.1, 0xffff00);
        this._scene.add(helper);

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
    }
}

window.onload = function() {
    new App();
}