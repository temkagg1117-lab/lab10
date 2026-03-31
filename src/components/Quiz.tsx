import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from "../core/QuizCore";

const Quiz: React.FC = () => {

  const [quiz] = useState(new QuizCore());
  const [currentQuestion, setCurrentQuestion] = useState(quiz.getCurrentQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (!currentQuestion || selectedAnswer) return;

    setSelectedAnswer(option);
    quiz.answerQuestion(option);
  };

  const handleNext = () => {
    if (quiz.hasNextQuestion()) {
      quiz.nextQuestion();
      setCurrentQuestion(quiz.getCurrentQuestion());
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  if (!currentQuestion) {
    return <h2>No question available</h2>;
  }

  if (finished) {
    return (
      <div style={styles.container}>
        <h2>Quiz Completed</h2>
        <p>
          Final Score: {quiz.getScore()} / {quiz.getTotalQuestions()}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Quiz Question</h2>

      <p style={styles.question}>{currentQuestion.question}</p>

      <ul style={styles.list}>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            style={{
              ...styles.option,
              ...(selectedAnswer === option ? styles.selected : {})
            }}
          >
            {option}
          </li>
        ))}
      </ul>

      <p>
        Selected: <b>{selectedAnswer ?? "None"}</b>
      </p>

      <button
        onClick={handleNext}
        disabled={!selectedAnswer}
        style={{
          ...styles.button,
          opacity: !selectedAnswer ? 0.5 : 1
        }}
      >
        Next Question
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    textAlign: "center"
  },

  question: {
    fontSize: "18px",
    marginBottom: "15px"
  },

  list: {
    listStyle: "none",
    padding: 0
  },

  option: {
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer"
  },

  selected: {
    backgroundColor: "#4dabf7",
    color: "white"
  },

  button: {
    marginTop: "15px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#228be6",
    color: "white"
  }
};

export default Quiz;