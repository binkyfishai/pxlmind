import React from 'react';

const FeaturesPage: React.FC = () => {
  return (
    <div className="features-page">
      <section className="page-hero">
        <div className="container">
          <h1>PixelMind Explainer: Unlock Powerful Functions for Efficient Cognition</h1>
          <p>Discover the advanced capabilities that make complex learning simple and engaging.</p>
        </div>
      </section>

      <section className="feature-details">
        <div className="container">
          <div className="feature-detail">
            <div className="feature-content">
              <div className="feature-info">
                <h2>AI-Driven Semantic Understanding</h2>
                <p>Natural language input, AI accurately captures core concepts.</p>
                <ul>
                  <li>Advanced NLP processing for concept extraction</li>
                  <li>Context-aware interpretation of complex topics</li>
                  <li>Multi-language support for global accessibility</li>
                  <li>Real-time semantic analysis and optimization</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="ai-brain">
                  <div className="neural-network">
                    {Array.from({length: 12}, (_, i) => (
                      <div key={i} className="neuron" style={{
                        backgroundColor: '#165DFF',
                        animationDelay: `${i * 0.1}s`
                      }}></div>
                    ))}
                  </div>
                  <div className="data-flow">
                    {Array.from({length: 6}, (_, i) => (
                      <div key={i} className="data-bit" style={{
                        backgroundColor: '#60A5FA',
                        animationDelay: `${i * 0.2}s`
                      }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-detail reverse">
            <div className="feature-content">
              <div className="feature-info">
                <h2>Dynamic 3D Scene Construction</h2>
                <p>Real-time generation of modular pixel/simplified 3D models.</p>
                <ul>
                  <li>Procedural 3D model generation</li>
                  <li>Modular component-based architecture</li>
                  <li>Real-time rendering optimization</li>
                  <li>Adaptive detail levels for performance</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="scene-construction">
                  <div className="building-blocks">
                    {Array.from({length: 9}, (_, i) => (
                      <div key={i} className="block" style={{
                        backgroundColor: ['#165DFF', '#36D399', '#FBBF24'][i % 3],
                        transform: `translate(${(i % 3) * 30}px, ${Math.floor(i / 3) * 30}px)`,
                        animationDelay: `${i * 0.1}s`
                      }}></div>
                    ))}
                  </div>
                  <div className="assembly-indicator">
                    <span>🔧 Real-time Assembly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-detail">
            <div className="feature-content">
              <div className="feature-info">
                <h2>Omnidirectional Interactive Experience</h2>
                <p>Rotate, zoom, click annotations, trigger animations, decompose and combine.</p>
                <ul>
                  <li>360° rotation and inspection</li>
                  <li>Multi-level zoom capabilities</li>
                  <li>Interactive annotations and labels</li>
                  <li>Animation timeline controls</li>
                  <li>Component decomposition views</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="interaction-demo">
                  <div className="orbit-controls">
                    <div className="center-object"></div>
                    <div className="orbit-path">
                      <div className="control-point rotate"></div>
                      <div className="control-point zoom"></div>
                      <div className="control-point pan"></div>
                    </div>
                  </div>
                  <div className="interaction-hints">
                    <span>🖱️ Drag to Rotate</span>
                    <span>🔍 Scroll to Zoom</span>
                    <span>👆 Click to Annotate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-detail reverse">
            <div className="feature-content">
              <div className="feature-info">
                <h2>Efficient Pixelated Style</h2>
                <p>Balances aesthetics, performance, and information transmission efficiency.</p>
                <ul>
                  <li>Optimized rendering pipeline</li>
                  <li>Distinctive visual identity</li>
                  <li>Reduced computational overhead</li>
                  <li>Enhanced visual clarity</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="pixel-efficiency">
                  <div className="pixel-grid">
                    {Array.from({length: 16}, (_, i) => (
                      <div key={i} className="efficiency-pixel" style={{
                        backgroundColor: i % 2 === 0 ? '#165DFF' : '#60A5FA',
                        animationDelay: `${i * 0.05}s`
                      }}></div>
                    ))}
                  </div>
                  <div className="performance-meter">
                    <div className="meter-bar" style={{ width: '90%' }}></div>
                    <span>90% Efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-detail">
            <div className="feature-content">
              <div className="feature-info">
                <h2>Personalized Learning Path (Future)</h2>
                <p>Adjusts explanation strategies based on user feedback.</p>
                <ul>
                  <li>Adaptive difficulty levels</li>
                  <li>Learning style preferences</li>
                  <li>Progress tracking and analytics</li>
                  <li>Intelligent content recommendations</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="learning-path">
                  <div className="path-nodes">
                    {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level, i) => (
                      <div key={level} className="path-node" style={{
                        backgroundColor: i <= 1 ? '#36D399' : '#165DFF',
                        animationDelay: `${i * 0.2}s`
                      }}>
                        <span>{level}</span>
                      </div>
                    ))}
                  </div>
                  <div className="adaptation-indicator">
                    <span>🎯 Adaptive Learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-detail reverse">
            <div className="feature-content">
              <div className="feature-info">
                <h2>Seamless Cross-Device Access</h2>
                <p>Web-based application, compatible with multiple platforms.</p>
                <ul>
                  <li>Responsive design for all screen sizes</li>
                  <li>Progressive Web App capabilities</li>
                  <li>Cloud synchronization</li>
                  <li>Offline functionality</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="device-compatibility">
                  <div className="devices">
                    <div className="device desktop">💻</div>
                    <div className="device tablet">📱</div>
                    <div className="device mobile">📱</div>
                  </div>
                  <div className="sync-indicator">
                    <div className="sync-wave"></div>
                    <span>☁️ Cloud Sync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-detail">
            <div className="feature-content">
              <div className="feature-info">
                <h2>Content Creation Friendly</h2>
                <p>Facilitates educators and creators to quickly build teaching materials.</p>
                <ul>
                  <li>Drag-and-drop content builder</li>
                  <li>Template library</li>
                  <li>Export and sharing tools</li>
                  <li>Collaboration features</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="content-creation">
                  <div className="creation-tools">
                    <div className="tool" title="Add Object">➕</div>
                    <div className="tool" title="Edit">✏️</div>
                    <div className="tool" title="Share">📤</div>
                    <div className="tool" title="Save">💾</div>
                  </div>
                  <div className="creation-canvas">
                    <div className="canvas-element" style={{ backgroundColor: '#165DFF' }}></div>
                    <div className="canvas-element" style={{ backgroundColor: '#36D399' }}></div>
                    <div className="canvas-element" style={{ backgroundColor: '#FBBF24' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="interface-overview">
        <div className="container">
          <h2>Overview of PixelMind Explainer Interface</h2>
          <div className="interface-mockup">
            <div className="interface-section input-panel">
              <h3>User Input</h3>
              <div className="input-demo">
                <div className="search-bar">
                  <span>🔍 "Explain photosynthesis process"</span>
                </div>
                <div className="voice-input">
                  <span>🎤 Voice Input</span>
                </div>
              </div>
            </div>
            <div className="interface-section interaction-window">
              <h3>3D Interaction Window</h3>
              <div className="window-demo">
                <div className="viewport">
                  <div className="scene-objects">
                    {Array.from({length: 8}, (_, i) => (
                      <div key={i} className="scene-object" style={{
                        backgroundColor: ['#165DFF', '#36D399', '#FBBF24', '#F472B6'][i % 4],
                        animationDelay: `${i * 0.1}s`
                      }}></div>
                    ))}
                  </div>
                  <div className="controls-overlay">
                    <span>🔄 Rotate | 🔍 Zoom | 👆 Click</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="interface-section info-panel">
              <h3>Information Panel</h3>
              <div className="info-demo">
                <div className="info-item">
                  <span className="info-label">Process Step:</span>
                  <span className="info-value">Light Absorption</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Components:</span>
                  <span className="info-value">Chlorophyll, ATP</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">Continuous</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage; 