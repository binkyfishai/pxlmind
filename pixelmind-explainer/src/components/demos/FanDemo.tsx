import React, { useEffect } from 'react';

const FanDemo: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'importmap';
    script.textContent = JSON.stringify({
      imports: {
        'three': 'https://unpkg.com/three@0.132.2/build/three.module.js',
        'three/addons/': 'https://unpkg.com/three@0.132.2/examples/jsm/'
      }
    });
    document.head.appendChild(script);

    const mainScript = document.createElement('script');
    mainScript.type = 'module';
    mainScript.textContent = `
      import * as THREE from 'three';
      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

      let scene, camera, renderer, controls;
      let fanGroup, bladesAssembly;
      let rotationSpeed = 0.15;
      let isRotating = true;

      function init() {
        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e);

        const container = document.getElementById('fan-container');
        if (!container) return;

        // Camera setup
        camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(4, 3, 7);
        camera.lookAt(0, 1.5, 0);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);

        // Controls setup
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 1.5, 0);
        controls.update();

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(8, 15, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        scene.add(directionalLight);

        createFanModel();

        // Interactive controls
        window.addEventListener('keydown', handleKeyPress);
        renderer.domElement.addEventListener('dblclick', toggleRotation);
        renderer.domElement.addEventListener('wheel', adjustSpeed);

        animate();
      }

      function createFanModel() {
        fanGroup = new THREE.Group();
        scene.add(fanGroup);

        const baseMat = new THREE.MeshStandardMaterial({ color: 0x36D399, metalness: 0.4, roughness: 0.6 });
        const standMat = new THREE.MeshStandardMaterial({ color: 0x165DFF, metalness: 0.5, roughness: 0.5 });
        const motorMat = new THREE.MeshStandardMaterial({ color: 0xFF6B9B, metalness: 0.6, roughness: 0.4 });
        const bladeMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, metalness: 0.3, roughness: 0.7, side: THREE.DoubleSide });
        const spinnerMat = new THREE.MeshStandardMaterial({ color: 0x4682B4, metalness: 0.5, roughness: 0.3 });
        const guardMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.7, roughness: 0.3 });

        // Base
        const baseGeo = new THREE.CylinderGeometry(0.8, 1, 0.3, 32);
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.15;
        base.castShadow = true;
        base.receiveShadow = true;
        fanGroup.add(base);

        // Stand
        const standHeight = 2;
        const standGeo = new THREE.CylinderGeometry(0.1, 0.1, standHeight, 16);
        const stand = new THREE.Mesh(standGeo, standMat);
        stand.position.y = 0.3 + standHeight / 2;
        stand.castShadow = true;
        stand.receiveShadow = true;
        fanGroup.add(stand);

        // Motor Housing
        const motorLength = 0.8;
        const motorRadius = 0.4;
        const motorGeo = new THREE.CylinderGeometry(motorRadius, motorRadius * 0.9, motorLength, 32);
        const motorHousing = new THREE.Mesh(motorGeo, motorMat);
        motorHousing.rotation.x = Math.PI / 2;
        motorHousing.position.y = 0.3 + standHeight;
        motorHousing.position.z = 0;
        motorHousing.castShadow = true;
        motorHousing.receiveShadow = true;
        fanGroup.add(motorHousing);

        const motorFrontZ = motorLength / 2;

        // Blades Assembly
        bladesAssembly = new THREE.Group();
        bladesAssembly.position.y = motorHousing.position.y;
        bladesAssembly.position.z = motorFrontZ + 0.05;
        fanGroup.add(bladesAssembly);

        // Spinner (center of blades)
        const spinnerGeo = new THREE.SphereGeometry(0.15, 16, 16);
        const spinner = new THREE.Mesh(spinnerGeo, spinnerMat);
        spinner.castShadow = true;
        bladesAssembly.add(spinner);

        // Blades
        const numBlades = 3;
        const bladeLength = 0.75;
        const bladeWidth = 0.25;
        const bladeThickness = 0.02;
        const bladeGeo = new THREE.BoxGeometry(bladeWidth, bladeLength, bladeThickness);

        for (let i = 0; i < numBlades; i++) {
          const blade = new THREE.Mesh(bladeGeo, bladeMat);
          blade.castShadow = true;
          blade.receiveShadow = true;
          blade.position.y = bladeLength / 2;
          blade.rotation.x = -Math.PI / 10;

          const bladePivot = new THREE.Group();
          bladePivot.add(blade);
          bladePivot.rotation.z = (Math.PI * 2 / numBlades) * i;
          
          bladesAssembly.add(bladePivot);
        }

        // Fan Guard
        const guardGroup = new THREE.Group();
        guardGroup.position.y = motorHousing.position.y;
        guardGroup.position.z = motorFrontZ + 0.15;
        fanGroup.add(guardGroup);

        const guardOuterRadius = bladeLength + 0.15;
        const guardWireThickness = 0.03;

        // Outer Ring
        const outerRingGeo = new THREE.TorusGeometry(guardOuterRadius, guardWireThickness, 16, 100);
        const outerRing = new THREE.Mesh(outerRingGeo, guardMat);
        outerRing.castShadow = true;
        guardGroup.add(outerRing);

        // Inner Ring
        const innerRingRadius = guardOuterRadius * 0.3;
        const innerRingGeo = new THREE.TorusGeometry(innerRingRadius, guardWireThickness * 0.8, 16, 64);
        const innerRing = new THREE.Mesh(innerRingGeo, guardMat);
        innerRing.castShadow = true;
        guardGroup.add(innerRing);

        // Guard Spokes
        const numSpokes = 8;
        const spokeGeo = new THREE.CylinderGeometry(guardWireThickness / 2, guardWireThickness / 2, guardOuterRadius * 2, 8);
        for (let i = 0; i < numSpokes; i++) {
          const spoke = new THREE.Mesh(spokeGeo, guardMat);
          spoke.rotation.z = (Math.PI / numSpokes) * i;
          spoke.castShadow = true;
          guardGroup.add(spoke);
        }
      }

      function handleKeyPress(event) {
        switch(event.key) {
          case 'ArrowUp':
            rotationSpeed = Math.min(rotationSpeed + 0.05, 0.5);
            break;
          case 'ArrowDown':
            rotationSpeed = Math.max(rotationSpeed - 0.05, 0);
            break;
          case ' ':
            toggleRotation();
            break;
        }
      }

      function toggleRotation() {
        isRotating = !isRotating;
      }

      function adjustSpeed(event) {
        if (event.altKey) {
          event.preventDefault();
          rotationSpeed = Math.max(0, Math.min(0.5, rotationSpeed + event.deltaY * -0.0001));
        }
      }

      function animate() {
        requestAnimationFrame(animate);

        if (isRotating) {
          bladesAssembly.rotation.z -= rotationSpeed;
        }

        controls.update();
        renderer.render(scene, camera);
      }

      function handleResize() {
        const container = document.getElementById('fan-container');
        if (!container) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }

      init();
      window.addEventListener('resize', handleResize);
      handleResize();

      // Cleanup function
      window.addEventListener('beforeunload', () => {
        window.removeEventListener('resize', handleResize);
      });
    `;
    document.body.appendChild(mainScript);

    return () => {
      document.head.removeChild(script);
      document.body.removeChild(mainScript);
      const container = document.getElementById('fan-container');
      if (container && container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div id="fan-container" style={{ width: '100%', height: '400px', background: '#1a1a2e' }}>
      {/* Three.js will render here */}
    </div>
  );
};

export default FanDemo; 