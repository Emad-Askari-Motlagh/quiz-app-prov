import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

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
}

export default function useQuiz(): QuizHook {
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

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

  return { getAllQuizes, quizes, loading, error };
}
