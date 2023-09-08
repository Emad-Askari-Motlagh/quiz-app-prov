import React, { useEffect, useState } from "react";
import "./Questions.scss";
import { fetchAllQuestions } from "../../utils/fetchQuestions";
import { useParams } from "react-router-dom";
import Map from "../../components/Map";

interface Question {
  question: string;
  location?: {
    longitude: number;
    latitude: number;
  };
}

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const params = useParams<{ index: string }>();

  useEffect(() => {
    getQuiz();
  }, [params]);

  async function getQuiz() {
    try {
      const res: any = await fetchAllQuestions(params.index as string);

      setQuestions([...res.questions]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ul>
      {questions?.length &&
        questions.map((res, i) => {
          return (
            <li
              className="map-list"
              key={i}
              style={{ color: "wheat", listStyle: "none" }}
            >
              <div className="question">
                <span>Question number {i + 1}:</span>{" "}
                <span>{res.question}</span>
              </div>
              {res.location?.longitude && res.location?.latitude && (
                <Map lng={res.location.longitude} lat={res.location.latitude} />
              )}
            </li>
          );
        })}
    </ul>
  );
}
