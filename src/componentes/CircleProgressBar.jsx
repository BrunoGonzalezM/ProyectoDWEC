import React from 'react';
import { Box ,Flex} from '@chakra-ui/react';

const CircleProgressBar = ({ max, value }) => {
  const circumference = 2 * Math.PI * 40;
  const dashArrayValue = `${(value / max) * circumference} ${circumference}`;

  return (
    <Box className="circle-progress-container" >
      <Flex>
      <svg className="circle-progress">
        <circle
          className="circle-progress-circle"
          stroke="#3eff00"
          cx="50%"
          cy="50%"
          r="40"
          fill="transparent"
          strokeWidth="6"
          strokeDasharray={dashArrayValue}
        />
      </svg>
      </Flex>
      <Box color="white" mt="1em" className="circle-progress-value">{value}%</Box>
    </Box>
  );
};

export default CircleProgressBar;
