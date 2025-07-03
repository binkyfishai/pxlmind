import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About PixelMind Explainer</h1>
          <p>Illuminating the path to understanding through AI-powered 3D visualization</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Our Mission</h2>
          <div className="text-content">
            <div className="text-highlight">
              <p>
                "Harness the power of AI and interactive 3D to enable everyone to easily understand 
                and spread complex knowledge, igniting sparks of thought."
              </p>
            </div>
            <p>
              <strong>At PixelMind Explainer</strong>, we believe that understanding complex ideas 
              shouldn't be a privilege but a right. Our mission is to break down the barriers between 
              complex knowledge and intuitive understanding, making learning more accessible and 
              engaging for everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Our Story</h2>
          <div className="text-content">
            <h3>The Birth of an Idea</h3>
            <p>
              In a world overwhelmed by information, we recognized a fundamental problem: 
              complex concepts remained trapped in static text and flat images, making 
              true understanding elusive for millions of learners worldwide.
            </p>
            
            <h3>Our Vision</h3>
            <p>
              We envisioned a future where any complex idea could be instantly transformed 
              into an interactive, explorable 3D experience. Where AI would bridge the gap 
              between abstract knowledge and intuitive understanding.
            </p>
            
            <div className="info-grid">
              <div className="info-card">
                <h4>🎯 Our Goal</h4>
                <p>Transform complex knowledge into intuitive, interactive 3D experiences accessible to everyone</p>
              </div>
              <div className="info-card">
                <h4>💡 Our Approach</h4>
                <p>Combine AI intelligence with immersive 3D visualization to create meaningful learning experiences</p>
              </div>
              <div className="info-card">
                <h4>🌟 Our Impact</h4>
                <p>Enable deeper understanding and retention through active exploration and engagement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>The PixelMind Philosophy</h2>
          <div className="text-content">
            <p>
              <strong>Every pixel tells a story.</strong> Every interaction sparks understanding. 
              By combining the precision of artificial intelligence with the intuitive power of 3D 
              visualization, we're not just explaining concepts—we're illuminating the very process 
              of thought itself.
            </p>
            
            <h3>Our Core Values</h3>
            <ul>
              <li>Accessibility - Making complex knowledge available to everyone</li>
              <li>Innovation - Pushing the boundaries of interactive learning</li>
              <li>Engagement - Creating memorable and impactful learning experiences</li>
              <li>Quality - Ensuring accuracy and clarity in every explanation</li>
              <li>Community - Building a global network of knowledge sharing</li>
            </ul>

            <div className="text-highlight">
              <p>
                "We believe that the future of learning is interactive, immersive, and 
                intelligently personalized to each learner's needs."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Join Our Journey</h2>
          <div className="text-content">
            <p>
              We're on a mission to revolutionize how people learn and understand complex 
              concepts. Whether you're an educator, student, professional, or simply curious, 
              we invite you to join us in this exciting journey of discovery and innovation.
            </p>
            <div className="info-grid">
              <div className="info-card">
                <h4>🤝 Collaborate</h4>
                <p>Partner with us to create innovative learning experiences</p>
              </div>
              <div className="info-card">
                <h4>💡 Contribute</h4>
                <p>Share your ideas and feedback to help us improve</p>
              </div>
              <div className="info-card">
                <h4>🌱 Grow</h4>
                <p>Be part of a community dedicated to better understanding</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Precision</h3>
              <p>Every explanation is crafted with scientific accuracy and attention to detail</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Innovation</h3>
              <p>Pushing the boundaries of what's possible in educational technology</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Accessibility</h3>
              <p>Making complex knowledge understandable for learners of all backgrounds</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Performance</h3>
              <p>Delivering instant, smooth experiences that respect your time</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Follow Our Journey</h2>
          <div className="text-content">
            <div className="social-media">
              <div className="social-links">
                <a href="https://twitter.com/pixelmindpro" className="social-link">
                  <span>🐦</span>
                  <span>Twitter/X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 