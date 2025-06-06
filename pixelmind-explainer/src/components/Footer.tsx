import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const pixelColors = ['#165DFF', '#36D399', '#FF6B9B', '#FFD700', '#FF4500'];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="pixel-logo">
                  {Array.from({length: 9}, (_, i) => (
                    <div
                      key={i}
                      className="pixel"
                      style={{backgroundColor: pixelColors[i % 5]}}
                    ></div>
                  ))}
                </div>
                <span>PixelMind Explainer</span>
              </div>
              <p className="footer-description">
                Illuminate Thoughts, Decode Everything. Pixel by Pixel, Mind by Mind, Explaining Everything.
              </p>
              <div className="footer-mission">
                <h4>Our Mission</h4>
                <p>
                  Harness the power of AI and interactive 3D to enable everyone to easily understand 
                  and spread complex knowledge, igniting sparks of thought.
                </p>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>Platform</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/features">Core Features</Link></li>
                  <li><Link to="/showcases">Showcases</Link></li>
                  <li><Link to="/technology">Technology</Link></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Resources</h4>
                <ul>
                  <li><Link to="/roadmap">Roadmap</Link></li>
                  <li><Link to="/insights">Insights</Link></li>
                  <li><Link to="/documentation">Documentation</Link></li>
                  <li><Link to="/api">API Reference</Link></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Community</h4>
                <ul>
                  <li><a href="https://discord.gg/pixelmind">Discord</a></li>
                  <li><a href="https://github.com/pixelmind">GitHub</a></li>
                  <li><Link to="/discussions">Discussions</Link></li>
                  <li><Link to="/contribute">Contribute</Link></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Contact</h4>
                <ul>
                  <li><a href="mailto:hello@pixelmind.ai">hello@pixelmind.ai</a></li>
                  <li><a href="mailto:support@pixelmind.ai">support@pixelmind.ai</a></li>
                  <li><Link to="/partnerships">Partnerships</Link></li>
                  <li><Link to="/press">Press Inquiries</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-legal">
              <p>&copy; 2025 PixelMind Explainer. All rights reserved.</p>
              <div className="footer-legal-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Use</Link>
                <Link to="/cookies">Cookie Policy</Link>
              </div>
            </div>

            <div className="footer-social">
              <h4>Follow Our Journey</h4>
              <div className="social-links">
                <a href="https://twitter.com/pixelmind" className="social-link">
                  <span>🐦</span>
                  <span>Twitter</span>
                </a>
                <a href="https://linkedin.com/company/pixelmind" className="social-link">
                  <span>💼</span>
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/pixelmind" className="social-link">
                  <span>💻</span>
                  <span>GitHub</span>
                </a>
                <a href="https://youtube.com/pixelmind" className="social-link">
                  <span>📺</span>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-pattern">
            <div className="pattern-grid">
              {Array.from({length: 50}, (_, i) => (
                <div
                  key={i}
                  className="pattern-dot"
                  style={{
                    backgroundColor: pixelColors[i % 5],
                    opacity: Math.random() * 0.5 + 0.1,
                    animationDelay: `${(i * 0.1) % 5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 