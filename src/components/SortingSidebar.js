/**
 * Sorting Algorithms for Visualizer
 * Author: Antima Mishra
 * Date: March 2025
 * Custom implementation of sorting with animations
 */
import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const SidebarContainer = styled(Paper)(({ theme }) => ({
  width: '300px',
  height: 'calc(100vh - 64px)', // Subtract AppBar height
  position: 'fixed',
  right: 0,
  top: 64, // AppBar height
  overflowY: 'auto',
  padding: theme.spacing(2),
  borderRadius: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  zIndex: 100,
  transition: 'transform 0.3s ease-in-out',
  transform: props => props.open ? 'translateX(0)' : 'translateX(100%)',
}));

const StepBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '&.active': {
    backgroundColor: theme.palette.action.selected,
    borderColor: theme.palette.primary.main,
  },
}));

const ArrayPreview = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '4px',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  justifyContent: 'center',
  '& .number': {
    padding: theme.spacing(0.5),
    minWidth: '30px',
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
  },
  '& .current': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '& .comparing': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  '& .sorted': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
}));

const getStepDescription = (algorithm, step) => {
  switch (algorithm) {
    case 'insertion':
      return {
        title: `Step ${step.stepNumber}`,
        description: step.description,
        example: step.currentArray,
        currentIndex: step.currentIndex,
        comparingIndex: step.comparingIndex,
        sortedIndices: step.sortedIndices,
      };
    // Add cases for other algorithms here
    default:
      return null;
  }
};

function SortingSidebar({ open, algorithm, steps, currentStep }) {
  return (
    <SidebarContainer open={open}>
      <Typography variant="h6" gutterBottom>
        {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort Steps
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      {steps.map((step, index) => {
        const stepInfo = getStepDescription(algorithm, step);
        if (!stepInfo) return null;

        return (
          <StepBox key={index} className={currentStep === index ? 'active' : ''}>
            <Typography variant="subtitle1" color="primary">
              {stepInfo.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {stepInfo.description}
            </Typography>
            <ArrayPreview>
              {stepInfo.example.map((num, idx) => (
                <Box
                  key={idx}
                  className={`number ${
                    idx === stepInfo.currentIndex
                      ? 'current'
                      : idx === stepInfo.comparingIndex
                      ? 'comparing'
                      : stepInfo.sortedIndices.includes(idx)
                      ? 'sorted'
                      : ''
                  }`}
                >
                  {num}
                </Box>
              ))}
            </ArrayPreview>
          </StepBox>
        );
      })}
    </SidebarContainer>
  );
}

export default SortingSidebar;
