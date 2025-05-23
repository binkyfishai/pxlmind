// ===== Global Variables =====
let scene, camera, renderer, brain, particles = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let lastScrollY = window.scrollY;
let scrollDirection = 'up';

// ===== Loader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hide');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1500);
});

// ===== Navbar Scroll Effect =====
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
}

// Throttled scroll handler
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleNavbarScroll, 16); // ~60fps
});

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== Active Navigation Links =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== 3D Interactive Mind Map =====
function init3DBrain() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true 
    });
    
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    
    // Create mind map group
    const mindMapGroup = new THREE.Group();
    
    // Colors for different node types
    const colors = {
        central: 0x00ffcc,
        primary: 0xff00ff,
        secondary: 0xffff00,
        tertiary: 0x00d4ff
    };
    
    // Node creation function
    function createNode(size, color, wireframe = false) {
        const geometry = new THREE.OctahedronGeometry(size, 1);
        const material = new THREE.MeshBasicMaterial({ 
            color: color,
            wireframe: wireframe,
            transparent: true,
            opacity: wireframe ? 0.8 : 0.9
        });
        return new THREE.Mesh(geometry, material);
    }
    
    // Create central node
    const centralNode = createNode(0.5, colors.central);
    centralNode.position.set(0, 0, 0);
    mindMapGroup.add(centralNode);
    
    // Create primary nodes (main branches)
    const primaryNodes = [];
    const primaryPositions = [
        { x: 2, y: 1, z: 1 },
        { x: -1.5, y: 2, z: 0.5 },
        { x: 1, y: -1.5, z: 2 },
        { x: -2, y: 0, z: -1.5 },
        { x: 0.5, y: 1.8, z: -2 }
    ];
    
    primaryPositions.forEach((pos, index) => {
        const node = createNode(0.3, colors.primary, true);
        node.position.set(pos.x, pos.y, pos.z);
        primaryNodes.push(node);
        mindMapGroup.add(node);
        
        // Connect to central node
        const points = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(pos.x, pos.y, pos.z)
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
            color: colors.central, 
            transparent: true,
            opacity: 0.6
        });
        const line = new THREE.Line(geometry, material);
        mindMapGroup.add(line);
    });
    
    // Create secondary nodes (sub-branches)
    const secondaryNodes = [];
    primaryNodes.forEach((primaryNode, primaryIndex) => {
        const numSecondary = 2 + Math.floor(Math.random() * 2); // 2-3 secondary nodes per primary
        
        for (let i = 0; i < numSecondary; i++) {
            const angle = (i / numSecondary) * Math.PI * 2;
            const distance = 1 + Math.random() * 0.5;
            
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance * 0.5;
            const offsetZ = (Math.random() - 0.5) * distance;
            
            const secondaryPos = {
                x: primaryNode.position.x + offsetX,
                y: primaryNode.position.y + offsetY,
                z: primaryNode.position.z + offsetZ
            };
            
            const node = createNode(0.15, colors.secondary);
            node.position.set(secondaryPos.x, secondaryPos.y, secondaryPos.z);
            secondaryNodes.push(node);
            mindMapGroup.add(node);
            
            // Connect to primary node
            const points = [
                new THREE.Vector3(primaryNode.position.x, primaryNode.position.y, primaryNode.position.z),
                new THREE.Vector3(secondaryPos.x, secondaryPos.y, secondaryPos.z)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ 
                color: colors.primary, 
                transparent: true,
                opacity: 0.4
            });
            const line = new THREE.Line(geometry, material);
            mindMapGroup.add(line);
        }
    });
    
    // Create some tertiary nodes (detail nodes)
    secondaryNodes.forEach((secondaryNode, index) => {
        if (Math.random() > 0.6) { // Only some secondary nodes have tertiary
            const distance = 0.6 + Math.random() * 0.3;
            const angle = Math.random() * Math.PI * 2;
            
            const tertiaryPos = {
                x: secondaryNode.position.x + Math.cos(angle) * distance,
                y: secondaryNode.position.y + (Math.random() - 0.5) * 0.5,
                z: secondaryNode.position.z + Math.sin(angle) * distance
            };
            
            const node = createNode(0.08, colors.tertiary);
            node.position.set(tertiaryPos.x, tertiaryPos.y, tertiaryPos.z);
            mindMapGroup.add(node);
            
            // Connect to secondary node
            const points = [
                new THREE.Vector3(secondaryNode.position.x, secondaryNode.position.y, secondaryNode.position.z),
                new THREE.Vector3(tertiaryPos.x, tertiaryPos.y, tertiaryPos.z)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ 
                color: colors.secondary, 
                transparent: true,
                opacity: 0.3
            });
            const line = new THREE.Line(geometry, material);
            mindMapGroup.add(line);
        }
    });
    
    // Add some cross-connections between nodes
    for (let i = 0; i < 3; i++) {
        const node1 = primaryNodes[Math.floor(Math.random() * primaryNodes.length)];
        const node2 = primaryNodes[Math.floor(Math.random() * primaryNodes.length)];
        
        if (node1 !== node2) {
            const points = [
                new THREE.Vector3(node1.position.x, node1.position.y, node1.position.z),
                new THREE.Vector3(node2.position.x, node2.position.y, node2.position.z)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ 
                color: colors.tertiary, 
                transparent: true,
                opacity: 0.2
            });
            const line = new THREE.Line(geometry, material);
            mindMapGroup.add(line);
        }
    }
    
    scene.add(mindMapGroup);
    camera.position.z = 6;
    
    // Mouse interaction variables
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth rotation interpolation
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;
        
        // Apply rotation to mind map group
        mindMapGroup.rotation.x = currentRotationX;
        mindMapGroup.rotation.y = currentRotationY;
        
        // Auto-rotation when not interacting
        if (!isMouseDown) {
            targetRotationY += 0.004;
        }
        
        // Animate nodes with gentle pulsing
        mindMapGroup.children.forEach((child, index) => {
            if (child.type === 'Mesh') {
                // Gentle pulsing effect
                const pulse = 1 + Math.sin(Date.now() * 0.002 + index * 0.5) * 0.1;
                child.scale.setScalar(pulse);
                
                // Gentle floating
                child.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Mouse/touch interaction
    function onMouseDown(event) {
        isMouseDown = true;
        canvas.style.cursor = 'grabbing';
    }
    
    function onMouseUp(event) {
        isMouseDown = false;
        canvas.style.cursor = 'grab';
    }
    
    function onMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        const newMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const newMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        if (isMouseDown) {
            targetRotationY += (newMouseX - mouseX) * 2;
            targetRotationX += (newMouseY - mouseY) * 2;
        } else {
            // Subtle hover effect
            targetRotationY += (newMouseX - mouseX) * 0.1;
            targetRotationX += (newMouseY - mouseY) * 0.1;
        }
        
        mouseX = newMouseX;
        mouseY = newMouseY;
    }
    
    // Add event listeners
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseUp);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isMouseDown = true;
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        isMouseDown = false;
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const newMouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const newMouseY = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        
        if (isMouseDown) {
            targetRotationY += (newMouseX - mouseX) * 2;
            targetRotationX += (newMouseY - mouseY) * 2;
        }
        
        mouseX = newMouseX;
        mouseY = newMouseY;
    });
    
    // Set cursor style
    canvas.style.cursor = 'grab';
    
    // Handle resize
    function handleResize() {
        if (!container) return;
        
        const newWidth = container.offsetWidth;
        const newHeight = container.offsetHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    }
    
    window.addEventListener('resize', handleResize);
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Floating Pixel Animation =====
function animateFloatingPixels() {
    const pixels = document.querySelectorAll('.pixel-cube');
    
    pixels.forEach((pixel, index) => {
        const baseDelay = index * 2;
        const randomDelay = Math.random() * 4;
        pixel.style.animationDelay = `${baseDelay + randomDelay}s`;
        
        // Add random drift
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            pixel.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + Math.random() * 2000);
    });
}

// ===== Button Ripple Effect =====
function addRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .nav-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== Card Hover Effects =====
function initCardEffects() {
    const cards = document.querySelectorAll('.problem-card, .advantage-card, .showcase-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--light-bg);
                color: var(--text-primary);
                padding: 1rem 1.5rem;
                border-radius: 8px;
                border-left: 4px solid var(--primary-color);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 10001;
                animation: slideInRight 0.3s ease;
                max-width: 350px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 0;
                margin-left: auto;
                opacity: 0.7;
                transition: opacity 0.2s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Make showNotification globally available
window.showNotification = showNotification;

// ===== Scroll Animations =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.problem-card, .advantage-card, .showcase-card, .tech-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ===== Performance Optimization =====
function optimizePerformance() {
    // Reduce animations on slower devices
    const isSlowDevice = navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4;
    
    if (isSlowDevice) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Disable some animations
        const heavyAnimations = document.querySelectorAll('.rotating-cube, .pixel-3d-model');
        heavyAnimations.forEach(el => {
            el.style.animation = 'none';
        });
    }
}

// ===== Initialize Everything =====
function initializeApp() {
    try {
        initMobileMenu();
        updateActiveNavLink();
        init3DBrain();
        initSmoothScrolling();
        animateFloatingPixels();
        addRippleEffect();
        initCardEffects();
        initScrollAnimations();
        optimizePerformance();
        
        // Add CSS for ripple effect
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .cta-button, .nav-cta {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
        
        console.log('PixelMind Explainer initialized successfully!');
    } catch (error) {
        console.error('Error initializing PixelMind Explainer:', error);
    }
}

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', initializeApp);

// ===== Handle Page Visibility =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause heavy animations when tab is not visible
        if (renderer) {
            renderer.setAnimationLoop(null);
        }
    } else {
        // Resume animations when tab is visible
        if (renderer && scene && camera) {
            renderer.setAnimationLoop(() => {
                renderer.render(scene, camera);
            });
        }
    }
});

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ===== Analytics Ready =====
window.pixelmindReady = true; 