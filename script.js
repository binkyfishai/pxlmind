// ===== Navigation Scroll Effect =====
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate menu items
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        if (navMenu.classList.contains('active')) {
            link.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        } else {
            link.style.animation = '';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Enhanced Parallax Effect for Floating Pixels =====
const floatingPixels = document.querySelectorAll('.pixel-cube');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

function animatePixels() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    floatingPixels.forEach((pixel, index) => {
        const speed = pixel.getAttribute('data-speed');
        const xOffset = (currentX - 0.5) * speed * 100;
        const yOffset = (currentY - 0.5) * speed * 100;
        const rotation = (currentX * 360) + (index * 90);
        
        pixel.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
    });
    
    requestAnimationFrame(animatePixels);
}

animatePixels();

// ===== Enhanced Three.js 3D Visualization =====
function initThreeJS() {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: container, 
        alpha: true,
        antialias: true 
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create enhanced pixelated brain geometry
    const createPixelBrain = () => {
        const group = new THREE.Group();
        
        // Brain core with multiple layers
        const coreGeometry = new THREE.BoxGeometry(2, 2, 2);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ffcc,
            emissive: 0x00ffcc,
            emissiveIntensity: 0.2,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        group.add(core);
        
        // Inner glowing core
        const innerCoreGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const innerCoreMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3
        });
        const innerCore = new THREE.Mesh(innerCoreGeometry, innerCoreMaterial);
        group.add(innerCore);

        // Pixel particles with enhanced movement
        const particleCount = 80;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const size = 0.05 + Math.random() * 0.1;
            const particleGeometry = new THREE.BoxGeometry(size, size, size);
            const hue = Math.random();
            const particleMaterial = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(hue, 1, 0.5),
                emissive: new THREE.Color().setHSL(hue, 1, 0.5),
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.8
            });
            
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            // Random position in sphere around core
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 2 + Math.random() * 1.5;
            
            particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
            particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
            particle.position.z = radius * Math.cos(phi);
            
            particle.userData = {
                originalPosition: particle.position.clone(),
                speed: 0.5 + Math.random() * 0.5,
                offset: Math.random() * Math.PI * 2,
                orbitRadius: 0.3 + Math.random() * 0.5,
                rotationSpeed: (Math.random() - 0.5) * 0.05
            };
            
            particles.push(particle);
            group.add(particle);
        }
        
        // Add connecting lines between particles
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00ffcc,
            transparent: true,
            opacity: 0.2
        });
        
        for (let i = 0; i < 20; i++) {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(6);
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const line = new THREE.Line(geometry, lineMaterial);
            line.userData = { particles: [particles[Math.floor(Math.random() * particles.length)], particles[Math.floor(Math.random() * particles.length)]] };
            group.add(line);
        }
        
        group.userData = { particles, lines: group.children.filter(child => child.type === 'Line') };
        return group;
    };

    const brain = createPixelBrain();
    scene.add(brain);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffcc, 1.5);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 1.5);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0xffff00, 0.8);
    pointLight3.position.set(0, 0, -5);
    scene.add(pointLight3);

    // Camera position
    camera.position.z = 5;

    // Mouse interaction
    let mouseThreeX = 0;
    let mouseThreeY = 0;
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseThreeX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseThreeY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    // Animation
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Rotate brain with mouse influence
        brain.rotation.x += 0.005 + mouseThreeY * 0.01;
        brain.rotation.y += 0.01 + mouseThreeX * 0.01;
        
        // Pulsating core
        const pulseFactor = 1 + Math.sin(time * 2) * 0.1;
        brain.children[0].scale.set(pulseFactor, pulseFactor, pulseFactor);

        // Animate particles with enhanced movement
        brain.userData.particles.forEach((particle, index) => {
            const { originalPosition, speed, offset, orbitRadius, rotationSpeed } = particle.userData;
            
            // Orbital motion
            const orbitAngle = time * speed + offset;
            particle.position.x = originalPosition.x + Math.sin(orbitAngle) * orbitRadius;
            particle.position.y = originalPosition.y + Math.cos(orbitAngle) * orbitRadius;
            particle.position.z = originalPosition.z + Math.sin(orbitAngle * 0.5) * orbitRadius;
            
            // Individual rotation
            particle.rotation.x += rotationSpeed;
            particle.rotation.y += rotationSpeed * 1.5;
            particle.rotation.z += rotationSpeed * 0.5;
            
            // Pulsating opacity
            particle.material.opacity = 0.5 + Math.sin(time * 2 + offset) * 0.3;
        });
        
        // Update connecting lines
        brain.userData.lines.forEach(line => {
            const positions = line.geometry.attributes.position.array;
            const [p1, p2] = line.userData.particles;
            positions[0] = p1.position.x;
            positions[1] = p1.position.y;
            positions[2] = p1.position.z;
            positions[3] = p2.position.x;
            positions[4] = p2.position.y;
            positions[5] = p2.position.z;
            line.geometry.attributes.position.needsUpdate = true;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    });
}

// Initialize Three.js when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
    initThreeJS();
}

// ===== Enhanced Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add stagger effect for grid items
            if (entry.target.classList.contains('problem-card') || 
                entry.target.classList.contains('advantage-card') || 
                entry.target.classList.contains('showcase-card')) {
                const cards = entry.target.parentElement.querySelectorAll('.animate-in');
                const index = Array.from(cards).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.problem-card, .advantage-card, .showcase-card, .tech-item, .feature-card').forEach(el => {
    observer.observe(el);
});

// ===== Smooth Scroll for CTA Buttons =====
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
        
        // Handle button actions
        if (button.textContent.includes('Try It Now') || button.textContent.includes('Try Explainer')) {
            e.preventDefault();
            showNotification('PixelMind Explainer Demo - Coming Soon!', 'info');
        } else if (button.textContent.includes('Watch Demo')) {
            e.preventDefault();
            showNotification('Demo Video - Coming Soon!', 'info');
        }
    });
});

// ===== Custom Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'info' ? 'info-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Add CSS animations dynamically =====
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .problem-card,
    .advantage-card,
    .showcase-card,
    .tech-item,
    .feature-card {
        opacity: 0;
    }
    
    /* Ripple Effect */
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Notification Styles */
    .notification {
        position: fixed;
        top: 100px;
        right: -400px;
        background: var(--light-bg);
        border-left: 4px solid var(--primary-color);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        transition: right 0.3s ease;
        z-index: 10000;
        max-width: 350px;
    }
    
    .notification.show {
        right: 20px;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notification i {
        font-size: 1.5rem;
        color: var(--primary-color);
    }
    
    /* Mobile menu animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== Enhanced Pixel Rain Effect =====
function createPixelRain() {
    const pixelRainContainer = document.createElement('div');
    pixelRainContainer.className = 'pixel-rain';
    pixelRainContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    // Create multiple layers of rain for depth
    for (let layer = 0; layer < 3; layer++) {
        for (let i = 0; i < 10; i++) {
            const pixel = document.createElement('div');
            const size = 4 - layer; // Smaller pixels in background
            const duration = 5 + Math.random() * 5 + layer * 2; // Slower in background
            const delay = Math.random() * 5;
            const opacity = (0.3 + Math.random() * 0.4) * (1 - layer * 0.3);
            
            pixel.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, #00ffcc, #ff00ff);
                top: -10px;
                left: ${Math.random() * 100}%;
                animation: pixelFall ${duration}s linear infinite;
                animation-delay: ${delay}s;
                opacity: ${opacity};
                filter: blur(${layer * 0.5}px);
            `;
            pixelRainContainer.appendChild(pixel);
        }
    }
    
    document.body.appendChild(pixelRainContainer);
    
    // Add animation
    const rainStyle = document.createElement('style');
    rainStyle.textContent = `
        @keyframes pixelFall {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(rainStyle);
}

// Enable pixel rain on larger screens only
if (window.innerWidth > 768) {
    createPixelRain();
}

// ===== Cursor Trail Effect =====
function createCursorTrail() {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, var(--primary-color), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(trail);
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.style.opacity = '0.5';
    });
    
    document.addEventListener('mouseout', () => {
        trail.style.opacity = '0';
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX - 10 + 'px';
        trail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Enable cursor trail on desktop
if (window.innerWidth > 1024) {
    createCursorTrail();
}

// ===== Loading Animation =====
window.addEventListener('load', () => {
    // Hide loader with animation
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hide');
        }
        document.body.classList.add('loaded');
        
        // Animate hero content on load
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        
        if (heroTitle) {
            heroTitle.style.animation = 'fadeInUp 1s ease-out 0.5s forwards';
            heroTitle.style.opacity = '0';
        }
        if (heroSubtitle) {
            heroSubtitle.style.animation = 'fadeInUp 1s ease-out 0.7s forwards';
            heroSubtitle.style.opacity = '0';
        }
        if (heroButtons) {
            heroButtons.style.animation = 'fadeInUp 1s ease-out 0.9s forwards';
            heroButtons.style.opacity = '0';
        }
    }, 1500);
});

// ===== Performance Optimization =====
// Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations here
    });
});

// ===== Easter Egg: Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    showNotification('🎮 Konami Code Activated! Welcome to the Pixel Dimension! 🎮', 'info');
    
    const easterStyle = document.createElement('style');
    easterStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(easterStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
        easterStyle.remove();
    }, 10000);
} 