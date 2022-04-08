import React from 'react'
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

const Score = ({ score, questions }) => {
    return (
        <QuestionContainer>
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                You scored {score} out of {questions}
            </Typography>
        </QuestionContainer>
    )
}

export default Score

const QuestionContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;

    `
