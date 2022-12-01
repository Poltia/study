

import * as THREE from '../three.module.js'; // three.module.js 파일을 모듈 버전으로 불러옴
import { OrbitControls } from '../OrbitControls.js'; // 마우스로 화면 컨트롤 가능
import { VertexNormalsHelper } from '../VertexNormalsHelper.js'
import { MathUtils } from 'three';

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
        this._sceneArr = [];

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
        camera.position.z = 0.1;
        this._camera = camera;
        this._scene.add(camera);
    }

    _setupLight() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this._scene.add(ambientLight);

        const color = 0xff0000;  //광원의 색상
        const intensity = 1;  //광원의 세기
        const light = new THREE.DirectionalLight(color, intensity);  //색상과 세기로 광원 생성
        light.position.set(-1, 2, 4); //광원의 위치
        //this._scene.add(light);
        this._camera.add(light);
    }

    _setupModel() {
        const vertices1 = [];
        for (let i = 0; i < 1500; i++) {
            const x = THREE.MathUtils.randFloatSpread(10);  //randFloatSpread(5) => -5~5까지의 난수
            const y = THREE.MathUtils.randFloatSpread(10);
            const z = THREE.MathUtils.randFloatSpread(10);
            
            vertices1.push(x, y, z);
        }
        
        const geometry1 = new THREE.BufferGeometry();
        geometry1.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices1, 3)
        );
        
        const sprite = new THREE.TextureLoader().load(
            "../imgs/disc.png" );
        
        const material1 = new THREE.PointsMaterial({
            map: sprite,
            alphaTest: 0.5, //alphaTest 값보다 클때만 픽셀이 렌더링된다.
            color: "white",
            size: 0.08,
            sizeAttenuation: true // true: 카메라 거리에 따라 크기가 달라짐
        });
        
        const points1 = new THREE.Points(geometry1, material1);
        this._scene.add(points1);



        const vertices2 = [];
        for (let i = 0; i < 1500; i++) {
            const x = THREE.MathUtils.randFloatSpread(10);  //randFloatSpread(5) => -5~5까지의 난수
            const y = THREE.MathUtils.randFloatSpread(10);
            const z = THREE.MathUtils.randFloatSpread(10);
            
            vertices2.push(x, y, z);
        }
        
        const geometry2 = new THREE.BufferGeometry();
        geometry2.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices2, 3)
        );
        
        const material2 = new THREE.PointsMaterial({
            map: sprite,
            alphaTest: 0.5, //alphaTest 값보다 클때만 픽셀이 렌더링된다.
            color: "pink",
            size: 0.08,
            sizeAttenuation: true // true: 카메라 거리에 따라 크기가 달라짐
        });
        
        const points2 = new THREE.Points(geometry2, material2);
        this._scene.add(points2);


        const vertices3 = [];
        for (let i = 0; i < 1500; i++) {
            const x = THREE.MathUtils.randFloatSpread(10);  //randFloatSpread(5) => -5~5까지의 난수
            const y = THREE.MathUtils.randFloatSpread(10);
            const z = THREE.MathUtils.randFloatSpread(10);
            
            vertices3.push(x, y, z);
        }
        
        const geometry3 = new THREE.BufferGeometry();
        geometry3.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices3, 3)
        );
        
        const material3 = new THREE.PointsMaterial({
            map: sprite,
            alphaTest: 0.5, //alphaTest 값보다 클때만 픽셀이 렌더링된다.
            color: "skyblue",
            size: 0.08,
            sizeAttenuation: true // true: 카메라 거리에 따라 크기가 달라짐
        });
        
        const points3 = new THREE.Points(geometry3, material3);
        this._scene.add(points3);


        const vertices4 = [];
        for (let i = 0; i < 1500; i++) {
            const x = THREE.MathUtils.randFloatSpread(10);  //randFloatSpread(5) => -5~5까지의 난수
            const y = THREE.MathUtils.randFloatSpread(10);
            const z = THREE.MathUtils.randFloatSpread(10);
            
            vertices4.push(x, y, z);
        }
        
        const geometry4 = new THREE.BufferGeometry();
        geometry4.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices4, 3)
        );
        
        const material4 = new THREE.PointsMaterial({
            map: sprite,
            alphaTest: 0.5, //alphaTest 값보다 클때만 픽셀이 렌더링된다.
            color: "lightyellow",
            size: 0.08,
            sizeAttenuation: true // true: 카메라 거리에 따라 크기가 달라짐
        });
        
        const points4 = new THREE.Points(geometry4, material4);
        this._scene.add(points4);


        //this._sceneArr.push(points);
        //colorPick = 0

        // setInterval(() => {
        //     colorPick = colors[Math.floor(Math.random()*colors.length)];
        //     //colorPick+=10;
        //     this._sceneArr[0].material.color = new THREE.Color(colorPick);
        //     // this._sceneArr[0].material.color.g = colorPick;
        //     // this._sceneArr[0].material.color.b = colorPick;
        //     console.log(this._sceneArr[0].material.color)
        // }, 1000);
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

        this._camera.rotation.y = time/128;
    }
}

window.onload = function() {
    new App();
}