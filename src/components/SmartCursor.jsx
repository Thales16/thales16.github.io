import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SmartCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detecta se é dispositivo touch
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const moveMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e) => {
      // Se passar o mouse em links ou botões, muda o estado
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Ponto central */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8,
          backgroundColor: '#ff0000',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
      />
      {/* Círculo externo magnético */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40,
          border: '1px solid rgba(255, 0, 0, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 2 : 1,
          borderColor: isHovering ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 0, 0, 0.5)',
          backgroundColor: isHovering ? 'rgba(255, 0, 0, 0.1)' : 'transparent'
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />
    </>
  );
};

export default SmartCursor;