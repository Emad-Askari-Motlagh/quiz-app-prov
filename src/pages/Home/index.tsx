import React from "react";
import "./Home.scss";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useQuiz from "../../hooks/useQuiz";

export default function Home() {
  const [quizNumber, setQuizNumber] = React.useState<number>(0); // Specify the type for quizNumber as number
  const { user } = useAuth();
  const location = useLocation();
  const { addQuiz, addQuestionToQuiz } = useQuiz();
  return (
    <div className="home-container">
      <div className="content-parent">
        <h1>Geo Quiz</h1>
        <h2>Test your knowledge on GEO</h2>

        <Link className="begin-button" to={user ? `quiz/all` : "/auth/login"}>
          See All Users Quizes
        </Link>
        <br />
        <button onClick={addQuiz} className="begin-button">
          Make a quiz
        </button>
        <button onClick={addQuestionToQuiz} className="begin-button">
          Add Question
        </button>
      </div>
    </div>
  );
}
