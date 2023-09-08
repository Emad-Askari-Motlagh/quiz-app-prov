import React, { useState } from "react";
import "./Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = ({ user }) => {
  const [isOpenDropdown, setDropdown] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <span className="material-symbols-outlined">flag_circle</span>
      </div>

      <div className="nav--row">
        <nav>
          <ul>
            <li>{user?.email}</li>
            <li className="nav--hidden--mobile">
              <NavLink to="/">Home</NavLink>
            </li>

            <li onClick={user ? logout : () => navigate("/auth/register")}>
              <span className="login-nav-link">
                {!user ? "Register" : "Logout"}
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
