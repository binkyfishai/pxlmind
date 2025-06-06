import React, { useState } from 'react';

interface Showcase {
  id: string;
  title: string;
  description: string;
  category: string;
  userInput: string;
  interactions: string[];
  learningValue: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const ShowcasesPage: React.FC = () => {
  const categories: Category[] = [
    {
      id: 'science',
      name: 'Science',
      description: 'Complex scientific concepts visualized in 3D'
    },
    {
      id: 'math',
      name: 'Mathematics',
      description: 'Mathematical principles brought to life'
    },
    {
      id: 'engineering',
      name: 'Engineering',
      description: 'Engineering concepts and mechanisms explained'
    }
  ];

  const showcases: Showcase[] = [
    {
      id: 'dna-structure',
      title: 'DNA Double Helix Structure',
      description: 'Interactive 3D model of DNA structure with detailed base pair interactions',
      category: 'science',
      userInput: 'Explain DNA structure',
      interactions: [
        'Rotate and zoom the DNA model',
        'Click on base pairs to see chemical bonds',
        'Unwrap the double helix animation'
      ],
      learningValue: 'Understanding molecular biology fundamentals'
    },
    {
      id: 'quantum-states',
      title: 'Quantum State Visualization',
      description: 'Visual representation of quantum mechanical states and transitions',
      category: 'science',
      userInput: 'Show quantum electron states',
      interactions: [
        'Toggle between different quantum states',
        'Observe electron probability clouds',
        'Interact with energy level transitions'
      ],
      learningValue: 'Grasping quantum mechanics concepts'
    },
    {
      id: 'calculus-3d',
      title: '3D Calculus Concepts',
      description: 'Interactive visualization of multivariable calculus concepts',
      category: 'math',
      userInput: 'Visualize partial derivatives',
      interactions: [
        'Manipulate 3D surfaces',
        'Observe tangent planes',
        'Track gradient vectors'
      ],
      learningValue: 'Understanding multivariable calculus'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredShowcases = selectedCategory === 'all'
    ? showcases
    : showcases.filter(showcase => showcase.category === selectedCategory);

  return (
    <div className="showcases-page">
      <section className="page-hero">
        <div className="container">
          <h1>Interactive Showcases</h1>
          <p>Explore our collection of AI-powered 3D explanations</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Featured Examples</h2>
          <div className="text-content">
            <p>
              <strong>Discover the power of visual learning</strong> through our curated collection 
              of interactive 3D explanations. Each showcase demonstrates how PixelMind transforms 
              complex concepts into intuitive visual experiences.
            </p>
          </div>

          <div className="category-filters">
            <button 
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="info-grid">
            {categories.map(category => (
              <div key={category.id} className="info-card">
                <h4>{category.name}</h4>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="showcases-grid">
            {filteredShowcases.map(showcase => (
              <div key={showcase.id} className="showcase-card">
                <div className="showcase-visual">
                  {/* 3D visualization component will be added here */}
                </div>
                <div className="text-content">
                  <h3>{showcase.title}</h3>
                  <p className="showcase-description">{showcase.description}</p>
                  
                  <div className="showcase-details">
                    <div className="detail-section">
                      <h4>User Query</h4>
                      <p className="user-input">{showcase.userInput}</p>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Interactive Features</h4>
                      <ul className="interactions-list">
                        {showcase.interactions.map((interaction, index) => (
                          <li key={index}>{interaction}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Learning Outcome</h4>
                      <p className="learning-value">{showcase.learningValue}</p>
                    </div>
                  </div>

                  <div className="showcase-actions">
                    <button className="try-button">Try It Now</button>
                    <button className="learn-more-button">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Create Your Own</h2>
          <div className="text-content">
            <p>
              Ready to create your own interactive 3D explanation? Try PixelMind Explainer 
              with your own concept or topic. Our AI will help you transform it into an 
              engaging visual experience.
            </p>
            <div className="text-highlight">
              <p>
                "The possibilities are endless. What will you explain with PixelMind?"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowcasesPage; 