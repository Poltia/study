import * as THREE from '/three.module.js'; // three.module.js 파일을 모듈 버전으로 불러옴
import { OrbitControls } from '/OrbitControls.js';

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
        const geometry = new THREE.BoxGeometry(1, 1, 1);  //box크기 설정
        const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 }); //회색 지정
        const cube = new THREE.Mesh(geometry, fillMaterial);
        
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 }); //라인 색상
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMaterial);  //라인타입 오브젝트 만듬

        const group = new THREE.Group();  // 큐브와 라인을 group으로 묶음
        group.add(cube);
        group.add(line);

        this._scene.add(group);
        this._cube = group;
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
        /*this._cube.rotation.x = time;  //자동회전하게 하는 코드들
        this._cube.rotation.y = time; */
    }
}

window.onload = function() {
    new App();
}