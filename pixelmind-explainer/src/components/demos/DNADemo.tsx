import React, { useEffect } from 'react';

const DNADemo: React.FC<{ containerId: string }> = ({ containerId }) => {
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
      let dnaGroup;
      let rotationSpeed = 0.005;
      let autoRotate = true;
      let highlightedNucleotide = null;
      let nucleotides = [];

      function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e);

        const container = document.getElementById('${containerId}');
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

        createDNA();

        // Interactive controls
        window.addEventListener('keydown', handleKeyPress);
        renderer.domElement.addEventListener('dblclick', toggleRotation);
        renderer.domElement.addEventListener('mousemove', highlightNucleotide);
        renderer.domElement.addEventListener('wheel', adjustSpeed);

        animate();
      }

      function createDNA() {
        dnaGroup = new THREE.Group();
        scene.add(dnaGroup);

        const numPairs = 20;
        const radius = 3;
        const height = 20;
        const twists = 2;

        const nucleotideColors = {
          A: 0x36D399, // Adenine - Green
          T: 0x165DFF, // Thymine - Blue
          C: 0xFF6B9B, // Cytosine - Pink
          G: 0xFFD700  // Guanine - Yellow
        };

        const basePairs = ['AT', 'GC', 'TA', 'CG'];

        for (let i = 0; i < numPairs; i++) {
          const t = i / (numPairs - 1);
          const angle = t * Math.PI * 2 * twists;
          const y = height * (0.5 - t);

          const pair = basePairs[i % basePairs.length];
          
          // Create first strand nucleotide
          const pos1 = new THREE.Vector3(
            radius * Math.cos(angle),
            y,
            radius * Math.sin(angle)
          );
          
          const nuc1 = createNucleotide(pos1, nucleotideColors[pair[0]], pair[0]);
          dnaGroup.add(nuc1);
          nucleotides.push(nuc1);

          // Create complementary nucleotide
          const pos2 = new THREE.Vector3(
            radius * Math.cos(angle + Math.PI),
            y,
            radius * Math.sin(angle + Math.PI)
          );
          
          const nuc2 = createNucleotide(pos2, nucleotideColors[pair[1]], pair[1]);
          dnaGroup.add(nuc2);
          nucleotides.push(nuc2);

          // Create backbone segments
          if (i > 0) {
            createBackboneSegment(prevPos1, pos1);
            createBackboneSegment(prevPos2, pos2);
          }

          // Create hydrogen bonds
          createHydrogenBond(pos1, pos2);

          var prevPos1 = pos1;
          var prevPos2 = pos2;
        }
      }

      function createNucleotide(position, color, type) {
        const geometry = new THREE.SphereGeometry(0.4, 32, 32);
        const material = new THREE.MeshPhongMaterial({ 
          color: color,
          specular: 0x050505,
          shininess: 100
        });
        const nucleotide = new THREE.Mesh(geometry, material);
        nucleotide.position.copy(position);
        nucleotide.userData.type = type;
        nucleotide.userData.originalColor = color;
        return nucleotide;
      }

      function createBackboneSegment(start, end) {
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        
        const geometry = new THREE.CylinderGeometry(0.1, 0.1, length, 8);
        const material = new THREE.MeshPhongMaterial({ color: 0xF8FAFC });
        const segment = new THREE.Mesh(geometry, material);

        // Position and orient the cylinder
        const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        segment.position.copy(midpoint);
        segment.lookAt(end);
        segment.rotateX(Math.PI / 2);

        dnaGroup.add(segment);
      }

      function createHydrogenBond(start, end) {
        const geometry = new THREE.CylinderGeometry(0.05, 0.05, start.distanceTo(end), 8);
        const material = new THREE.MeshPhongMaterial({ 
          color: 0xF8FAFC,
          transparent: true,
          opacity: 0.5
        });
        const bond = new THREE.Mesh(geometry, material);

        const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        bond.position.copy(midpoint);
        bond.lookAt(end);
        bond.rotateX(Math.PI / 2);

        dnaGroup.add(bond);
      }

      function handleKeyPress(event) {
        switch(event.key) {
          case 'ArrowUp':
            rotationSpeed = Math.min(rotationSpeed + 0.001, 0.02);
            break;
          case 'ArrowDown':
            rotationSpeed = Math.max(rotationSpeed - 0.001, -0.02);
            break;
          case ' ':
            toggleRotation();
            break;
        }
      }

      function toggleRotation() {
        autoRotate = !autoRotate;
      }

      function adjustSpeed(event) {
        if (event.altKey) {
          event.preventDefault();
          rotationSpeed = Math.max(-0.02, Math.min(0.02, rotationSpeed + event.deltaY * -0.00001));
        }
      }

      function highlightNucleotide(event) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(nucleotides);

        // Reset previous highlight
        if (highlightedNucleotide) {
          highlightedNucleotide.material.color.setHex(highlightedNucleotide.userData.originalColor);
          highlightedNucleotide.material.emissive.setHex(0x000000);
        }

        // Set new highlight
        if (intersects.length > 0) {
          highlightedNucleotide = intersects[0].object;
          highlightedNucleotide.material.emissive.setHex(0x333333);
          
          // Show tooltip
          const tooltip = document.getElementById('dna-tooltip');
          if (tooltip) {
            tooltip.style.display = 'block';
            tooltip.style.left = event.clientX + 10 + 'px';
            tooltip.style.top = event.clientY + 10 + 'px';
            tooltip.textContent = 'Nucleotide: ' + highlightedNucleotide.userData.type;
          }
        } else {
          highlightedNucleotide = null;
          const tooltip = document.getElementById('dna-tooltip');
          if (tooltip) {
            tooltip.style.display = 'none';
          }
        }
      }

      function animate() {
        requestAnimationFrame(animate);

        if (autoRotate) {
          dnaGroup.rotation.y += rotationSpeed;
        }

        controls.update();
        renderer.render(scene, camera);
      }

      function handleResize() {
        const container = document.getElementById('${containerId}');
        if (!container) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }

      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.id = 'dna-tooltip';
      tooltip.style.cssText = 'display: none; position: fixed; background: rgba(0,0,0,0.8); color: white; padding: 5px 10px; border-radius: 5px; font-size: 14px; pointer-events: none; z-index: 1000;';
      document.body.appendChild(tooltip);

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
      const container = document.getElementById(containerId);
      if (container && container.firstChild) {
        container.removeChild(container.firstChild);
      }
      const tooltip = document.getElementById('dna-tooltip');
      if (tooltip) {
        document.body.removeChild(tooltip);
      }
    };
  }, [containerId]);

  return (
    <div id={containerId} style={{ width: '100%', height: '400px', background: '#1a1a2e' }}>
      {/* Three.js will render here */}
    </div>
  );
};

export default DNADemo;