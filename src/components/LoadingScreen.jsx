import React from 'react';
import Lottie from 'lottie-react';
import { Box } from '@mui/material';
import loadingAnimation from '../assets/loading-animation.json'; // You'll need to add your Lottie JSON file

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex: 9999,
      }}
    >
      <Lottie 
        animationData={loadingAnimation}
        style={{
          width: 200,
          height: 200,
        }}
        loop={true}
      />
    </Box>
  );
};

export default LoadingScreen; 