import React, { useRef, useEffect } from 'react';

interface LeaningTowerDemoProps {
  width?: string;
  height?: string;
  className?: string;
}

const LeaningTowerDemo: React.FC<LeaningTowerDemoProps> = ({
  width = "100%",
  height = "400px",
  className = ""
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Add any initialization logic if needed
  }, []);

  const demoContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three.js - Leaning Tower of Pisa Experiment</title>
    <style>
        body { margin: 0; overflow: hidden; background-color: #add8e6; }
        canvas { display: block; }
        #info {
            position: absolute;
            top: 10px;
            width: 100%;
            text-align: center;
            z-index: 100;
            display:block;
            color: #333;
            font-family: Arial, sans-serif;
        }
        #resetButton {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border: 2px solid #555;
            background-color: #f0f0f0;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div id="info">
        <button id="resetButton">Reset & Drop Balls</button>
    </div>

    <script type="importmap">
    {
        "imports": {
            "three": "https://unpkg.com/three@0.132.2/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.132.2/examples/jsm/"
        }
    }
    </script>
    <script type="module">
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

        let scene, camera, renderer, controls;
        let towerGroup, ball1, ball2;
        
        const TOWER_HEIGHT = 20;
        const TOWER_BASE_RADIUS = 4;
        const TOWER_LEAN_ANGLE = -5.5 * (Math.PI / 180); 
        const GROUND_Y = -TOWER_HEIGHT / 2; 

        const GRAVITY = 19.6; 

        let ballsFalling = false;
        let fallStartTime;
        
        const clock = new THREE.Clock();

        function init() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xadd8e6);
            scene.fog = new THREE.Fog(0xadd8e6, 60, 200);

            camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(20, 5, 30);
            
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.body.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
            directionalLight.position.set(30, 40, 25);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            directionalLight.shadow.camera.near = 1;
            directionalLight.shadow.camera.far = 100;
            directionalLight.shadow.camera.left = -30;
            directionalLight.shadow.camera.right = 30;
            directionalLight.shadow.camera.top = 30;
            directionalLight.shadow.camera.bottom = -30;
            scene.add(directionalLight);

            const groundGeometry = new THREE.PlaneGeometry(100, 100);
            const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x8BC34A, roughness: 0.95 });
            const groundPlane = new THREE.Mesh(groundGeometry, groundMaterial);
            groundPlane.rotation.x = -Math.PI / 2;
            groundPlane.position.y = GROUND_Y; 
            groundPlane.receiveShadow = true;
            scene.add(groundPlane);

            towerGroup = createLeaningTower();
            scene.add(towerGroup);
            createBalls();
            
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.target.set(0, 0, 0); 
            
            document.getElementById('resetButton').addEventListener('click', startDrop);
            window.addEventListener('resize', onWindowResize, false);
            
            startDrop();
            animate();
        }

        function createLeaningTower() {
            const group = new THREE.Group();
            const segments = 8;
            const segmentHeight = TOWER_HEIGHT / segments;
            const towerMaterial = new THREE.MeshStandardMaterial({
                color: 0xE0D6B5,
                roughness: 0.85
            });

            let topCylinderRadius = 0;
            for (let i = 0; i < segments; i++) {
                const yPos = -TOWER_HEIGHT / 2 + segmentHeight / 2 + i * segmentHeight;
                topCylinderRadius = TOWER_BASE_RADIUS * (1 - 0.1 * (i / segments));
                const bottomCylinderRadius = TOWER_BASE_RADIUS * (1 - 0.1 * (Math.max(0, i - 1) / segments));
                const mesh = new THREE.Mesh( new THREE.CylinderGeometry(topCylinderRadius, bottomCylinderRadius, segmentHeight, 32), towerMaterial );
                mesh.position.y = yPos;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                group.add(mesh);
            }
            const platformHeight = 0.3;
            const platformMesh = new THREE.Mesh( new THREE.CylinderGeometry(topCylinderRadius * 1.05, topCylinderRadius, platformHeight, 32), towerMaterial );
            platformMesh.position.y = TOWER_HEIGHT / 2 + platformHeight / 2;
            platformMesh.castShadow = true;
            platformMesh.receiveShadow = true;
            group.add(platformMesh);

            group.rotation.z = TOWER_LEAN_ANGLE;
            
            return group;
        }

        function createBalls() {
            const ballMaterial = new THREE.MeshStandardMaterial({
                color: 0x4B4B4B, 
                metalness: 0.9,
                roughness: 0.25
            });

            ball1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), ballMaterial);
            ball1.castShadow = true;
            scene.add(ball1);

            ball2 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), ballMaterial);
            ball2.castShadow = true;
            scene.add(ball2);
        }

        function resetBallPositions() {
            const platformHeight = 0.3;
            const topYUnleaned = TOWER_HEIGHT / 2 + platformHeight;
            const topCenterX = Math.sin(TOWER_LEAN_ANGLE) * topYUnleaned;
            const topCenterY = Math.cos(TOWER_LEAN_ANGLE) * topYUnleaned;
            const dropZOffset = TOWER_BASE_RADIUS + 1.0; 
            const startX = topCenterX;
            const startY = topCenterY;
            
            if (ball1) {
                ball1.position.set(startX, startY, dropZOffset);
                ball1.userData.startY = startY; 
                ball1.userData.endY = GROUND_Y + 0.5;
            }
            if (ball2) {
                ball2.position.set(startX, startY, dropZOffset + 1.2); 
                ball2.userData.startY = startY;
                ball2.userData.endY = GROUND_Y + 0.3; 
            }
        }

        function startDrop() {
            resetBallPositions();
            ballsFalling = true;
            fallStartTime = clock.getElapsedTime();
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);

            if (ballsFalling) {
                const timeSinceDrop = clock.getElapsedTime() - fallStartTime;
                
                const distanceFallen = 0.5 * GRAVITY * timeSinceDrop * timeSinceDrop;

                let newY1 = ball1.userData.startY - distanceFallen;
                let newY2 = ball2.userData.startY - distanceFallen;

                if (newY1 <= ball1.userData.endY) {
                    newY1 = ball1.userData.endY;
                    newY2 = ball2.userData.endY;
                    ballsFalling = false;
                }
                
                ball1.position.y = newY1;
                ball2.position.y = newY2;
            }

            controls.update();
            renderer.render(scene, camera);
        }

        init();
    </script>
</body>
</html>
  `;

  return (
    <div className={`demo-container ${className}`} style={{ width, height }}>
      <iframe
        ref={iframeRef}
        srcDoc={demoContent}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px'
        }}
        title="Leaning Tower Physics Demo"
      />
    </div>
  );
};

export default LeaningTowerDemo; 