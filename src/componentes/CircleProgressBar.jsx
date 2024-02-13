import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CircleProgressBar = ({ max, value }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animationStartTime, setAnimationStartTime] = useState(null);

  const percentage = (animatedValue / max) * 100;

  const strokeColor =
    percentage >= 90 ? '#3eff00' :
    percentage >= 70 ? '#95ff00' :
    percentage >= 50 ? '#fa9325' :
    percentage <= 30 ? '#fa2525' :
    '#ffbf00';

  const circumference = 2 * Math.PI * 40;
  const dashArrayValue = `${(animatedValue / max) * circumference} ${circumference}`;

  const circleRef = useRef(null);

  useEffect(() => {
    if (!animationStartTime) {
      setAnimationStartTime(Date.now());
    }

    const animationFrameId = requestAnimationFrame(() => {
      const elapsedTime = Date.now() - animationStartTime;
      const progress = Math.min((elapsedTime / 1000) * value, value);
      setAnimatedValue(progress);
    });

    if (animatedValue < value) {
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [animatedValue, animationStartTime, value]);

  return (
    <Box position="relative" width="100px" height="100px">
      <Flex>
        <svg
          className="circle-progress"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            ref={circleRef}
            className="circle-progress-circle"
            stroke={strokeColor}
            cx="50%"
            cy="50%"
            r="40"
            strokeLinecap='round'
            fill="transparent"
            strokeWidth="6"
            strokeDasharray={dashArrayValue}
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
        {Math.round(percentage)}%
      </Box>
    </Box>
  );
};

export default CircleProgressBar;
