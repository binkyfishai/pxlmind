import React, { useState } from 'react';
import HotAirBalloonDemo from '../components/HotAirBalloonDemo';
import RocketDemo from '../components/RocketDemo';
import LeaningTowerDemo from '../components/LeaningTowerDemo';
import SolarSystemDemo from '../components/SolarSystemDemo';

interface Showcase {
  id: string;
  title: string;
  description: string;
  category: string;
  userInput: string;
  interactions: string[];
  learningValue: string;
  demoComponent: React.ComponentType<any>;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const ShowcasesPage: React.FC = () => {
  const categories: Category[] = [
    {
      id: 'physics',
      name: 'Physics',
      description: 'Fundamental physics concepts visualized in 3D'
    },
    {
      id: 'astronomy',
      name: 'Astronomy',
      description: 'Space and celestial mechanics brought to life'
    },
    {
      id: 'engineering',
      name: 'Engineering',
      description: 'Engineering concepts and flight mechanics'
    }
  ];

  const showcases: Showcase[] = [
    {
      id: 'gravity-experiment',
      title: 'Gravity Experiment - Leaning Tower of Pisa',
      description: 'Interactive demonstration of Galileo\'s famous gravity experiment showing that objects of different masses fall at the same rate',
      category: 'physics',
      userInput: 'Show how gravity affects falling objects',
      interactions: [
        'Click "Reset & Drop Balls" to start the experiment',
        'Observe how both balls fall at the same rate',
        'Rotate the view to see the experiment from different angles'
      ],
      learningValue: 'Understanding that gravitational acceleration is independent of mass',
      demoComponent: LeaningTowerDemo
    },
    {
      id: 'solar-system',
      title: 'Nine Planets Solar System',
      description: 'Complete solar system model with all planets including Pluto, showing orbital mechanics and relative sizes',
      category: 'astronomy',
      userInput: 'Explain our solar system and planetary motion',
      interactions: [
        'Zoom and pan around the solar system',
        'Observe planetary orbital speeds and rotations',
        'See Saturn\'s rings and Earth\'s moon in detail'
      ],
      learningValue: 'Understanding planetary orbits, relative sizes, and celestial mechanics',
      demoComponent: SolarSystemDemo
    },
    {
      id: 'rocket-launch',
      title: 'SpaceX Rocket Launch Simulation',
      description: 'Realistic rocket launch simulation showing physics of propulsion, atmospheric transition, and space travel',
      category: 'engineering',
      userInput: 'How does a rocket launch work?',
      interactions: [
        'Watch the automated launch sequence',
        'Observe the transition from atmosphere to space',
        'Follow the rocket\'s trajectory and exhaust dynamics'
      ],
      learningValue: 'Understanding rocket propulsion, atmospheric effects, and space travel physics',
      demoComponent: RocketDemo
    },
    {
      id: 'hot-air-balloon',
      title: 'Flying Hot Air Balloon',
      description: 'Peaceful hot air balloon flight simulation with realistic wind patterns and cloud formations',
      category: 'physics',
      userInput: 'How do hot air balloons fly and navigate?',
      interactions: [
        'Watch the balloon drift with wind patterns',
        'Observe realistic cloud formations moving',
        'Control the viewing angle to explore the scene'
      ],
      learningValue: 'Understanding buoyancy, air currents, and atmospheric physics',
      demoComponent: HotAirBalloonDemo
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
            {filteredShowcases.map(showcase => {
              const DemoComponent = showcase.demoComponent;
              
              return (
                <div key={showcase.id} className="showcase-card">
                  <div className="showcase-visual">
                    <DemoComponent height="400px" className="showcase-demo" />
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
                      <button className="learn-more-button">Learn More</button>
                    </div>
                  </div>
                </div>
              );
            })}
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
            <div className="cta-section">
              <button className="primary-button">Try PixelMind Now</button>
              <button className="secondary-button">View Documentation</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowcasesPage; 