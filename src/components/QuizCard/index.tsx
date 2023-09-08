import React from "react";
import "./Questions.scss";

interface QuizCardProps {
  id: string;
  onClick: () => void;
  username: string;
  quizId: string;
  quantity: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  id,
  onClick,
  username,
  quizId,
  quantity,
}) => {
  return (
    <li key={id} className="quiz-wrapper" onClick={onClick}>
      <div className="question">
        <div className="username">
          <span>Username:</span>
          <span>{username}</span>
        </div>
        <div className="password">
          <span>Quiz ID:</span>
          <span>{quizId}</span>
        </div>
      </div>
      <div>
        <div>Questions:</div>
        <div>{quantity}</div>
      </div>
    </li>
  );
};

export default QuizCard;
