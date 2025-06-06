import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    // Primary purple palette
    primary: '#8B5CF6', // Main purple
    primaryDark: '#6D28D9',
    primaryLight: '#A78BFA',
    
    // Secondary colors
    secondary: '#EC4899', // Pink accent
    accent: '#10B981', // Emerald green
    
    // Background colors
    bgDark: '#0F0F23', // Deep dark purple
    bgMedium: '#1A1A2E',
    bgLight: '#252542',
    
    // Neutral colors
    white: '#FFFFFF',
    gray100: '#F3F4F6',
    gray300: '#D1D5DB',
    gray500: '#6B7280',
    gray700: '#374151',
    gray900: '#111827',
    
    // Pixel accent colors
    pixelYellow: '#FBBF24',
    pixelOrange: '#F97316',
    pixelPink: '#F472B6',
    pixelBlue: '#60A5FA',
  },
  
  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },
  
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.bgDark};
    color: ${theme.colors.gray100};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: ${theme.colors.white};
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${theme.colors.primaryLight};
    }
  }

  button {
    cursor: pointer;
    font-family: ${theme.fonts.body};
    transition: all 0.3s ease;
  }

  code {
    font-family: ${theme.fonts.mono};
    background-color: ${theme.colors.bgMedium};
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.bgMedium};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryLight};
  }

  /* Selection styling */
  ::selection {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

export type Theme = typeof theme; 