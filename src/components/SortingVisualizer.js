/**
 * Sorting Algorithms for Visualizer
 * Author: Antima Mishra
 * Date: March 2025
 * Custom implementation of sorting with animations
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Container, Paper, Typography, Button, Slider, Select, MenuItem, AppBar, Toolbar, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transform: 'perspective(1000px) rotateX(2deg)',
  '&:hover': {
    transform: 'perspective(1000px) rotateX(0deg)',
    transition: 'transform 0.3s ease-in-out',
  }
}));

const ControlPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: 'flex',
  gap: theme.spacing(3),
  alignItems: 'center',
  flexWrap: 'wrap',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  '& .MuiButton-root': {
    borderRadius: theme.shape.borderRadius,
    padding: '8px 24px',
    fontWeight: 600,
    textTransform: 'none',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 10px 4px rgba(33, 203, 243, .3)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    }
  },
  '& .MuiSlider-root': {
    '& .MuiSlider-thumb': {
      width: 16,
      height: 16,
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 2px 4px 0 rgba(33, 203, 243, .3)',
      '&:hover, &.Mui-focusVisible': {
        boxShadow: '0 0 0 8px rgba(33, 203, 243, 0.16)',
      }
    },
    '& .MuiSlider-track': {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    }
  }
}));

const ArrayContainer = styled(Box)(({ theme }) => ({
  height: '400px',
  display: 'flex',
  alignItems: 'flex-end',
  gap: '3px',
  marginRight: '280px',
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  perspective: '1000px',
  transformStyle: 'preserve-3d'
}));

const ArrayBar = styled(Box)(({ theme }) => ({
  width: '29px',
  backgroundColor: theme.palette.primary.main,
  transition: 'all 0.2s ease-in-out',
  borderRadius: '4px 4px 0 0',
  transform: 'translateZ(20px)',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  '&.comparing': {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '0 0 20px rgba(156, 39, 176, 0.7)',
    transform: 'translateZ(40px)',
    background: 'linear-gradient(45deg, #9C27B0 30%, #E040FB 90%)',
  },
  '&.sorted': {
    backgroundColor: theme.palette.success.main,
    boxShadow: '0 0 20px rgba(76, 175, 80, 0.7)',
    transform: 'translateZ(30px)',
    background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
  }
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  '& .MuiToolbar-root': {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'center',
  },
  '& .header-title': {
    fontSize: '2.5rem',
    fontWeight: 800,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    background: 'linear-gradient(45deg, #FFF 30%, #E3F2FD 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    fontFamily: "'Roboto', sans-serif",
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-4px',
      left: '0',
      width: '100%',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #E3F2FD, transparent)',
    }
  }
}));

const StepsDisplay = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  maxHeight: '200px',
  overflowY: 'auto',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  '& .step': {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
    transform: 'translateZ(0)',
    '&:hover': {
      transform: 'translateZ(5px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }
  },
  '& .current-step': {
    background: 'linear-gradient(45deg, rgba(33,150,243,0.2) 30%, rgba(33,203,243,0.2) 90%)',
    transform: 'translateZ(10px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
  }
}));

const ComplexityInfo = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  position: 'absolute',
  right: theme.spacing(4),
  top: '50%',
  transform: 'translateY(-50%) perspective(1000px) rotateY(-5deg)',
  width: '300px',
  background: 'linear-gradient(165deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  boxShadow: `
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 0 32px 0 rgba(31, 38, 135, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1)
  `,
  border: '1px solid rgba(255, 255, 255, 0.18)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
  },
  '& .complexity-title': {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: '#E3F2FD',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '2px',
      background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
    }
  },
  '& .complexity-row': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1.5, 2),
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255,255,255,0.1)',
    '&:hover': {
      transform: 'translateZ(10px) scale(1.02)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    '& .label': {
      color: '#90CAF9',
      fontWeight: 500,
      fontSize: '0.95rem',
    },
    '& .value': {
      color: '#81D4FA',
      fontWeight: 600,
      fontSize: '0.95rem',
      padding: theme.spacing(0.5, 1.5),
      borderRadius: '8px',
      background: 'rgba(33, 150, 243, 0.1)',
      border: '1px solid rgba(33, 150, 243, 0.2)',
    }
  },
  '& .best-case .value': {
    color: '#81C784',
    background: 'rgba(76, 175, 80, 0.1)',
    border: '1px solid rgba(76, 175, 80, 0.2)',
  },
  '& .worst-case .value': {
    color: '#FF8A65',
    background: 'rgba(244, 67, 54, 0.1)',
    border: '1px solid rgba(244, 67, 54, 0.2)',
  }
}));

const ALGORITHMS = {
  bubble: {
    name: 'Bubble Sort',
    function: async (arr, compare, swap, addStep) => {
      const n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          await compare(j, j + 1);
          addStep(`Comparing elements: ${arr[j]} and ${arr[j + 1]}`);
          if (arr[j] > arr[j + 1]) {
            await swap(arr, j, j + 1);
            addStep(`Swapping ${arr[j]} and ${arr[j + 1]}`);
          }
        }
        addStep(`Element ${arr[n - i - 1]} is in its final position`);
      }
    },
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'Yes' }
  },
  selection: {
    name: 'Selection Sort',
    function: async (arr, compare, swap, addStep) => {
      const n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        addStep(`Finding minimum element from index ${i} to ${n-1}`);
        for (let j = i + 1; j < n; j++) {
          await compare(minIdx, j);
          addStep(`Comparing ${arr[minIdx]} with ${arr[j]}`);
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
            addStep(`New minimum found: ${arr[minIdx]}`);
          }
        }
        if (minIdx !== i) {
          await swap(arr, i, minIdx);
          addStep(`Swapping ${arr[i]} to position ${i}`);
        }
        addStep(`Element ${arr[i]} is in its final position`);
      }
    },
    complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'No' }
  },
  insertion: {
    name: 'Insertion Sort',
    function: async (arr, compare, swap, addStep) => {
      const n = arr.length;
      for (let i = 1; i < n; i++) {
        addStep(`Inserting element ${arr[i]}`);
        let j = i;
        while (j > 0) {
          await compare(j, j - 1);
          addStep(`Comparing ${arr[j]} with ${arr[j-1]}`);
          if (arr[j] < arr[j - 1]) {
            await swap(arr, j, j - 1);
            addStep(`Swapping ${arr[j]} and ${arr[j-1]}`);
            j--;
          } else {
            addStep(`Found correct position for ${arr[j]}`);
            break;
          }
        }
      }
    },
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'Yes' }
  }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function SortingVisualizer({ audioManager }) {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(20);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const stopSortingRef = useRef(false);

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 200) + 10
    );
    setArray(newArray);
    setSortedIndices([]);
    setComparingIndices([]);
    setSteps([]);
    setCurrentStepIndex(-1);
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [generateArray, arraySize]);

  const addStep = (description) => {
    setSteps(prev => [...prev, {
      description,
      array: [...array],
      comparing: [...comparingIndices],
      sorted: [...sortedIndices]
    }]);
    setCurrentStepIndex(prev => prev + 1);
  };

  const startSorting = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setSortedIndices([]);
    setComparingIndices([]);
    setSteps([]);
    setCurrentStepIndex(-1);
    stopSortingRef.current = false;

    const compare = async (i, j) => {
      if (stopSortingRef.current) throw new Error('Sorting stopped');
      setComparingIndices([i, j]);
      audioManager?.playNote(array[i]);
      await sleep(150 - speed);
      return array[i] > array[j];
    };

    const swap = async (arr, i, j) => {
      if (stopSortingRef.current) throw new Error('Sorting stopped');
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      setArray([...arr]);
      audioManager?.playNote(arr[i]);
      await sleep(150 - speed);
    };

    try {
      const workingArray = [...array];
      addStep('Starting sorting process...');
      await ALGORITHMS[selectedAlgorithm].function(workingArray, compare, swap, addStep);
      
      // Mark all elements as sorted when done
      setComparingIndices([]);
      setSortedIndices([...Array(array.length).keys()]);
      setArray(workingArray);
      addStep('Sorting completed!');
    } catch (error) {
      if (error.message !== 'Sorting stopped') {
        console.error('Sorting error:', error);
      }
    }

    setIsSorting(false);
    stopSortingRef.current = false;
  };

  const stopSorting = () => {
    stopSortingRef.current = true;
    setIsSorting(false);
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography 
            variant="h4" 
            component="div" 
            className="header-title"
            sx={{ 
              flexGrow: 1,
              textAlign: 'center',
              animation: 'fadeIn 1s ease-in'
            }}
          >
            Sorting Visualizer
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <StyledContainer>
        <Box sx={{ position: 'relative' }}>
          <ControlPanel>
            <Select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              disabled={isSorting}
            >
              {Object.entries(ALGORITHMS).map(([key, algorithm]) => (
                <MenuItem key={key} value={key}>
                  {algorithm.name}
                </MenuItem>
              ))}
            </Select>
            
            <Box sx={{ width: 200 }}>
              <Typography gutterBottom>Array Size</Typography>
              <Slider
                value={arraySize}
                onChange={(e, newValue) => setArraySize(newValue)}
                min={10}
                max={100}
                disabled={isSorting}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box sx={{ width: 200 }}>
              <Typography gutterBottom>Speed</Typography>
              <Slider
                value={speed}
                onChange={(e, newValue) => setSpeed(newValue)}
                min={0}
                max={100}
                disabled={isSorting}
              />
            </Box>

            <Button
              variant="contained"
              onClick={generateArray}
              disabled={isSorting}
            >
              Generate New Array
            </Button>

            <Button
              variant="contained"
              onClick={startSorting}
              disabled={isSorting}
              color="primary"
            >
              Start Sorting
            </Button>

            <Button
              variant="contained"
              onClick={stopSorting}
              disabled={!isSorting}
              color="secondary"
            >
              Stop Sorting
            </Button>
          </ControlPanel>

          <ArrayContainer>
            {array.map((value, idx) => (
              <ArrayBar
                key={idx}
                sx={{
                  height: `${value}px`,
                }}
                className={`${comparingIndices.includes(idx) ? 'comparing' : ''} ${
                  sortedIndices.includes(idx) ? 'sorted' : ''
                }`}
              />
            ))}
          </ArrayContainer>

          <ComplexityInfo>
            <Typography className="complexity-title">
              Time & Space Complexity
            </Typography>
            <div className="complexity-row best-case">
              <span className="label">Best Case:</span>
              <span className="value">{ALGORITHMS[selectedAlgorithm].complexity.best}</span>
            </div>
            <div className="complexity-row">
              <span className="label">Average Case:</span>
              <span className="value">{ALGORITHMS[selectedAlgorithm].complexity.average}</span>
            </div>
            <div className="complexity-row worst-case">
              <span className="label">Worst Case:</span>
              <span className="value">{ALGORITHMS[selectedAlgorithm].complexity.worst}</span>
            </div>
            <div className="complexity-row">
              <span className="label">Space:</span>
              <span className="value">{ALGORITHMS[selectedAlgorithm].complexity.space}</span>
            </div>
            <div className="complexity-row">
              <span className="label">Stable:</span>
              <span className="value">{ALGORITHMS[selectedAlgorithm].complexity.stable}</span>
            </div>
          </ComplexityInfo>

          <StepsDisplay>
            <Typography variant="h6" gutterBottom>
              Sorting Steps
            </Typography>
            {steps.map((step, index) => (
              <Box
                key={index}
                className={`step ${index === currentStepIndex ? 'current-step' : ''}`}
              >
                <Typography>{step.description}</Typography>
              </Box>
            ))}
          </StepsDisplay>
        </Box>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Selected Algorithm: {ALGORITHMS[selectedAlgorithm].name}
        </Typography>
      </StyledContainer>
    </>
  );
}

export default SortingVisualizer;
