import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Verifica se o elemento sob o mouse é clicável para mudar o estado
      const target = e.target;
      const isHoverable = target.closest('a') || target.closest('button') || target.closest('.hover-target');
      
      setCursorVariant(isHoverable ? "hover" : "default");
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  // Variantes de animação para controlar os estados (Normal vs Hover)
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "transparent",
      border: "2px solid #ff1a1a",
      mixBlendMode: "difference" 
    },
    hover: {
      x: mousePosition.x - 24, // Compensa o aumento de tamanho para manter centralizado
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "#ff1a1a", // Preenche o círculo
      border: "2px solid #ff1a1a",
      mixBlendMode: "difference"
    }
  };

  return (
    <>
      {/* 1. O Círculo Principal com atraso (Spring) */}
      <motion.div
        variants={variants}
        animate={cursorVariant}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
        // A mágica da suavidade está aqui no transition
        transition={{
          type: "spring",
          stiffness: 150, // Menos rígido = mais "flutuante"
          damping: 15,    // Mais arrasto
          mass: 0.5
        }}
      />

      {/* 2. O Ponto Central de Precisão (Sem atraso) */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "#ff1a1a",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000, // Fica acima do círculo
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
          transition: "transform 0.1s linear" // Muito rápido, quase instantâneo
        }}
      />
    </>
  );
};

export default CustomCursor;