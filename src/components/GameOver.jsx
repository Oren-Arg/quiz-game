import React from 'react'
import styled from 'styled-components'
import { Typography } from '@mui/material';

const GameOver = () => {
    return (
        <GameOverContainer>
            <Typography variant="h2" gutterBottom><span role="img" aria-label="game over">💀</span></Typography>
            <Typography variant="h2" gutterBottom>Game Over</Typography>
        </GameOverContainer>
    )
}

export default GameOver


const GameOverContainer = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  height:100%;    
`
