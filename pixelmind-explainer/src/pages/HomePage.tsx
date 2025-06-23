import React from 'react';
import FanDemo from '../components/demos/FanDemo';
import DNADemo from '../components/demos/DNADemo';
import ParticleDemo from '../components/demos/ParticleDemo';
import WaveDemo from '../components/demos/WaveDemo';

interface ShowcaseInfo {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  hint: string;
}

// Black Hole Demo Component
const BlackHoleDemo: React.FC = () => {
  return (
    <div className="demo-container" style={{ width: '100%', height: '300px', position: 'relative' }}>
      <iframe
        src="/black-hole.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px',
          background: '#000'
        }}
        title="Black Hole Simulation"
      />
    </div>
  );
};

const HomePage: React.FC = () => {
  const pixelColors = ['#165DFF', '#36D399', '#FF6B9B', '#FFD700', '#FF4500'];

  const showcases: ShowcaseInfo[] = [
    {
      id: 'engineering',
      title: 'Engineering Visualization',
      description: 'Interactive 3D fan mechanism',
      component: <FanDemo />,
      hint: '🖱️ Drag to rotate | 🔍 Scroll to zoom'
    },
    {
      id: 'particle-physics',
      title: 'Particle Physics',
      description: 'Dynamic particle system simulation',
      component: <ParticleDemo />,
      hint: '🎮 Interactive particle flow | 🔄 Auto-rotating'
    },
    {
      id: 'wave-mechanics',
      title: 'Wave Mechanics',
      description: 'Interactive wave propagation',
      component: <WaveDemo />,
      hint: '👆 Click to create waves | 🌊 Watch propagation'
    },
    {
      id: 'molecular-biology',
      title: 'Molecular Biology',
      description: 'DNA structure exploration',
      component: <DNADemo containerId="dna-demo-showcase" />,
      hint: '🧬 Explore DNA structure | 🔄 Rotate to inspect'
    },
    {
      id: 'black-hole-physics',
      title: 'Black Hole Physics',
      description: 'Simulating matter at the edge of a black hole being sucked in - visualize particle-like matter dynamics to understand celestial phenomena',
      component: <BlackHoleDemo />,
      hint: '🌌 Drag to orbit | 🔍 Zoom to observe accretion disk'
    }
  ];

  const handleExperienceNow = () => {
    window.open('https://pixelmindpro.com/embed.html', '_blank');
  };

  return (
    <>
      {/* Hero Section */}
      <main className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Complex Concepts? AI Parses Them in 3D.</h1>
            <p>
              AI-driven interactive 3D explainer that transforms abstract knowledge 
              into vivid, intuitive, and explorable pixelated scenarios.
            </p>
            <div className="button-group">
              <button className="primary-button experience-now-btn" onClick={handleExperienceNow}>
                <span className="btn-icon">🚀</span>
                Experience Now
                <span className="btn-glow"></span>
              </button>
              <button className="secondary-button">
                <span className="btn-icon">▶️</span>
                Watch Demo
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="brain-container">
              <div className="pixel-brain">
                {Array.from({length: 50}, (_, i) => (
                  <div 
                    key={i} 
                    className="brain-pixel" 
                    style={{
                      backgroundColor: pixelColors[i % 5],
                      animationDelay: `${i * 0.1}s`,
                      borderRadius: '3px'
                    }}
                  ></div>
                ))}
              </div>
              <div className="brain-aura"></div>
            </div>
          </div>
        </div>
      </main>

      {/* AI-Generated Example Section */}
      <section className="ai-example">
        <div className="container">
          <h2>AI-Generated 3D Visualization Example</h2>
          <p className="section-subtitle">
            When we enter the prompt: <em>"Simulating the matter at the edge of a black hole being sucked into the black hole"</em>, 
            we can quickly generate a vivid 3D model.
          </p>
          
          <div className="example-showcase">
            <div className="example-visual">
              <BlackHoleDemo />
            </div>
            <div className="example-description">
              <h3>🌌 Black Hole Accretion Simulation</h3>
              <p>
                We can see that the particle-like matter is sucked into the black hole. 
                We can use it to understand some physical celestial phenomena.
              </p>
              <div className="example-features">
                <div className="feature-point">
                  <span className="feature-bullet">✨</span>
                  <p>Real-time particle dynamics simulation</p>
                </div>
                <div className="feature-point">
                  <span className="feature-bullet">🎯</span>
                  <p>Accurate gravitational physics modeling</p>
                </div>
                <div className="feature-point">
                  <span className="feature-bullet">🎨</span>
                  <p>Color-coded matter temperature visualization</p>
                </div>
              </div>
              <div className="example-cta">
                <p className="cta-text">
                  <strong>Save your work as an HTML file and integrate it into your courseware.</strong> 
                  We will also release a 3D editor to help you fine-tune the animation.
                </p>
                <button className="primary-button" onClick={handleExperienceNow}>
                  <span className="btn-icon">🚀</span>
                  Try Creating Your Own
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="problem-statement">
        <div className="container">
          <h2>Still Struggling with Abstract Information?</h2>
          <p>Traditional text and 2D images fail to explain complex dynamic concepts effectively.</p>
          <div className="problem-grid">
            <div className="problem-item">
              <span className="problem-icon">📚</span>
              <p>Static textbooks can't show dynamic processes</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">🖼️</span>
              <p>2D images lack depth and interaction</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">🧠</span>
              <p>Complex concepts remain abstract and hard to grasp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution">
        <div className="container">
          <h2>PixelMind Explainer: AI-Driven, 3D Insight</h2>
          <p>Our product uses AI to understand user needs and generate interactive 3D scenarios.</p>
          <div className="solution-demo">
            <div className="demo-card">
              <h3>Before: Traditional Learning</h3>
              <div className="demo-visual traditional">
                <div className="static-text">
                  <p>DNA Replication Process:</p>
                  <ol>
                    <li>Helicase unwinds the double helix</li>
                    <li>DNA polymerase adds nucleotides</li>
                    <li>Ligase joins Okazaki fragments</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="demo-card">
              <h3>After: PixelMind 3D</h3>
              <div className="demo-visual pixelmind">
                <DNADemo containerId="dna-demo-solution" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose PixelMind?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>AI-Powered Parsing</h3>
              <p>Intelligent understanding, precise presentation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Immersive 3D Exploration</h3>
              <p>Dynamic interaction, deepened memory.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Visualization</h3>
              <p>Fast generation, no waiting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Simplification</h3>
              <p>Complex concepts, clear comprehension.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Showcases */}
      <section className="featured-showcases">
        <div className="container">
          <h2>Featured Showcases Preview</h2>
          <div className="showcases-grid">
            {showcases.map((showcase) => (
              <div key={showcase.id} className="showcase-card">
                <div className="showcase-visual">
                  {showcase.component}
                  <div className="interaction-hint">{showcase.hint}</div>
                </div>
                <h3>{showcase.title}</h3>
                <p>{showcase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Brief */}
      <section className="technology-brief">
        <div className="container">
          <h2>Technology Empowerment</h2>
          <div className="tech-highlights">
            <div className="tech-item">
              <span className="tech-icon">🤖</span>
              <h3>AI Engine</h3>
              <p>Advanced natural language processing and semantic understanding</p>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🎮</span>
              <h3>Real-time 3D Rendering</h3>
              <p>WebGL-powered visualization with Three.js</p>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🔄</span>
              <h3>Interactive Systems</h3>
              <p>Dynamic user engagement and real-time feedback</p>
            </div>
          </div>
          <div className="tech-cta">
            <button className="primary-button">Explore Technology</button>
            <button className="secondary-button">View Architecture</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage; 