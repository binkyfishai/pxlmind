// Features page specific JavaScript

// Animate feature blocks on scroll
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger specific animations for demo elements
            if (entry.target.querySelector('.ai-demo-container')) {
                setTimeout(() => {
                    entry.target.querySelector('.processing-animation').classList.add('active');
                }, 500);
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all feature blocks
document.querySelectorAll('.feature-block').forEach(block => {
    featureObserver.observe(block);
});

// Interactive cube mouse tracking
const interactiveCube = document.querySelector('.interactive-cube');
if (interactiveCube) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        const rect = interactiveCube.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        mouseX = (e.clientX - centerX) / 5;
        mouseY = (e.clientY - centerY) / 5;
    });
    
    function animateCube() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        interactiveCube.style.transform = `rotateX(${-currentY}deg) rotateY(${currentX}deg)`;
        
        requestAnimationFrame(animateCube);
    }
    
    animateCube();
}

// Mockup interface demo
const mockupInput = document.querySelector('.mockup-input');
const mockupButton = document.querySelector('.mockup-button');
const mockObject = document.querySelector('.mock-object');

if (mockupButton) {
    mockupButton.addEventListener('click', () => {
        mockObject.style.animation = 'none';
        setTimeout(() => {
            mockObject.style.animation = 'rotate-3d 10s linear infinite, pulse 0.5s ease-out';
        }, 10);
        
        // Show a brief flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 255, 204, 0.3);
            animation: flashFade 0.5s ease-out forwards;
        `;
        mockObject.parentElement.appendChild(flash);
        
        setTimeout(() => flash.remove(), 500);
    });
}

// Add flash animation
const flashStyle = document.createElement('style');
flashStyle.textContent = `
    @keyframes flashFade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .feature-block {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }
    
    .feature-block.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .processing-animation.active .processing-dot {
        animation: processingPulse 1.5s ease-in-out infinite;
    }
`;
document.head.appendChild(flashStyle);

// Pixel grid hover effect
const pixelCells = document.querySelectorAll('.pixel-cell');
pixelCells.forEach(cell => {
    cell.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.2)';
        this.style.zIndex = '10';
    });
    
    cell.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
    });
});

// Building blocks stagger animation on hover
const buildingBlocks = document.querySelector('.building-blocks');
if (buildingBlocks) {
    buildingBlocks.addEventListener('mouseover', () => {
        const blocks = buildingBlocks.querySelectorAll('.block');
        blocks.forEach((block, index) => {
            block.style.animationDelay = `${index * 0.1}s`;
        });
    });
} 