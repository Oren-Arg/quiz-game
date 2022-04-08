import React from 'react'
import styled from 'styled-components'
import { AccessAlarm } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const Timer = ({ seconds }) => {
    return (
        <TimerContainer>
            <StyledAccessAlarm />
            <Typography variant="h2" gutterBottom> {seconds}s</Typography>
        </TimerContainer>
    )
}

export default Timer

const TimerContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
 `

const StyledAccessAlarm = styled(AccessAlarm)`
    padding:1rem;
    color:gray;
 `