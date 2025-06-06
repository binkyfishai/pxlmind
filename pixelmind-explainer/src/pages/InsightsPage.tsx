import React, { useState } from 'react';

const InsightsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Posts');

  const categories = [
    'All Posts',
    'Development Logs',
    'Research & Science',
    'Success Stories',
    'AI in Education',
    'Cognitive Science'
  ];

  const articles = [
    {
      id: 1,
      title: 'The AI Explanation Revolution: Why Traditional Learning Methods Are Failing',
      excerpt: 'Exploring the cognitive science behind why 3D interactive explanations are more effective than traditional text-based learning.',
      author: 'Dr. Sarah Chen',
      date: '2024-05-10',
      readTime: '12 min read',
      category: 'AI in Education',
      tags: ['AI Education', 'Cognitive Science', 'Learning Theory']
    },
    {
      id: 2,
      title: 'How PixelMind Helped 10,000 Students Understand Cell Division',
      excerpt: 'A comprehensive case study showing how our 3D cell mitosis visualization improved student comprehension by 78% compared to traditional textbooks.',
      author: 'PixelMind Team',
      date: '2024-05-08',
      readTime: '8 min read',
      category: 'Success Stories',
      tags: ['Case Study', 'Biology', 'Education']
    },
    {
      id: 3,
      title: 'Behind the Scenes: Building Realistic Heart Pump Animations',
      excerpt: 'Technical deep-dive into our cardiovascular system visualization, from medical accuracy to performance optimization.',
      author: 'Dr. Michael Rodriguez',
      date: '2024-05-05',
      readTime: '15 min read',
      category: 'Development Logs',
      tags: ['3D Graphics', 'Medical Visualization', 'Animation']
    },
    {
      id: 4,
      title: 'The Psychology of Visual Learning: Why Pixels Work',
      excerpt: 'Research findings on how pixelated aesthetic enhances focus and reduces cognitive load in educational settings.',
      author: 'Dr. Lisa Wang',
      date: '2024-05-02',
      readTime: '10 min read',
      category: 'Cognitive Science',
      tags: ['Psychology', 'Visual Learning', 'UX Research']
    }
  ];

  const filteredArticles = activeFilter === 'All Posts' 
    ? articles 
    : articles.filter(article => article.category === activeFilter);

  const featuredArticle = articles[0];

  return (
    <div className="insights-page">
      <section className="insights-hero">
        <div className="container">
          <h1>PixelMind Insights</h1>
          <p>
            Exploring the intersection of AI, education, and cognitive science through the lens of interactive 3D learning.
          </p>
        </div>
      </section>

      <section className="insights-content">
        <div className="container">
          {/* Featured Article */}
          <div className="featured-article">
            <div className="featured-label">Featured Article</div>
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.excerpt}</p>
            <div className="article-meta">
              <span>By {featuredArticle.author}</span>
              <span>•</span>
              <span>{featuredArticle.date}</span>
              <span>•</span>
              <span>{featuredArticle.readTime}</span>
            </div>
            <div className="article-tags">
              {featuredArticle.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <button className="read-article-btn">Read Full Article</button>
          </div>

          {/* Explore Section */}
          <div className="insights-section">
            <h2>Explore Our Insights</h2>
            
            {/* Category Filters */}
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="articles-grid">
              {filteredArticles.map(article => (
                <div key={article.id} className="article-card">
                  <div className="article-tags">
                    <span className="tag">{article.category}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-meta">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <div className="article-tags">
                    {article.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="newsletter-signup">
            <h3>Stay Updated</h3>
            <p>Get the latest insights on AI-powered education and 3D learning delivered to your inbox.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightsPage; 