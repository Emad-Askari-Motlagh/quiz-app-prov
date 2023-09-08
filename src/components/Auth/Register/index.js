import React, { useEffect, useState } from "react";
import "./Register.scss";
import Input from "../../Input";
import Button from "../../Button";
import useAuth from "../../../hooks/useAuth";
import {
  useNavigate,
  useLocation,
  useNavigation,
  Link,
} from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic email format validation using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email);

    if (email === "" || !isEmailValid) {
      setIsFormValid(false);
      setError("Email is not a valid email");
    } else if (password === "" || repeatPassword === "") {
      setIsFormValid(false);
      setError("Fill the password please");
    } else {
      setIsFormValid(true);
      setError("");
      try {
        await register({ username: email, password });
        // router("/");
      } catch (error) {
        setIsFormValid(false);
        setError("Error on registration");
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your email"
          label="Email"
          value={email}
          handleChange={handleEmailChange}
        />
        <Input
          type="password"
          placeholder="Enter your Password"
          label="Password"
          value={password}
          handleChange={handlePasswordChange}
        />
        <Input
          type="password"
          placeholder="Repeat your Password"
          label="Password Repeat"
          value={repeatPassword}
          handleChange={handleRepeatPasswordChange}
        />
        {!isFormValid && error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit" width="100%" label="Register now" />
        <Link style={{ marginTop: "1rem", color: "tomato" }} to="/auth/login">
          Do you already have an account?
        </Link>
      </form>
    </div>
  );
}
