// AuthContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { saveTokenToCookie } from "../utils/saveCookie";
import { getToken } from "../utils/getToken";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const token = document.cookie;
      if (!token || user) return;
      const res = await axios.get("http://localhost:5000/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken(token)}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  const login = async (userData) => {
    // Perform login logic here and set the user state
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        ...userData,
      });
      const { userId, token } = res.data;
      saveTokenToCookie(token);
      setUser(userId);
    } catch (error) {
      if (error.isAxiosError && !error.response) {
        throw new Error("Network Error"); // Throwing a custom network error
      }
      throw error; // Re-throw the original error if not a network error
    }
    setUser(userData);
  };

  const register = async (userData) => {
    // Perform login logic here and set the user state
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...userData,
      });
      setUser(userData);
    } catch (error) {
      if (error.isAxiosError && !error.response) {
        throw new Error("Network Error"); // Throwing a custom network error
      }
      throw error; // Re-throw the original error if not a network error
    }
  };
  const logout = () => {
    // Perform logout logic here and clear the user state
    // To remove a cookie by specifying its name
    const cookieName = "token"; // Replace 'token' with your cookie's name
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

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
