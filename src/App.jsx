import React, { useState, useEffect } from "react";
import Score from "./components/Score";
import Grid from '@mui/material/Grid';
import Questions from "./components/Questions";
import Timer from "./components/Timer";
import GameOver from "./components/GameOver";
import Loading from "./components/Loading";
import Celebration from "./components/Celebration";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [timesUp, setTimesUp] = useState(false);
  const [gameOver, setGameOver] = useState(false)


  // USE EFFECT
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=4&type=multiple`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(handleAnswersData(actualData.results));
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    getData()
  }, [])

  useEffect(() => {
    if (!gameOver) {
      const token = setTimeout(updateTime, 1000);
      return () => clearTimeout(token);
    }
  });

  useEffect(() => {
    if (isNextQuestion()) {
      setTimesUp(false)
    }
  })

  useEffect(() => {
    if (timesUp) {
      nextQuestion()
      resetQuestionCountdown()
    }
  }, [timesUp]);

  // LOGIC
  const handleAnswersData = (rawData) => {
    const questionsFormat = rawData.map((question) => {
      let copyQuestion = [...question.incorrect_answers]
      copyQuestion.push(question.correct_answer)
      return {
        category: question.category,
        correct_answer: question.correct_answer,
        difficulty: question.difficulty,
        answers: shuffle(copyQuestion),
        question: question.question.replace(/&quot;/g, '"')
      }
    })
    questionsFormat.push(AddOrenQuestion())
    return questionsFormat
  }

  const AddOrenQuestion = () => {
    return {
      category: 'Monday Candidates ',
      correct_answer: 'HELL YEAH',
      difficulty: 'bonus',
      answers: ['NO', 'HELL YEAH'],
      question: `Oren seems like a good candidate for Monday's program, don't you think?`
    }
  }

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5)
  }

  const updateTime = () => {
    if (seconds === 0) {
      setTimesUp(true);
    } else {
      setSeconds((seconds) => seconds - 1);
    }
  };

  const resetQuestionCountdown = () => {
    setSeconds(10);
  }

  const isNextQuestion = () => {
    return currentQuestion < data.length - 1;
  }

  const nextQuestion = () => {
    const nextQue = currentQuestion + 1;
    if (isNextQuestion()) {
      setCurrentQuestion(nextQue);
      resetQuestionCountdown();
    } else {
      setGameOver(true)
      setSeconds(0)
    }
  }

  const isHeWinner = () => {
    return score === data.length;
  }

  const advanceQuestion = (correct) => {
    if (correct) {
      setScore(score + 1);
    }
    nextQuestion()
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false)
  }

  return (
    <div id="root">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Timer seconds={seconds} />
          {loading && <Loading />}
          {error && <div> Theres an issue with loading questions</div>}
          <Score score={score} questions={data.length} />
          {isHeWinner() && <Celebration />}
          {gameOver && !isHeWinner() ? <GameOver resetGame={resetGame} /> : null}
          {!gameOver && !isHeWinner() ? (
            <Questions
              questions={data}
              currentQuestion={currentQuestion}
              advanceQuestion={advanceQuestion}
            />
          ) : <Button onClick={resetGame}> <span role="img" aria-label="restart">🔄</span>
            <Typography>Play Again </Typography>
          </Button>}
        </Grid>
      </Grid>
    </div>
  );
}


