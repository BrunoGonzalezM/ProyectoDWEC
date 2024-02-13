import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CircleProgressBar = ({ max, value }) => {
  const percentage = (value / max) * 100;

  const strokeColor =
    percentage >= 90 ? '#3eff00' :
      percentage >= 70 ? '#95ff00' :
        percentage >= 50 ? '#fa9325' :
          percentage <= 30 ? '#fa2525' :
            '#ffbf00';

  const circumference = 2 * Math.PI * 40;
  const dashArrayValue = `${(value / max) * circumference} ${circumference}`;

  return (
    <Box position="relative" width="100px" height="100px">
      <Flex>
        <svg
          className="circle-progress"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
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
        {value}%
      </Box>
    </Box>
  );
};

export default CircleProgressBar;
