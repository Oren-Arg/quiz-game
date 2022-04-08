import React from 'react'
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

const Celebration = () => {
    return (
        <CelebrationContainer>
            <Typography variant="h2" gutterBottom>
                <span role="img" aria-label="celebration">🎉</span>
            </Typography>
            <Typography variant="h2" gutterBottom>
                You did it!
            </Typography>
        </CelebrationContainer>
    )
}

export default Celebration


const CelebrationContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    height:100%;
`