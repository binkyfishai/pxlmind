import React, { useRef, useMemo } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const HeroSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContent = styled(motion.div)``;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary} 0%, 
    ${props => props.theme.colors.primaryLight} 50%,
    ${props => props.theme.colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.gray300};
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary} 0%, 
    ${props => props.theme.colors.secondary} 100%);
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 600px;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 400px;
  }
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(139, 92, 246, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
`;

// Pixelated Brain Component
function PixelBrain() {
  const groupRef = useRef<THREE.Group>(null);
  
  const pixels = useMemo(() => {
    const temp = [];
    const brainShape = (x: number, y: number, z: number) => {
      const r = Math.sqrt(x * x + y * y + z * z);
      return r < 3 && Math.abs(y) < 2.5 - Math.abs(x) * 0.3;
    };
    
    for (let x = -3; x <= 3; x += 0.6) {
      for (let y = -2; y <= 2; y += 0.6) {
        for (let z = -3; z <= 3; z += 0.6) {
          if (brainShape(x, y, z)) {
            temp.push({
              position: [x, y, z] as [number, number, number],
              color: new THREE.Color().setHSL(
                0.75 + Math.random() * 0.15, // Purple to blue range
                0.7 + Math.random() * 0.3,
                0.5 + Math.random() * 0.3
              ),
              scale: 0.4 + Math.random() * 0.2,
            });
          }
        }
      }
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {pixels.map((pixel, index) => (
        <Box
          key={index}
          position={pixel.position}
          args={[pixel.scale, pixel.scale, pixel.scale]}
        >
          <meshStandardMaterial
            color={pixel.color}
            emissive={pixel.color}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.7}
          />
        </Box>
      ))}
      
      {/* Neural connections */}
      {pixels.slice(0, 50).map((pixel, index) => {
        const target = pixels[Math.floor(Math.random() * pixels.length)];
        return (
          <Sphere
            key={`connection-${index}`}
            position={[
              (pixel.position[0] + target.position[0]) / 2,
              (pixel.position[1] + target.position[1]) / 2,
              (pixel.position[2] + target.position[2]) / 2,
            ]}
            args={[0.05, 8, 8]}
          >
            <meshStandardMaterial
              color="#A78BFA"
              emissive="#A78BFA"
              emissiveIntensity={1}
              opacity={0.6}
              transparent
            />
          </Sphere>
        );
      })}
    </group>
  );
}

const Hero: React.FC = () => {
  return (
    <HeroSection>
      <BackgroundGradient />
      <HeroContent>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Complex Concepts? AI Parses Them in 3D.
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-driven interactive 3D explainer that transforms abstract knowledge 
            into vivid, intuitive, and explorable pixelated scenarios.
          </Subtitle>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <PrimaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Experience Now
            </PrimaryButton>
            <SecondaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </SecondaryButton>
          </ButtonGroup>
        </TextContent>

        <CanvasContainer>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#EC4899" />
            <PixelBrain />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </CanvasContainer>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 