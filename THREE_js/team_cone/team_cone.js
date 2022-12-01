import * as THREE from '../THREE_js/three.module.js'; // three.module.js 파일을 모듈 버전으로 불러옴
import { OrbitControls } from "../THREE_js/OrbitControls.js";

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        //배경 색깔
        //scene.background = new THREE.Color("lightgray");
        //
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
        camera.position.z = 7;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;  //광원의 색상
        const intensity = 0.8;  //광원의 세기
        const light = new THREE.HemisphereLight(color, intensity);  //색상과 세기로 광원 생성
        light.position.set(-1, 2, 4); //광원의 위치
        this._scene.add(light);
        this._light = light;
    }

    _setupModel() {
        /*
        const geometry = new THREE.ConeGeometry( 1, 2, 4 );
        const material = new THREE.MeshPhongMaterial({ color: "silver" });
        const cone = new THREE.Mesh( geometry, material );
        cone.position.y = 1;
        this._scene.add(cone);
        this._cone = cone;
        
        
        const geometry_ = new THREE.ConeGeometry( 1, 2, 4 );
        const material_ = new THREE.MeshPhongMaterial({ color: "silver" });
        const cone01 = new THREE.Mesh( geometry_, material_ );
        cone01.position.y = -1;
        this._scene.add(cone01);
        this._cone01 = cone01;
        */

        const geometry = new THREE.CylinderGeometry( 0, 1, 2, 4 );
        const material = new THREE.MeshPhysicalMaterial({
            color: "rgb(215, 215, 215)",
            clearcoat: 0.05,
        });
        const cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.y = 1.1;
        this._scene.add( cylinder );
        this._cylinder = cylinder;

        const geometry_ = new THREE.CylinderGeometry( 1, 0, 2, 4 );
        const material_ = new THREE.MeshPhysicalMaterial({
            color: "rgb(215, 215, 215)",
            clearcoat: 0.05,
        });
        const cylinder_ = new THREE.Mesh( geometry_, material_ );
        cylinder_.position.y = -1.1;
        this._scene.add( cylinder_ );
        this._cylinder_ = cylinder_;
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
        //this._cube.rotation.x = time;
        
        //this._cone.rotation.y = time/2;
        //this._cone01.rotation.y = time/2;

        this._cylinder.rotation.y = time/8; 
        this._cylinder_.rotation.y = time/8; 
    }
}

window.onload = function() {
    new App();
}