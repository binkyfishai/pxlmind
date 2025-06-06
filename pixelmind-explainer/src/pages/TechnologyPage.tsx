import React, { useEffect, useRef } from 'react';

const TechnologyPage: React.FC = () => {
  const particleSystemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (particleSystemRef.current) {
      const container = particleSystemRef.current;
      const particles = Array.from({ length: 5 }, (_, i) => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 80}%`;
        particle.style.top = `${Math.random() * 80}%`;
        return particle;
      });
      
      particles.forEach(particle => container.appendChild(particle));

      return () => {
        particles.forEach(particle => particle.remove());
      };
    }
  }, []);

  return (
    <div className="technology-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Technology</h1>
          <p>Discover the innovative technology powering PixelMind's interactive experiences</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>AI-Powered Visualization</h2>
          <div className="text-content">
            <p>
              <strong>PixelMind's core technology</strong> combines advanced AI algorithms with real-time 
              3D rendering to transform complex concepts into intuitive visual experiences. Our system 
              analyzes content semantically and generates interactive 3D representations that best 
              convey the underlying ideas.
            </p>
            <div className="text-highlight">
              <p>
                "We believe that seeing and interacting with knowledge in 3D space creates deeper 
                understanding and more memorable learning experiences."
              </p>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h4>🧠 AI Understanding</h4>
              <p>Natural language processing and semantic analysis to understand content meaning</p>
            </div>
            <div className="info-card">
              <h4>🎨 Visual Synthesis</h4>
              <p>AI-driven generation of appropriate visual metaphors and representations</p>
            </div>
            <div className="info-card">
              <h4>🔄 Real-time Rendering</h4>
              <p>High-performance 3D engine for smooth interactive experiences</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Interactive Design Philosophy</h2>
          <div className="text-content">
            <h3>User-Centric Approach</h3>
            <p>
              Our interactive design philosophy puts users first, ensuring that complex 
              concepts become accessible through intuitive interactions and clear visual feedback.
            </p>
            <ul>
              <li>Natural and intuitive controls for users of all skill levels</li>
              <li>Progressive disclosure of advanced features</li>
              <li>Consistent interaction patterns across the platform</li>
              <li>Real-time visual feedback for all user actions</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Technical Architecture</h2>
          <div className="text-content">
            <h3>Core Components</h3>
            <p>
              <strong>PixelMind's architecture</strong> is built on three main pillars that work 
              together seamlessly to deliver powerful interactive experiences:
            </p>
            <ul>
              <li>AI Module for content analysis and visual mapping</li>
              <li>3D Rendering Engine for high-performance visualization</li>
              <li>Interaction Layer for smooth user engagement</li>
            </ul>
            
            <h3>Performance Optimization</h3>
            <p>
              Our system employs advanced optimization techniques to ensure smooth performance 
              across different devices and platforms:
            </p>
            <ul>
              <li>Dynamic level-of-detail adjustments</li>
              <li>Intelligent resource management</li>
              <li>Progressive loading for large datasets</li>
              <li>Hardware-accelerated rendering</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Future Developments</h2>
          <div className="text-content">
            <p>
              We're constantly pushing the boundaries of what's possible with interactive 
              visualization. Our upcoming features include:
            </p>
            <div className="info-grid">
              <div className="info-card">
                <h4>🌐 Collaborative Spaces</h4>
                <p>Multi-user interactive environments for shared learning experiences</p>
              </div>
              <div className="info-card">
                <h4>📱 AR Integration</h4>
                <p>Augmented reality features for blending digital and physical learning</p>
              </div>
              <div className="info-card">
                <h4>🤖 Advanced AI</h4>
                <p>Enhanced AI capabilities for more sophisticated content understanding</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-module">
        <div className="container">
          <h2>Intelligent Core - AI Module</h2>
          <div className="ai-content">
            <div className="ai-info">
              <h3>From Keywords to Advanced NLP</h3>
              <div className="current-status">
                <h4>Current Status:</h4>
                <ul>
                  <li>Keyword-based concept extraction</li>
                  <li>Basic semantic understanding</li>
                  <li>Template-driven 3D generation</li>
                  <li>Rule-based interaction patterns</li>
                </ul>
              </div>
              <div className="future-plans">
                <h4>Future Plans:</h4>
                <ul>
                  <li>Advanced transformer-based NLP models</li>
                  <li>Contextual understanding and reasoning</li>
                  <li>Multi-modal input processing</li>
                  <li>Personalized explanation strategies</li>
                </ul>
              </div>
            </div>
            <div className="ai-flowchart">
              <h3>AI Processing Pipeline</h3>
              <div className="flowchart">
                <div className="flow-step">
                  <div className="step-icon">📝</div>
                  <h4>User Input</h4>
                  <p>Natural language query</p>
                </div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">
                  <div className="step-icon">🧠</div>
                  <h4>PixelMind AI Analysis</h4>
                  <p>Concept extraction & understanding</p>
                </div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">
                  <div className="step-icon">⚙️</div>
                  <h4>3D Scene Instructions</h4>
                  <p>Structured visualization data</p>
                </div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">
                  <div className="step-icon">🎮</div>
                  <h4>Interactive 3D Scene</h4>
                  <p>Rendered pixelated explanation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rendering-engine">
        <div className="container">
          <h2>Visual Presentation - 3D Rendering Engine</h2>
          <div className="engine-content">
            <div className="engine-info">
              <h3>Based on Three.js</h3>
              <p>Our rendering engine leverages the power of Three.js for high-performance 3D graphics in the browser.</p>
              <div className="engine-features">
                <div className="feature-item">
                  <h4>🎯 WebGL Acceleration</h4>
                  <p>Hardware-accelerated graphics for smooth performance</p>
                </div>
                <div className="feature-item">
                  <h4>📦 Modular Components</h4>
                  <p>Reusable 3D objects and materials library</p>
                </div>
                <div className="feature-item">
                  <h4>⚡ Real-time Rendering</h4>
                  <p>Dynamic scene updates and interactions</p>
                </div>
                <div className="feature-item">
                  <h4>🎨 Pixel Art Style</h4>
                  <p>Custom shaders for unique visual identity</p>
                </div>
              </div>
            </div>
            <div className="pixel-component-library">
              <h3>Pixel Component Library</h3>
              <div className="component-grid">
                <div className="component-item">
                  <div className="component-visual basic-cube"></div>
                  <span>Basic Cube</span>
                </div>
                <div className="component-item">
                  <div className="component-visual organic-sphere"></div>
                  <span>Organic Sphere</span>
                </div>
                <div className="component-item">
                  <div className="component-visual connector-tube"></div>
                  <span>Connector Tube</span>
                </div>
                <div className="component-item">
                  <div className="component-visual particle-system" ref={particleSystemRef}></div>
                  <span>Particle System</span>
                </div>
                <div className="component-item">
                  <div className="component-visual animated-gear"></div>
                  <span>Animated Gear</span>
                </div>
                <div className="component-item">
                  <div className="component-visual flow-arrow"></div>
                  <span>Flow Arrow</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="procedural-generation">
            <h3>Procedural Generation Logic</h3>
            <div className="generation-steps">
              <div className="step">
                <h4>1. Concept Analysis</h4>
                <p>AI identifies key components and relationships</p>
              </div>
              <div className="step">
                <h4>2. Component Selection</h4>
                <p>Choose appropriate 3D elements from library</p>
              </div>
              <div className="step">
                <h4>3. Layout Generation</h4>
                <p>Arrange components in meaningful spatial relationships</p>
              </div>
              <div className="step">
                <h4>4. Animation Binding</h4>
                <p>Add interactive behaviors and temporal sequences</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pixel-style-advantages">
        <div className="container">
          <h2>Advantages of Pixel/Simplified Style</h2>
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="advantage-icon">🪶</div>
              <h3>Lightweight</h3>
              <p>Reduced polygon count means faster loading and better performance across all devices</p>
              <div className="metric">
                <span className="metric-value">75%</span>
                <span className="metric-label">Smaller file sizes</span>
              </div>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">⚡</div>
              <h3>Efficient</h3>
              <p>Optimized rendering pipeline ensures smooth 60fps performance even on mobile devices</p>
              <div className="metric">
                <span className="metric-value">60fps</span>
                <span className="metric-label">Consistent performance</span>
              </div>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🎨</div>
              <h3>Unique Style</h3>
              <p>Distinctive visual identity that enhances brand recognition and user engagement</p>
              <div className="metric">
                <span className="metric-value">95%</span>
                <span className="metric-label">Brand recognition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="interaction-design">
        <div className="container">
          <h2>Interactive Design Philosophy</h2>
          <div className="philosophy-content">
            <div className="philosophy-item">
              <h3>🎯 User-Friendly</h3>
              <p>Intuitive controls that feel natural to users of all technical backgrounds</p>
              <ul>
                <li>Familiar mouse and touch interactions</li>
                <li>Visual feedback for all user actions</li>
                <li>Consistent interaction patterns</li>
              </ul>
            </div>
            <div className="philosophy-item">
              <h3>🚪 Low Threshold</h3>
              <p>Minimal learning curve with progressive disclosure of advanced features</p>
              <ul>
                <li>Basic functionality immediately accessible</li>
                <li>Advanced features revealed contextually</li>
                <li>Built-in tutorials and guidance</li>
              </ul>
            </div>
            <div className="philosophy-item">
              <h3>🧭 Guided Exploration</h3>
              <p>Structured discovery paths that encourage meaningful interaction</p>
              <ul>
                <li>Contextual hints and suggestions</li>
                <li>Progressive complexity introduction</li>
                <li>Multiple exploration pathways</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="data-structure">
        <div className="container">
          <h2>Content & Data Structure</h2>
          <div className="data-content">
            <div className="structure-info">
              <h3>Storage Methods</h3>
              <p>Efficient data organization for concept definitions, component information, and interaction logic.</p>
            </div>
            <div className="data-example">
              <h4>Example JSON Structure:</h4>
              <div className="code-block">
                <pre>{`{
  "concept": "photosynthesis",
  "components": [
    {
      "id": "chloroplast",
      "type": "organelle",
      "position": [0, 0, 0],
      "interactions": ["rotate", "zoom", "highlight"],
      "annotations": {
        "title": "Chloroplast",
        "description": "Site of photosynthesis"
      }
    }
  ],
  "animations": [
    {
      "trigger": "timeline",
      "sequence": "light-reaction",
      "duration": 5000
    }
  ],
  "interactions": {
    "rotate": { "enabled": true, "axis": "all" },
    "zoom": { "min": 0.5, "max": 3.0 }
  }
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="system-architecture">
        <div className="container">
          <h2>Simplified System Architecture</h2>
          <div className="architecture-diagram">
            <div className="architecture-layer frontend">
              <h3>Frontend Layer</h3>
              <div className="layer-components">
                <div className="component">React UI</div>
                <div className="component">Three.js Renderer</div>
                <div className="component">Interaction Controls</div>
              </div>
            </div>
            <div className="architecture-layer api">
              <h3>API Layer</h3>
              <div className="layer-components">
                <div className="component">REST API</div>
                <div className="component">WebSocket</div>
                <div className="component">Authentication</div>
              </div>
            </div>
            <div className="architecture-layer backend">
              <h3>Backend Services</h3>
              <div className="layer-components">
                <div className="component">AI Engine</div>
                <div className="component">Content Manager</div>
                <div className="component">Analytics</div>
              </div>
            </div>
            <div className="architecture-layer data">
              <h3>Data Layer</h3>
              <div className="layer-components">
                <div className="component">Content Database</div>
                <div className="component">User Analytics</div>
                <div className="component">Asset Storage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="openness-innovation">
        <div className="container">
          <h2>Openness & Innovation</h2>
          <div className="innovation-content">
            <div className="tech-choices">
              <h3>Our Technology Choices</h3>
              <div className="choice-grid">
                <div className="choice-item">
                  <h4>🌐 Web-First Approach</h4>
                  <p>Universal accessibility without app downloads</p>
                </div>
                <div className="choice-item">
                  <h4>⚡ Modern Web Standards</h4>
                  <p>WebGL, WebAssembly, and Progressive Web Apps</p>
                </div>
                <div className="choice-item">
                  <h4>🔗 API-Driven Architecture</h4>
                  <p>Enables third-party integrations and extensions</p>
                </div>
                <div className="choice-item">
                  <h4>🛠️ Modular Design</h4>
                  <p>Easily extensible component library</p>
                </div>
              </div>
            </div>
            
            <div className="future-visions">
              <h3>Future Visions</h3>
              <div className="vision-timeline">
                <div className="vision-item">
                  <div className="vision-year">2024</div>
                  <h4>AI-Powered Personalization</h4>
                  <p>Adaptive learning paths based on user behavior</p>
                </div>
                <div className="vision-item">
                  <div className="vision-year">2025</div>
                  <h4>AR/VR Integration</h4>
                  <p>Immersive 3D explanations in virtual space</p>
                </div>
                <div className="vision-item">
                  <div className="vision-year">2026</div>
                  <h4>Collaborative Learning</h4>
                  <p>Multi-user shared 3D explanation spaces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage; 