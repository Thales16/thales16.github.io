import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Terrain = () => {
  const meshRef = useRef();
  // Geometria mais larga para cobrir telas ultrawide
  const geometry = new THREE.PlaneGeometry(40, 20, 50, 50);

  useFrame((state) => {
    const { clock, mouse } = state;
    const time = clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Movimento mais suave e "líquido"
      const z = 
        Math.sin(x * 0.4 + time * 0.2) * 1.2 + 
        Math.sin(y * 0.3 + time * 0.1) * 1.2;
        
      positions.setZ(i, z + (mouse.x * 0.5)); // Interatividade leve
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -4, -5]}>
      {/* Vermelho escuro e linhas finas para elegância */}
      <meshBasicMaterial color="#cc0000" wireframe transparent opacity={0.12} />
    </mesh>
  );
};

const TerrainBackground = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <fog attach="fog" args={['#050505', 5, 20]} />
        <Terrain />
      </Canvas>
    </div>
  );
};

export default TerrainBackground;