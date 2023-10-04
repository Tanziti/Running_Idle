import React, { useState } from "react";
import LoginForm from "../SessionForms/LoginForm";
import SignupForm from "../SessionForms/SignupForm";
import "./MainPage.css";
import "../SessionForms/LoginForm.css";
import "../SessionForms/SignupForm.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom";

function MainPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowSignupForm(false);
  };

  const toggleSignupForm = () => {
    setShowSignupForm(!showSignupForm);
    setShowLoginForm(false);
  };

  const toggleDemoLogin = () => {
    // Implement logic for demo login here if needed
    dispatch(login({email: 'demo-user@appacademy.io', password: 'password' }))
    history.push("/user/characters");
  };

  return (
    <div className="main-page">
      <img
        className="img-cont"
        src="https://wallpapers.com/images/hd/cute-aesthetic-tree-8-bit-aqw5erehju889dx6.jpg"
        alt="Blue Mountains"
      />
      <div className="flex-container">
        <div className="cont">
          <p id="title">Running Idle</p>
          <div id="btns">
            <button onClick={toggleDemoLogin} className="special-button">
              Demo Login
            </button>
            <button onClick={toggleLoginForm} className="special-button">Login</button>
            <button onClick={toggleSignupForm} className="special-button">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div id="forms">
        {/* Show login form if showLoginForm is true */}
        {showLoginForm && <LoginForm />}

        {/* Show signup form if showSignupForm is true */}
        {showSignupForm && <SignupForm />}
      </div>
    </div>
  );
}

export default MainPage;
