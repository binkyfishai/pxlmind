import React from 'react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  date: string;
  features: string[];
}

const RoadmapPage: React.FC = () => {
  const milestones: Milestone[] = [
    {
      id: 'foundation',
      title: 'Foundation Release',
      description: 'Core functionality and basic AI integration',
      status: 'completed',
      date: '2024 Q1',
      features: [
        'Basic 3D rendering engine',
        'Keyword-based concept extraction',
        'Simple interactive controls',
        'Template-based explanations'
      ]
    },
    {
      id: 'enhanced-ai',
      title: 'Enhanced AI Understanding',
      description: 'Advanced natural language processing and context awareness',
      status: 'in-progress',
      date: '2024 Q2',
      features: [
        'Transformer-based NLP models',
        'Context-aware explanations',
        'Improved concept mapping',
        'Dynamic scene generation'
      ]
    },
    {
      id: 'visual-upgrade',
      title: 'Visual Enhancement',
      description: 'Improved graphics and animations',
      status: 'in-progress',
      date: '2024 Q3',
      features: [
        'Advanced particle systems',
        'Custom shaders and effects',
        'Improved pixel art style',
        'Performance optimizations'
      ]
    },
    {
      id: 'multimodal',
      title: 'Multi-modal Input',
      description: 'Support for various input types',
      status: 'planned',
      date: '2024 Q4',
      features: [
        'Voice input processing',
        'Image understanding',
        'Gesture controls',
        'AR/VR compatibility'
      ]
    }
  ];

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      case 'planned':
        return 'status-planned';
      default:
        return '';
    }
  };

  return (
    <div className="roadmap-page">
      <section className="page-hero">
        <div className="container">
          <h1>PixelMind Explainer Development Roadmap</h1>
          <p>Follow our journey as we evolve the future of 3D explanations</p>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.id} 
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-content">
                  <div className="milestone-header">
                    <h3>{milestone.title}</h3>
                    <span className={`status-badge ${getStatusColor(milestone.status)}`}>
                      {milestone.status}
                    </span>
                  </div>
                  <div className="milestone-date">{milestone.date}</div>
                  <p>{milestone.description}</p>
                  <div className="feature-grid">
                    {milestone.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="feature-item">
                        <span className="feature-bullet">•</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="future-vision">
        <div className="container">
          <h2>Future Vision</h2>
          <div className="vision-grid">
            <div className="vision-item">
              <h3>🎯 Personalization</h3>
              <p>Adaptive learning paths and customized explanations based on user preferences and learning style.</p>
            </div>
            <div className="vision-item">
              <h3>🌐 Collaboration</h3>
              <p>Multi-user interactive sessions and shared learning experiences in virtual spaces.</p>
            </div>
            <div className="vision-item">
              <h3>🔄 Integration</h3>
              <p>Seamless integration with popular learning management systems and educational platforms.</p>
            </div>
            <div className="vision-item">
              <h3>📱 Accessibility</h3>
              <p>Cross-platform support and offline functionality for learning anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoadmapPage; 