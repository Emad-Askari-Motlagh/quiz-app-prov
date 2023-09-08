import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Questions from "./pages/questions";
import PrimaryLayout from "./components/Layout";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./HO/ProtectedRoute";
import AllQuizes from "./pages/AllQuizes";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route element={<PrimaryLayout user={user} />}>
          <Route index path="/" element={<Home />} />
          <Route
            path="/quiz/questions/:index"
            element={
              <ProtectedRoute user={user}>
                <Questions />
              </ProtectedRoute>
            }
          />
          <Route path="/quiz/all" element={<AllQuizes />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
