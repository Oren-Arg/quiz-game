import React from 'react'
import styled from 'styled-components'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';

const Questions = ({ questions, currentQuestion, advanceQuestion }) => {

    const handleClickAnswer = (possibleAnswer) => {
        if (isTheCorrectAnswer(possibleAnswer)) {
            advanceQuestion(true)
        } else {
            advanceQuestion(false)
        }
    }

    const isTheCorrectAnswer = (possibleAnswer) => {
        return possibleAnswer === questions[currentQuestion].correct_answer
    }

    const handleDifficultyChip = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                return <Chip color='#00C853'><ChipText>{questions[currentQuestion].difficulty}</ChipText></Chip>
            case 'medium':
                return <Chip color='#FFD600'><ChipText>{questions[currentQuestion].difficulty}</ChipText></Chip>
            case 'hard':
                return <Chip color='#D50000'><ChipText>{questions[currentQuestion].difficulty}</ChipText></Chip>
            case 'bonus':
                return <Chip color='#0026ff'><ChipText>{questions[currentQuestion].difficulty}</ChipText></Chip>
            default:
                return <Chip color='#545050'><ChipText>{questions[currentQuestion].difficulty}</ChipText></Chip>
        }
    }

    return (
        <QuestionContainer >
            <Card>
                <CardActionArea>
                    {handleDifficultyChip(questions[currentQuestion].difficulty)}
                    <Typography color="text.secondary">
                        {currentQuestion + 1}/{questions.length}
                    </Typography>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {questions[currentQuestion].category}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {questions[currentQuestion].question}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {questions[currentQuestion].answers.map((answer, index) => {
                        return (
                            isTheCorrectAnswer(answer) ? (
                                <Button variant="contained" key={index} onClick={() => handleClickAnswer(answer)} color="success">
                                    {answer}
                                </Button>
                            ) : (
                                <Button variant="contained" key={index} onClick={() => handleClickAnswer(answer)} color="error">
                                    {answer}
                                </Button>
                            )
                        )
                    })}
                </CardActions>
            </Card>
        </QuestionContainer >
    )
}

export default Questions


const QuestionContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    margin:auto;
    width:800px;
`

const Chip = styled.div`
    background-color:${props => props.color};
    color:white;
    padding:0.5rem;
    border-radius:5px;
    margin-right:0.5rem;
    text-align:center;
    margin:0;
`

const ChipText = styled.p`
    font-size:1rem;
    font-weight:bold;
    text-transform:uppercase;
`

const CardActions = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    padding: 2rem;
`