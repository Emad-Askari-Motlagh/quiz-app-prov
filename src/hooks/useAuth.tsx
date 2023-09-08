import axios, { AxiosResponse } from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { saveTokenToCookie } from "../utils/saveCookie";
import { getToken } from "../utils/getToken";

interface User {
  userId: string | null;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  login: (userData: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  async function getUser() {
    try {
      const token = document.cookie;
      if (!token || user) return;

      const res = (await axios.get("http://localhost:5000/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken(token)}`,
        },
      })) as AxiosResponse<User>;

      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const login = async (userData: any) => {
    try {
      const res = await axios.post(
        "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login",
        {
          username: "emad",
          password: "emad",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(res.data);
      const { userId, token } = res.data;
      saveTokenToCookie(token);
      setUser({ userId });
    } catch (error) {
      if (axios.isAxiosError(error) && !error.response) {
        throw new Error("Network Error");
      }
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const res = await axios.post(
        "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup",
        {
          username: "emad",
          password: "emad",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setUser({ userId: res.data.userId });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && !error.response) {
        throw new Error("Network Error");
      }
      throw error;
    }
  };

  const logout = () => {
    const cookieName = "token";
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    setUser(null);
    setTimeout(() => {
      document.location.reload();
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
