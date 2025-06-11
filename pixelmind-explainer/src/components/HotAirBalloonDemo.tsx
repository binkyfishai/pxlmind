import React, { useRef, useEffect } from 'react';

interface HotAirBalloonDemoProps {
  width?: string;
  height?: string;
  className?: string;
}

const HotAirBalloonDemo: React.FC<HotAirBalloonDemoProps> = ({
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
    <title>Three.js Flying Hot Air Balloon with Clouds</title>
    <style>
        body { margin: 0; overflow: hidden; background-color: #333; }
        canvas { display: block; }
    </style>
</head>
<body>
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

        let scene, camera, renderer, controls, hotAirBalloonGroup;
        let clouds = [];
        const clock = new THREE.Clock();

        const GRID_SIZE = 100;
        const BALLOON_INITIAL_Y = 10;
        let driftDirection = 1;
        const driftSpeed = 0.01;
        const balloonScale = 1.8;

        function init() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x87CEEB);
            scene.fog = new THREE.Fog(0x87CEEB, 50, 200);

            const gridHelper = new THREE.GridHelper(GRID_SIZE, GRID_SIZE, 0x888888, 0xcccccc);
            gridHelper.position.y = -0.01;
            scene.add(gridHelper);

            const groundGeometry = new THREE.PlaneGeometry(GRID_SIZE * 2, GRID_SIZE * 2);
            const groundMaterial = new THREE.MeshStandardMaterial({
                color: 0x90ee90,
                roughness: 0.9,
                metalness: 0.1
            });
            const groundPlane = new THREE.Mesh(groundGeometry, groundMaterial);
            groundPlane.rotation.x = -Math.PI / 2;
            groundPlane.receiveShadow = true;
            scene.add(groundPlane);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(20, BALLOON_INITIAL_Y + 7, 30);
            camera.lookAt(0, BALLOON_INITIAL_Y, 0);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.body.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
            directionalLight.position.set(30, 40, 25);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            directionalLight.shadow.camera.near = 0.5;
            directionalLight.shadow.camera.far = 120;
            directionalLight.shadow.camera.left = -40;
            directionalLight.shadow.camera.right = 40;
            directionalLight.shadow.camera.top = 40;
            directionalLight.shadow.camera.bottom = -40;
            scene.add(directionalLight);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 5;
            controls.maxDistance = 150;
            controls.target.set(0, BALLOON_INITIAL_Y, 0);

            createHotAirBalloonModel();
            createClouds();

            window.addEventListener('resize', onWindowResize, false);
            animate();
        }

        function createHotAirBalloonModel() {
            hotAirBalloonGroup = new THREE.Group();

            const envelopePoints = [];
            const segments = 32;
            envelopePoints.push(new THREE.Vector2(0.01 * balloonScale, -2.5 * balloonScale));
            envelopePoints.push(new THREE.Vector2(1.0 * balloonScale, -2.4 * balloonScale));
            envelopePoints.push(new THREE.Vector2(2.0 * balloonScale, -1.5 * balloonScale));
            envelopePoints.push(new THREE.Vector2(2.8 * balloonScale, 0 * balloonScale));
            envelopePoints.push(new THREE.Vector2(2.2 * balloonScale, 2.0 * balloonScale));
            envelopePoints.push(new THREE.Vector2(1.0 * balloonScale, 3.0 * balloonScale));
            envelopePoints.push(new THREE.Vector2(0.0 * balloonScale, 3.2 * balloonScale));

            const envelopeGeometry = new THREE.LatheGeometry(envelopePoints, segments);

            const minY = -2.5 * balloonScale;
            const maxY = 3.2 * balloonScale;
            const totalEnvelopeHeight = maxY - minY;

            const stripeColors = [
                new THREE.Color(0xFF0000),
                new THREE.Color(0xFF7F00),
                new THREE.Color(0xFFFF00),
                new THREE.Color(0x00FF00),
                new THREE.Color(0x8A2BE2)
            ];
            const numStripes = stripeColors.length;

            const positions = envelopeGeometry.attributes.position;
            const colorsAttribute = new THREE.BufferAttribute(new Float32Array(positions.count * 3), 3);

            for (let i = 0; i < positions.count; i++) {
                const y = positions.getY(i);
                const normalizedY = (y - minY) / totalEnvelopeHeight;
                let stripeIndex = Math.floor(normalizedY * numStripes);
                stripeIndex = Math.max(0, Math.min(stripeIndex, numStripes - 1));
                const color = stripeColors[stripeIndex];
                colorsAttribute.setXYZ(i, color.r, color.g, color.b);
            }
            envelopeGeometry.setAttribute('color', colorsAttribute);

            const envelopeMaterial = new THREE.MeshStandardMaterial({
                vertexColors: true,
                metalness: 0.1,
                roughness: 0.8,
                side: THREE.DoubleSide
            });
            const envelopeMesh = new THREE.Mesh(envelopeGeometry, envelopeMaterial);
            envelopeMesh.castShadow = true;
            envelopeMesh.receiveShadow = true;
            hotAirBalloonGroup.add(envelopeMesh);

            const envelopeBottomY = -2.5 * balloonScale;

            const basketRadius = 0.7 * balloonScale;
            const basketHeight = 0.6 * balloonScale;
            const basketGeometry = new THREE.CylinderGeometry(basketRadius, basketRadius * 0.9, basketHeight, 16);
            const basketMaterial = new THREE.MeshStandardMaterial({
                color: 0xCD853F,
                metalness: 0.1,
                roughness: 0.8
            });
            const basketMesh = new THREE.Mesh(basketGeometry, basketMaterial);
            basketMesh.castShadow = true;
            basketMesh.position.y = envelopeBottomY - basketHeight * 0.5 - (0.5 * balloonScale);
            hotAirBalloonGroup.add(basketMesh);

            const ropeMaterial = new THREE.MeshStandardMaterial({ color: 0x505050, roughness: 0.9 });
            const numRopes = 4;
            const ropeRadius = 0.03 * balloonScale;
            const ropeAttachPointOnEnvelopeY = envelopeBottomY + 0.2 * balloonScale;
            const basketRimY = basketMesh.position.y + basketHeight / 2;

            for (let i = 0; i < numRopes; i++) {
                const angle = (i / numRopes) * Math.PI * 2;
                const ropeAttachX = Math.cos(angle) * basketRadius * 0.9;
                const ropeAttachZ = Math.sin(angle) * basketRadius * 0.9;
                const envelopeAttachX = Math.cos(angle) * (1.0 * balloonScale);
                const envelopeAttachZ = Math.sin(angle) * (1.0 * balloonScale);
                const startPoint = new THREE.Vector3(ropeAttachX, basketRimY, ropeAttachZ);
                const endPoint = new THREE.Vector3(envelopeAttachX, ropeAttachPointOnEnvelopeY, envelopeAttachZ);
                const path = new THREE.LineCurve3(startPoint, endPoint);
                const ropeGeometry = new THREE.TubeGeometry(path, 8, ropeRadius, 8, false);
                const ropeMesh = new THREE.Mesh(ropeGeometry, ropeMaterial);
                ropeMesh.castShadow = true;
                hotAirBalloonGroup.add(ropeMesh);
            }
            
            const burnerGeometry = new THREE.CylinderGeometry(0.3 * balloonScale, 0.2 * balloonScale, 0.4 * balloonScale, 12);
            const burnerMaterial = new THREE.MeshStandardMaterial({
                color: 0xA9A9A9, metalness: 0.8, roughness: 0.3 });
            const burnerMesh = new THREE.Mesh(burnerGeometry, burnerMaterial);
            burnerMesh.position.y = envelopeBottomY + 0.1 * balloonScale;
            burnerMesh.castShadow = true;
            hotAirBalloonGroup.add(burnerMesh);

            hotAirBalloonGroup.position.set(0, BALLOON_INITIAL_Y, 0);
            scene.add(hotAirBalloonGroup);
        }

        function createCloudCluster(x, y, z, scale) {
            const cluster = new THREE.Group();
            const cloudMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.85,
                roughness: 0.95,
            });

            const numPuffs = 6 + Math.floor(Math.random() * 7);
            for (let i = 0; i < numPuffs; i++) {
                const puffSize = (Math.random() * 0.8 + 0.6) * scale;
                const puffGeometry = new THREE.IcosahedronGeometry(puffSize, 1);
                const puffMesh = new THREE.Mesh(puffGeometry, cloudMaterial);
                
                puffMesh.position.set(
                    (Math.random() - 0.5) * scale * 3.0,
                    (Math.random() - 0.5) * scale * 1.5,
                    (Math.random() - 0.5) * scale * 2.0
                );
                cluster.add(puffMesh);
            }
            cluster.position.set(x, y, z);
            scene.add(cluster);
            return cluster;
        }

        function createClouds() {
            const numCloudClusters = 10;
            const cloudBaseScale = 3;

            for (let i = 0; i < numCloudClusters; i++) {
                const x = (Math.random() - 0.5) * GRID_SIZE * 1.8;
                const y = BALLOON_INITIAL_Y + 10 + Math.random() * 25;
                const z = -20 - Math.random() * (GRID_SIZE * 0.8);
                const scale = cloudBaseScale * (Math.random() * 0.5 + 0.75);
                clouds.push(createCloudCluster(x, y, z, scale));
            }
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            const deltaTime = clock.getDelta();

            if (hotAirBalloonGroup) {
                hotAirBalloonGroup.position.y = BALLOON_INITIAL_Y + Math.sin(elapsedTime * 0.6) * 0.6;
                hotAirBalloonGroup.position.x += driftSpeed * driftDirection * (60 * deltaTime);

                if (hotAirBalloonGroup.position.x > GRID_SIZE / 2 - 5) {
                    if(driftDirection === 1) hotAirBalloonGroup.rotation.y += Math.PI;
                    driftDirection = -1;
                } else if (hotAirBalloonGroup.position.x < -GRID_SIZE / 2 + 5) {
                    if(driftDirection === -1) hotAirBalloonGroup.rotation.y += Math.PI;
                    driftDirection = 1;
                }
            }

            clouds.forEach(cloud => {
                cloud.position.x += (0.05 + Math.random()*0.02) * (60 * deltaTime);
                if (cloud.position.x > GRID_SIZE + 30) {
                    cloud.position.x = -GRID_SIZE - 30;
                    cloud.position.y = BALLOON_INITIAL_Y + 10 + Math.random() * 25;
                    cloud.position.z = -20 - Math.random() * (GRID_SIZE * 0.8);
                }
            });

            if (controls) {
                controls.update();
            }

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
        title="Hot Air Balloon Demo"
      />
    </div>
  );
};

export default HotAirBalloonDemo; 