import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CircleProgressBar = ({ max, value }) => {
  const [animatedValue, setAnimatedValue] = useState(0); // Estado para almacenar el valor animado del progreso
  const [animationStartTime, setAnimationStartTime] = useState(null); // Estado para almacenar el tiempo de inicio de la animación

  const percentage = (animatedValue / max) * 100; // Calcula el porcentaje de progreso

  // Define el color de la barra de progreso basado en el porcentaje alcanzado
  const strokeColor =
    percentage >= 90 ? '#3eff00' :
    percentage >= 70 ? '#95ff00' :
    percentage >= 50 ? '#fa9325' :
    percentage <= 30 ? '#fa2525' :
    '#ffbf00'; 

  const circumference = 2 * Math.PI * 40; // Circunferencia 
  const dashArrayValue = `${(animatedValue / max) * circumference} ${circumference}`; // Longitud de barra prog

  const circleRef = useRef(null); // Referencia al elemento del círculo de progreso

  useEffect(() => {
    // Inicia la animación cuando se monta el componente
    if (!animationStartTime) {
      setAnimationStartTime(Date.now());
    }

    // Actualiza el valor animado progresivamente hasta alcanzar el valor final
    const animationFrameId = requestAnimationFrame(() => {
      const elapsedTime = Date.now() - animationStartTime;
      const progress = Math.min((elapsedTime / 1500) * value, value); // Duración de la animación: 1500 ms
      setAnimatedValue(progress);
    });

    // Detiene la animación cuando se alcanza el valor final
    if (animatedValue < value) {
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [animatedValue, animationStartTime, value]);

  return (
    <Box position="relative" width="100px" height="100px">
      <Flex>
        <svg
          className="circle-progress"
          style={{ transform: 'rotate(-90deg)' }} // Rota el círculo para que el punto de partida sea la posición de arriba
        >
          <circle
            ref={circleRef}
            className="circle-progress-circle"
            stroke={strokeColor}
            cx="50%"
            cy="50%"
            r="40"
            strokeLinecap='round'
            fill="#2222222a"
            strokeWidth="6"
            strokeDasharray={dashArrayValue} // Define el tope de longitud del progreso animado
          />
        </svg>
      </Flex>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color="white"
        mt="1em"
      >
        {Math.round(percentage)}% {/* Muestra el porcentaje de progreso */}
      </Box>
    </Box>
  );
};

export default CircleProgressBar;
