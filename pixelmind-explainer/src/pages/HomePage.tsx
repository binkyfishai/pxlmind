import React from 'react';

const HomePage: React.FC = () => {
  // Exact color palette from design specification
  const pixelColors = ['#165DFF', '#36D399', '#FF6B9B', '#FFD700', '#FF4500'];
  
  return (
    <>
      {/* Hero Section - Exact text from design spec */}
      <main className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Complex Concepts? AI Parses Them in 3D.</h1>
            <p>
              AI-driven interactive 3D explainer that transforms abstract knowledge 
              into vivid, intuitive, and explorable pixelated scenarios.
            </p>
            <div className="button-group">
              <button className="primary-button">Experience Now</button>
              <button className="secondary-button">Watch Demo</button>
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
            </div>
          </div>
        </div>
      </main>

      {/* The Barrier to Understanding - Exact title from design spec */}
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

      {/* PixelMind's Solution - Exact title from design spec */}
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
                <div className="interactive-3d">
                  <div className="dna-helix">
                    {Array.from({length: 20}, (_, i) => (
                      <div key={i} className="nucleotide" style={{
                        backgroundColor: pixelColors[i % 4],
                        animationDelay: `${i * 0.1}s`
                      }}></div>
                    ))}
                  </div>
                  <div className="interaction-hint">👆 Interactive 3D Model</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose PixelMind? - Exact advantages from design spec */}
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

      {/* Featured Showcases Preview - Design spec examples */}
      <section className="featured-showcases">
        <div className="container">
          <h2>Featured Showcases Preview</h2>
          <div className="showcases-grid">
            <div className="showcase-card">
              <div className="showcase-visual">
                <div className="cell-division">
                  {Array.from({length: 8}, (_, i) => (
                    <div key={i} className="cell" style={{
                      backgroundColor: '#165DFF',
                      animationDelay: `${i * 0.2}s`
                    }}></div>
                  ))}
                </div>
              </div>
              <h3>Life Science Perspective</h3>
              <p>Interactive cell mitosis process</p>
            </div>
            <div className="showcase-card">
              <div className="showcase-visual">
                <div className="heart-pump">
                  <div className="heart-chamber" style={{ backgroundColor: '#36D399' }}></div>
                  <div className="blood-flow"></div>
                </div>
              </div>
              <h3>Technical Principle Analysis</h3>
              <p>3D cardiovascular system demo</p>
            </div>
            <div className="showcase-card">
              <div className="showcase-visual">
                <div className="data-packets">
                  {Array.from({length: 6}, (_, i) => (
                    <div key={i} className="packet" style={{
                      backgroundColor: '#FFD700',
                      animationDelay: `${i * 0.3}s`
                    }}></div>
                  ))}
                </div>
              </div>
              <h3>Knowledge Popularization Paradise</h3>
              <p>Network packet visualization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Empowerment (Brief Version) */}
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