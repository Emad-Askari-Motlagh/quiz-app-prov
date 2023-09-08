import React, { useEffect, useState } from "react";
import "./Questions.scss";
import useQuiz from "../../hooks/useQuiz";
import { useNavigate } from "react-router-dom";
import useLocation from "../../hooks/useLocation";
import QuizCard from "../../components/QuizCard";

interface Quiz {
  quizId: string;
  username: string;
  userId: string;
  questions?: any[];
}

export default function AllQuizes() {
  const { quizes } = useQuiz();
  const navigate = useNavigate();
  const { location } = useLocation();

  useEffect(() => {
    console.log(location);
  }, [quizes]);

  function getQuiz(id: string) {
    navigate(`/quiz/questions/${id}`);
  }

  return (
    <ul className="quizess-container">
      {quizes?.length &&
        quizes.map((res, i) => {
          return (
            <QuizCard
              id={res.quizId}
              username={res.username}
              quizId={res.quizId}
              onClick={() => getQuiz(res.userId)}
              quantity={res.questions?.length - 1}
              key={i} // Add a unique 'key' prop to each QuizCard component
            />
          );
        })}
    </ul>
  );
}
