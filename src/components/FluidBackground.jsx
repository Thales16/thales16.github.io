import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Componente das linhas onduladas
const Terrain = () => {
  const meshRef = useRef();
  
  // Cria geometria plana com muitos segmentos para ficar suave
  // args: [width, height, widthSegments, heightSegments]
  const geometry = useMemo(() => new THREE.PlaneGeometry(30, 15, 64, 64), []);

  useFrame((state) => {
    const { clock, mouse } = state;
    const time = clock.getElapsedTime();
    
    // Acessa os vértices da geometria
    const positionAttribute = meshRef.current.geometry.attributes.position;
    
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i); // Como está rotacionado, Y age como profundidade no plano original
      
      // Equação matemática para criar ondas (Seno e Cosseno)
      // Mistura o tempo para animação e a posição do mouse para interatividade
      const z = 
        Math.sin(x * 0.5 + time * 0.5) * 1.5 + 
        Math.cos(y * 0.3 + time * 0.3) * 1.5 +
        (mouse.x * 2); // Efeito leve do mouse

      positionAttribute.setZ(i, z);
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotação suave baseada no mouse
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.1, 0.1);
  });

  return (
    <points ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]}>
       {/* Material que cria o efeito de "pontos" ou linhas se usar wireframe */}
      <pointsMaterial 
        size={0.06} 
        color="#ff1a1a" // A cor VERMELHA
        transparent 
        opacity={0.6} 
        sizeAttenuation 
      />
    </points>
  );
};

// Se preferir linhas conectadas em vez de pontos, troque <points> por <mesh> e <pointsMaterial> por:
// <meshStandardMaterial wireframe color="#ff1a1a" />

const FluidBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1, opacity: 0.4 }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
        <fog attach="fog" args={['#050505', 5, 15]} /> {/* Fade to black no fundo */}
        <Terrain />
      </Canvas>
    </div>
  );
};

export default FluidBackground;