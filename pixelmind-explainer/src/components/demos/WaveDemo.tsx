import React, { useEffect } from 'react';

const WaveDemo: React.FC = () => {
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
      let waves = [];
      const size = 50;
      const resolution = 50;

      function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x001f3f);

        const container = document.getElementById('wave-container');
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(30, 30, 30);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        createWaves();
        animate();

        window.addEventListener('resize', onWindowResize);
      }

      function createWaves() {
        const geometry = new THREE.PlaneGeometry(size, size, resolution, resolution);
        const material = new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          wireframe: true,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        });

        for (let i = 0; i < 3; i++) {
          const wave = new THREE.Mesh(geometry, material.clone());
          wave.rotation.x = -Math.PI / 2;
          wave.position.y = i * 10;
          wave.material.color.setHSL(i * 0.1 + 0.5, 1, 0.5);
          scene.add(wave);
          waves.push(wave);
        }
      }

      function onWindowResize() {
        const container = document.getElementById('wave-container');
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }

      function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        waves.forEach((wave, waveIndex) => {
          const vertices = wave.geometry.attributes.position.array;
          const phase = time + waveIndex * Math.PI * 0.5;

          for (let i = 0; i <= resolution; i++) {
            for (let j = 0; j <= resolution; j++) {
              const index = (i * (resolution + 1) + j) * 3;
              const x = vertices[index];
              const z = vertices[index + 2];

              const distance = Math.sqrt(x * x + z * z);
              vertices[index + 1] = 
                Math.sin(distance * 0.3 + phase) * 2 +
                Math.sin(x * 0.5 + phase) * 1 +
                Math.sin(z * 0.4 + phase) * 1.5;
            }
          }

          wave.geometry.attributes.position.needsUpdate = true;
          wave.rotation.y = time * 0.1;
        });

        controls.update();
        renderer.render(scene, camera);
      }

      init();
    `;
    document.body.appendChild(mainScript);

    return () => {
      document.head.removeChild(script);
      document.body.removeChild(mainScript);
      const container = document.getElementById('wave-container');
      if (container && container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div id="wave-container" style={{ width: '100%', height: '400px', background: '#001f3f' }}>
      {/* Three.js will render here */}
    </div>
  );
};

export default WaveDemo; 