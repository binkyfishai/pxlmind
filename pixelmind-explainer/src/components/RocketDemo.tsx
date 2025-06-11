import React, { useRef, useEffect } from 'react';

interface RocketDemoProps {
  width?: string;
  height?: string;
  className?: string;
}

const RocketDemo: React.FC<RocketDemoProps> = ({
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
    <title>Three.js - SpaceX Rocket Launch</title>
    <style>
        body { margin: 0; overflow: hidden; background-color: #f0f0f0; }
        canvas { display: block; }
    </style>
    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.132.2/build/three.module.js",
                "three/addons/": "https://unpkg.com/three@0.132.2/examples/jsm/"
            }
        }
    </script>
</head>
<body>
    <script type="module">
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

        let scene, camera, renderer, controls;
        let rocketGroup, exhaustGroup, stars;
        const clock = new THREE.Clock();

        const ROCKET_BASE_RADIUS = 1.0;
        const ROCKET_BODY_HEIGHT = 12.0;
        const NOSE_CONE_HEIGHT = 3.0;
        const FIN_HEIGHT = 2.5;
        const FIN_WIDTH = 0.8;
        const FIN_THICKNESS = 0.1;

        const LAUNCH_DELAY = 2.0;
        const INITIAL_ACCELERATION = 0.2;
        const MAX_ACCELERATION = 20.0;
        const MAX_VELOCITY = 80.0;
        const SPACE_TRANSITION_START_ALT = 80;
        const SPACE_TRANSITION_END_ALT = 250;

        let rocketState = {
            launched: false,
            launchTime: 0,
            velocity: 0,
            currentAcceleration: INITIAL_ACCELERATION,
        };

        function init() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x87CEEB);
            scene.fog = new THREE.Fog(0x87CEEB, 50, 300);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
            camera.position.set(35, 15, 45);
            camera.lookAt(0, ROCKET_BODY_HEIGHT / 2, 0);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            document.body.appendChild(renderer.domElement);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.target.set(0, ROCKET_BODY_HEIGHT / 2, 0);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
            directionalLight.position.set(20, 30, 20);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 1024;
            directionalLight.shadow.mapSize.height = 1024;
            directionalLight.shadow.camera.near = 0.5;
            directionalLight.shadow.camera.far = 100;
            directionalLight.shadow.camera.left = -50;
            directionalLight.shadow.camera.right = 50;
            directionalLight.shadow.camera.top = 50;
            directionalLight.shadow.camera.bottom = -50;
            scene.add(directionalLight);

            const gridHelper = new THREE.GridHelper(100, 20, 0x555555, 0x777777);
            scene.add(gridHelper);

            createGround();
            createRocket();
            createExhaust();
            createStarfield();

            window.addEventListener('resize', onWindowResize, false);
            animate();
        }

        function createGround() {
            const groundGeometry = new THREE.PlaneGeometry(100, 100);
            const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.8 });
            const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
            groundMesh.rotation.x = -Math.PI / 2;
            groundMesh.receiveShadow = true;
            scene.add(groundMesh);
        }

        function createRocket() {
            rocketGroup = new THREE.Group();

            const rocketMaterial = new THREE.MeshStandardMaterial({
                color: 0xd8d8d8,
                metalness: 0.7,
                roughness: 0.3
            });
            const darkMetalMaterial = new THREE.MeshStandardMaterial({
                color: 0x333333,
                metalness: 0.8,
                roughness: 0.4
            });

            const bodyGeometry = new THREE.CylinderGeometry(ROCKET_BASE_RADIUS, ROCKET_BASE_RADIUS, ROCKET_BODY_HEIGHT, 32);
            const mainBody = new THREE.Mesh(bodyGeometry, rocketMaterial);
            mainBody.position.y = ROCKET_BODY_HEIGHT / 2;
            mainBody.castShadow = true;
            rocketGroup.add(mainBody);

            const noseGeometry = new THREE.ConeGeometry(ROCKET_BASE_RADIUS, NOSE_CONE_HEIGHT, 32);
            const noseCone = new THREE.Mesh(noseGeometry, rocketMaterial);
            noseCone.position.y = ROCKET_BODY_HEIGHT + NOSE_CONE_HEIGHT / 2;
            noseCone.castShadow = true;
            rocketGroup.add(noseCone);

            const nozzleGeometry = new THREE.CylinderGeometry(ROCKET_BASE_RADIUS * 0.8, ROCKET_BASE_RADIUS * 0.6, 1.0, 32);
            const nozzle = new THREE.Mesh(nozzleGeometry, darkMetalMaterial);
            nozzle.position.y = -0.5;
            rocketGroup.add(nozzle);

            const finGeometry = new THREE.BoxGeometry(FIN_THICKNESS, FIN_HEIGHT, FIN_WIDTH);
            for (let i = 0; i < 4; i++) {
                const fin = new THREE.Mesh(finGeometry, rocketMaterial);
                const angle = (i / 4) * Math.PI * 2;
                fin.position.set(
                    Math.cos(angle) * (ROCKET_BASE_RADIUS - FIN_WIDTH / 3),
                    FIN_HEIGHT / 2,
                    Math.sin(angle) * (ROCKET_BASE_RADIUS - FIN_WIDTH / 3)
                );
                fin.rotation.y = angle + Math.PI / 2;
                fin.castShadow = true;
                rocketGroup.add(fin);
            }

            rocketGroup.position.y = 0;
            scene.add(rocketGroup);
        }

        function createExhaust() {
            exhaustGroup = new THREE.Group();

            const flameMaterial1 = new THREE.MeshBasicMaterial({
                color: 0xffdd33,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            const flameMaterial2 = new THREE.MeshBasicMaterial({
                color: 0xff8800,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending
            });

            const mainFlameGeo = new THREE.ConeGeometry(ROCKET_BASE_RADIUS * 0.7, 1, 16);
            const mainFlame1 = new THREE.Mesh(mainFlameGeo, flameMaterial1);
            mainFlame1.rotation.x = Math.PI;
            exhaustGroup.add(mainFlame1);

            const innerFlameGeo = new THREE.ConeGeometry(ROCKET_BASE_RADIUS * 0.4, 1, 16);
            const mainFlame2 = new THREE.Mesh(innerFlameGeo, flameMaterial2);
            mainFlame2.rotation.x = Math.PI;
            mainFlame2.position.y = -0.2;
            exhaustGroup.add(mainFlame2);

            exhaustGroup.position.y = -0.5;
            exhaustGroup.visible = false;
            rocketGroup.add(exhaustGroup);
        }

        function createStarfield() {
            const starVertices = [];
            for (let i = 0; i < 8000; i++) {
                const x = THREE.MathUtils.randFloatSpread(1500);
                const y = THREE.MathUtils.randFloatSpread(1500);
                const z = THREE.MathUtils.randFloatSpread(1500);
                if (new THREE.Vector3(x,y,z).length() > 300) {
                    starVertices.push(x, y, z);
                }
            }
            const starGeometry = new THREE.BufferGeometry();
            starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
            const starMaterial = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 1.2,
                sizeAttenuation: true,
                transparent: true,
                opacity: 0
            });
            stars = new THREE.Points(starGeometry, starMaterial);
            stars.visible = false;
            scene.add(stars);
        }

        function updateExhaust(deltaTime, velocity) {
            if (!rocketState.launched || !exhaustGroup.visible) return;

            const baseFlameLength = 2.0;
            const velocityFactor = Math.min(1, velocity / (MAX_VELOCITY * 0.3));
            const flameLength = baseFlameLength + velocityFactor * 8.0;
            const flicker = 1.0 + Math.sin(clock.getElapsedTime() * 50) * 0.15;

            exhaustGroup.children.forEach((flame, index) => {
                if (index === 0) {
                    flame.scale.y = flameLength * flicker;
                    flame.scale.x = flame.scale.z = (1 + velocityFactor * 0.5) * flicker * 0.8;
                    flame.material.opacity = 0.6 + velocityFactor * 0.3;
                } else {
                    flame.scale.y = flameLength * 0.7 * flicker;
                    flame.scale.x = flame.scale.z = (1 + velocityFactor * 0.3) * flicker * 0.7;
                    flame.material.opacity = 0.5 + velocityFactor * 0.2;
                }
            });
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);
            const deltaTime = clock.getDelta();
            const elapsedTime = clock.getElapsedTime();

            if (elapsedTime > LAUNCH_DELAY && !rocketState.launched) {
                rocketState.launched = true;
                rocketState.launchTime = elapsedTime;
                exhaustGroup.visible = true;
            }

            if (rocketState.launched) {
                const timeSinceLaunch = elapsedTime - rocketState.launchTime;

                if (rocketState.velocity < MAX_VELOCITY * 0.5) {
                    rocketState.currentAcceleration = THREE.MathUtils.lerp(INITIAL_ACCELERATION, MAX_ACCELERATION, timeSinceLaunch / 10.0);
                } else {
                    rocketState.currentAcceleration = MAX_ACCELERATION * THREE.MathUtils.lerp(1, 0.3, (rocketState.velocity - MAX_VELOCITY*0.5) / (MAX_VELOCITY*0.5) );
                }
                rocketState.currentAcceleration = Math.max(INITIAL_ACCELERATION * 0.5, Math.min(rocketState.currentAcceleration, MAX_ACCELERATION));

                rocketState.velocity += rocketState.currentAcceleration * deltaTime;
                rocketState.velocity = Math.min(rocketState.velocity, MAX_VELOCITY);
                rocketGroup.position.y += rocketState.velocity * deltaTime;

                updateExhaust(deltaTime, rocketState.velocity);

                if (rocketGroup.position.y > SPACE_TRANSITION_START_ALT) {
                    const t = THREE.MathUtils.smoothstep(rocketGroup.position.y, SPACE_TRANSITION_START_ALT, SPACE_TRANSITION_END_ALT);
                    scene.background.lerpColors(new THREE.Color(0x87CEEB), new THREE.Color(0x000003), t);
                    if (scene.fog) {
                        scene.fog.color.lerpColors(new THREE.Color(0x87CEEB), new THREE.Color(0x000003), t);
                        scene.fog.near = THREE.MathUtils.lerp(50, 1000, t);
                        scene.fog.far = THREE.MathUtils.lerp(300, 2000, t);
                    }

                    if (t > 0.1 && !stars.visible) {
                        stars.visible = true;
                    }
                    if (stars.visible) {
                        stars.material.opacity = Math.min(1, t * 1.5);
                        stars.position.copy(camera.position).multiplyScalar(0.2);
                    }
                }

                const targetPosition = new THREE.Vector3().copy(rocketGroup.position);
                targetPosition.y += ROCKET_BODY_HEIGHT * 0.3;

                const desiredCamOffset = new THREE.Vector3(
                    35 + rocketState.velocity * 0.1,
                    15 + rocketGroup.position.y * 0.1,
                    45 + rocketState.velocity * 0.1
                );
                const desiredCamPos = new THREE.Vector3().copy(rocketGroup.position).add(desiredCamOffset);

                camera.position.lerp(desiredCamPos, deltaTime * 1.0);
                controls.target.lerp(targetPosition, deltaTime * 1.5);
            } else {
                const rumbleIntensity = 0.05;
                camera.position.x += (Math.random() - 0.5) * rumbleIntensity;
                camera.position.z += (Math.random() - 0.5) * rumbleIntensity;
            }

            if (rocketState.launched && rocketGroup.position.y > SPACE_TRANSITION_END_ALT * 0.8) {
                rocketGroup.rotation.y += 0.0005;
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
        title="Rocket Launch Demo"
      />
    </div>
  );
};

export default RocketDemo; 