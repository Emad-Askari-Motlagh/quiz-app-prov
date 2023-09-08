import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";

interface Quiz {
  quizId: string;
  questions: [];
  userId: string;
  username: string;
  // Define the rest of the properties in the Quiz object
}

interface QuizResponse {
  quizzes: Quiz[];
  // Define the rest of the properties in the response
}

interface QuizHook {
  getAllQuizes: () => Promise<void>;
  quizes: Quiz[];
  loading: boolean;
  error: Error | null;
  addQuiz: React.MouseEventHandler<HTMLButtonElement>;
  addQuestionToQuiz: React.MouseEventHandler<HTMLButtonElement>;
  getQuizByNameAndId: React.MouseEventHandler<HTMLButtonElement>;
}

export default function useQuiz(): QuizHook {
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  async function getQuizByNameAndId() {
    const axiosInstance = axios.create({
      baseURL: "",
      headers: {
        Authorization: `Bearer ${getToken(document.cookie)}`, // Assuming it's a Bearer token
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    axiosInstance
      .get(
        "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/emiii/emad"
      )
      .then((response) => {
        // Handle the response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
  async function addQuestionToQuiz(requestData) {
    const axiosInstance = axios.create({
      baseURL: "",
      headers: {
        Authorization: `Bearer ${getToken(document.cookie)}`, // Assuming it's a Bearer token
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Make a POST request with the request data in the body
    axiosInstance
      .post(
        "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question",
        requestData
      )
      .then((response) => {
        // Handle the response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
  async function addQuiz() {
    const axiosInstance = axios.create({
      baseURL: "",
      headers: {
        Authorization: `Bearer ${getToken(document.cookie)}`, // Assuming it's a Bearer token
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Define the request data that you want to send in the request body
    const requestData = {
      name: "emiii",
    };

    // Make a POST request with the request data in the body
    axiosInstance
      .post(
        "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz",
        requestData
      )
      .then((response) => {
        // Handle the response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
  async function getAllQuizes() {
    setLoading(true);
    try {
      const res: AxiosResponse<QuizResponse> = await axios.get(
        "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz",
        { headers: { "Content-Type": "application/json" } }
      );
      setQuizes([...res.data.quizzes]);
      setError(null);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllQuizes();
  }, []);

  return {
    getAllQuizes,
    quizes,
    loading,
    error,
    addQuiz,
    addQuestionToQuiz,
    getQuizByNameAndId,
  };
}
