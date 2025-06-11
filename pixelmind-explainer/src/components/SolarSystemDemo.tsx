import React, { useRef, useEffect } from 'react';

interface SolarSystemDemoProps {
  width?: string;
  height?: string;
  className?: string;
}

const SolarSystemDemo: React.FC<SolarSystemDemoProps> = ({
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
    <title>Three.js - Nine Planets (Solar System)</title>
    <style>
        body { margin: 0; overflow: hidden; background-color: #101018; }
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
        let sunMesh;
        const clock = new THREE.Clock();
        const celestialEntities = [];

        const SUN_RADIUS = 7;
        const SUN_COLOR = 0xFFFF00;
        const SUN_AXIAL_SPEED = 0.004;

        const GLOBAL_TIME_SCALE = 0.25;

        const planetsData = [
            { name: 'Mercury', radius: 0.38 * SUN_RADIUS * 0.2, color: 0x999999, orbitalRadius: SUN_RADIUS + 10, orbitalSpeedFactor: 1.60, axialSpeedFactor: 0.01 },
            { name: 'Venus', radius: 0.95 * SUN_RADIUS * 0.2, color: 0xE6D2B5, orbitalRadius: SUN_RADIUS + 18, orbitalSpeedFactor: 1.15, axialSpeedFactor: -0.002 },
            { name: 'Earth', radius: 1.0 * SUN_RADIUS * 0.2, color: 0x6699FF, orbitalRadius: SUN_RADIUS + 28, orbitalSpeedFactor: 1.0, axialSpeedFactor: 0.05, axialTilt: 23.5,
                moon: { name: 'Moon', radius: 0.27 * (1.0 * SUN_RADIUS * 0.2), color: 0xCCCCCC, orbitalRadius: 2.0, orbitalSpeedFactor: 5.0, axialSpeedFactor: 0.005 } },
            { name: 'Mars', radius: 0.53 * SUN_RADIUS * 0.2, color: 0xFF7F50, orbitalRadius: SUN_RADIUS + 40, orbitalSpeedFactor: 0.80, axialSpeedFactor: 0.048, axialTilt: 25.0 },
            { name: 'Jupiter', radius: 3.5 * SUN_RADIUS * 0.2, color: 0xD2B48C, orbitalRadius: SUN_RADIUS + 70, orbitalSpeedFactor: 0.43, axialSpeedFactor: 0.12 },
            { name: 'Saturn', radius: 3.0 * SUN_RADIUS * 0.2, color: 0xF0E68C, orbitalRadius: SUN_RADIUS + 100, orbitalSpeedFactor: 0.32, axialSpeedFactor: 0.11, axialTilt: 26.7,
                rings: { innerRadius: 3.0 * SUN_RADIUS * 0.2 * 1.2, outerRadius: 3.0 * SUN_RADIUS * 0.2 * 2.2, color: 0xAAA58B } },
            { name: 'Uranus', radius: 1.8 * SUN_RADIUS * 0.2, color: 0xAFEEEE, orbitalRadius: SUN_RADIUS + 130, orbitalSpeedFactor: 0.22, axialSpeedFactor: 0.07, axialTilt: 97.77 },
            { name: 'Neptune', radius: 1.7 * SUN_RADIUS * 0.2, color: 0x4682B4, orbitalRadius: SUN_RADIUS + 160, orbitalSpeedFactor: 0.18, axialSpeedFactor: 0.06, axialTilt: 28.3 },
            { name: 'Pluto', radius: 0.18 * SUN_RADIUS * 0.2, color: 0xBDAA99, orbitalRadius: SUN_RADIUS + 190, orbitalSpeedFactor: 0.15, axialSpeedFactor: 0.008, axialTilt: 119.6 }
        ];

        function init() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x101018);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
            camera.position.set(0, SUN_RADIUS * 5, SUN_RADIUS * 15 + planetsData[planetsData.length-1].orbitalRadius * 0.3 );
            camera.lookAt(0, 0, 0);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            document.body.appendChild(renderer.domElement);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.target.set(0, 0, 0);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
            directionalLight.position.set(10, 15, 10);
            scene.add(directionalLight);

            const sunPointLight = new THREE.PointLight(SUN_COLOR, 1.5, planetsData[planetsData.length-1].orbitalRadius * 2.5);
            sunPointLight.position.set(0, 0, 0);
            scene.add(sunPointLight);

            const gridHelper = new THREE.GridHelper(planetsData[planetsData.length-1].orbitalRadius * 2.2, 50, 0x444444, 0x333333);
            scene.add(gridHelper);

            createSun();
            createPlanetsAndMoons();

            window.addEventListener('resize', onWindowResize, false);
            animate();
        }

        function createSun() {
            const sunGeometry = new THREE.SphereGeometry(SUN_RADIUS, 64, 64);
            const sunMaterial = new THREE.MeshBasicMaterial({ color: SUN_COLOR });
            sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
            scene.add(sunMesh);
        }

        function createPlanetsAndMoons() {
            planetsData.forEach(data => {
                const orbitAnchor = new THREE.Object3D();
                scene.add(orbitAnchor);

                const planetGeometry = new THREE.SphereGeometry(data.radius, 32, 32);
                const planetMaterial = new THREE.MeshStandardMaterial({
                    color: data.color,
                    roughness: 0.8,
                    metalness: 0.1
                });
                const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

                planetMesh.position.x = data.orbitalRadius;

                if (data.axialTilt) {
                    planetMesh.rotation.z = THREE.MathUtils.degToRad(data.axialTilt);
                }

                orbitAnchor.add(planetMesh);

                const entity = {
                    name: data.name,
                    mesh: planetMesh,
                    orbitAnchor: orbitAnchor,
                    orbitalSpeed: (data.orbitalSpeedFactor / (data.orbitalRadius * 0.05)) * GLOBAL_TIME_SCALE,
                    axialSpeed: data.axialSpeedFactor * GLOBAL_TIME_SCALE
                };

                if (data.rings) {
                    const ringGeometry = new THREE.RingGeometry(data.rings.innerRadius, data.rings.outerRadius, 64);
                    const ringMaterial = new THREE.MeshStandardMaterial({
                        color: data.rings.color,
                        side: THREE.DoubleSide,
                        transparent: true,
                        opacity: 0.6,
                        roughness: 0.9
                    });
                    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
                    ringMesh.rotation.x = Math.PI / 2;
                    planetMesh.add(ringMesh);
                }

                if (data.moon) {
                    const moonData = data.moon;
                    const moonOrbitAnchor = new THREE.Object3D();
                    planetMesh.add(moonOrbitAnchor);

                    const moonGeometry = new THREE.SphereGeometry(moonData.radius, 16, 16);
                    const moonMaterial = new THREE.MeshStandardMaterial({ color: moonData.color, roughness: 0.9 });
                    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
                    moonMesh.position.x = moonData.orbitalRadius;
                    moonOrbitAnchor.add(moonMesh);

                    entity.moonData = {
                        mesh: moonMesh,
                        orbitAnchor: moonOrbitAnchor,
                        orbitalSpeed: (moonData.orbitalSpeedFactor / (moonData.orbitalRadius * 0.1)) * GLOBAL_TIME_SCALE,
                        axialSpeed: moonData.axialSpeedFactor * GLOBAL_TIME_SCALE
                    };
                }
                celestialEntities.push(entity);
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

            if (sunMesh) {
                sunMesh.rotation.y += SUN_AXIAL_SPEED * deltaTime * GLOBAL_TIME_SCALE;
            }

            celestialEntities.forEach(entity => {
                entity.orbitAnchor.rotation.y += entity.orbitalSpeed * deltaTime;
                entity.mesh.rotation.y += entity.axialSpeed * deltaTime;

                if (entity.moonData) {
                    const moon = entity.moonData;
                    moon.orbitAnchor.rotation.y += moon.orbitalSpeed * deltaTime;
                    moon.mesh.rotation.y += moon.axialSpeed * deltaTime;
                }
            });

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
        title="Solar System Demo"
      />
    </div>
  );
};

export default SolarSystemDemo; 