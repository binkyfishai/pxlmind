import React, { useEffect } from 'react';

const ParticleDemo: React.FC = () => {
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
      let particles = [];
      let emitters = [];
      let isEmitting = true;
      let particleColors = [0x165DFF, 0x36D399, 0xFF6B9B, 0xFFD700];
      let currentColorIndex = 0;
      let emissionRate = 5;
      let particleLifespan = 3000;

      function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e);

        const container = document.getElementById('particle-container');
        if (!container) return;

        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 15;

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Create particle emitters
        createEmitters();

        // Interactive controls
        window.addEventListener('keydown', handleKeyPress);
        renderer.domElement.addEventListener('dblclick', toggleEmission);
        renderer.domElement.addEventListener('click', changeParticleColor);
        renderer.domElement.addEventListener('wheel', adjustEmissionRate);

        animate();
      }

      function createEmitters() {
        // Create multiple emitter points
        const emitterPositions = [
          new THREE.Vector3(-5, 0, 0),
          new THREE.Vector3(5, 0, 0),
          new THREE.Vector3(0, 5, 0),
          new THREE.Vector3(0, -5, 0)
        ];

        emitterPositions.forEach(position => {
          const emitter = {
            position: position,
            direction: position.clone().normalize().multiplyScalar(-1),
            spread: Math.PI / 4
          };
          emitters.push(emitter);
        });
      }

      function createParticle(position, direction) {
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshPhongMaterial({
          color: particleColors[currentColorIndex],
          transparent: true,
          opacity: 1
        });
        const particle = new THREE.Mesh(geometry, material);
        
        // Add particle properties
        particle.position.copy(position);
        particle.velocity = direction.clone()
          .multiplyScalar(0.1)
          .add(new THREE.Vector3(
            (Math.random() - 0.5) * 0.05,
            (Math.random() - 0.5) * 0.05,
            (Math.random() - 0.5) * 0.05
          ));
        particle.birthTime = Date.now();
        particle.lifespan = particleLifespan;

        scene.add(particle);
        particles.push(particle);
      }

      function updateParticles() {
        const now = Date.now();
        
        // Update existing particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];
          const age = now - particle.birthTime;
          
          if (age > particle.lifespan) {
            // Remove dead particles
            scene.remove(particle);
            particles.splice(i, 1);
          } else {
            // Update particle position and appearance
            particle.position.add(particle.velocity);
            particle.velocity.y -= 0.001; // Gravity effect
            particle.material.opacity = 1 - (age / particle.lifespan);
            particle.scale.setScalar(1 - (age / particle.lifespan) * 0.5);
          }
        }

        // Emit new particles
        if (isEmitting) {
          emitters.forEach(emitter => {
            for (let i = 0; i < emissionRate; i++) {
              if (Math.random() < 0.3) { // Control emission frequency
                const direction = emitter.direction.clone()
                  .applyAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    (Math.random() - 0.5) * emitter.spread
                  )
                  .applyAxisAngle(
                    new THREE.Vector3(1, 0, 0),
                    (Math.random() - 0.5) * emitter.spread
                  );
                createParticle(emitter.position.clone(), direction);
              }
            }
          });
        }
      }

      function handleKeyPress(event) {
        switch(event.key) {
          case 'ArrowUp':
            emissionRate = Math.min(emissionRate + 1, 10);
            break;
          case 'ArrowDown':
            emissionRate = Math.max(emissionRate - 1, 1);
            break;
          case ' ':
            toggleEmission();
            break;
          case 'c':
            changeParticleColor();
            break;
        }
      }

      function toggleEmission() {
        isEmitting = !isEmitting;
      }

      function changeParticleColor() {
        currentColorIndex = (currentColorIndex + 1) % particleColors.length;
      }

      function adjustEmissionRate(event) {
        if (event.altKey) {
          event.preventDefault();
          emissionRate = Math.max(1, Math.min(10, emissionRate + Math.sign(event.deltaY) * -1));
        }
      }

      function animate() {
        requestAnimationFrame(animate);
        updateParticles();
        controls.update();
        renderer.render(scene, camera);
      }

      function handleResize() {
        const container = document.getElementById('particle-container');
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
      const container = document.getElementById('particle-container');
      if (container && container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div id="particle-container" style={{ width: '100%', height: '400px', background: '#1a1a2e' }}>
      {/* Three.js will render here */}
    </div>
  );
};

export default ParticleDemo; 