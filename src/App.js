import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SortingVisualizer from './components/SortingVisualizer';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Box from '@mui/material/Box';
import { audioManager } from './utils/audioContext';

function App() {
  const [mode, setMode] = useState('dark');
  const [isMuted, setIsMuted] = useState(true);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' ? {
            primary: {
              main: '#90caf9',
            },
            secondary: {
              main: '#f48fb1',
            },
            background: {
              default: '#1a1a1a',
              paper: '#2d2d2d',
            },
          } : {
            primary: {
              main: '#1976d2',
            },
            secondary: {
              main: '#dc004e',
            },
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
          }),
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiSlider: {
            styleOverrides: {
              thumb: {
                color: mode === 'dark' ? '#90caf9' : '#1976d2',
              },
              track: {
                color: mode === 'dark' ? '#90caf9' : '#1976d2',
              },
              rail: {
                color: mode === 'dark' ? '#666666' : '#bdbdbd',
              },
            },
          },
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const toggleSound = () => {
    const isNowMuted = audioManager.toggle();
    setIsMuted(isNowMuted);
    
    // Play a test sound when unmuting
    if (!isNowMuted) {
      audioManager.playNote(50);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        position: 'absolute', 
        right: 16, 
        top: 16, 
        zIndex: 1000,
        display: 'flex',
        gap: 1
      }}>
        <IconButton onClick={toggleSound} color="inherit">
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <SortingVisualizer audioManager={audioManager} />
    </ThemeProvider>
  );
}

export default App;
