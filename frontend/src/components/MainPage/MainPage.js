import React, { useState } from "react";
import LoginForm from "../SessionForms/LoginForm";
import SignupForm from "../SessionForms/SignupForm";
import "./MainPage.css";

function MainPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

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
            <button onClick={toggleDemoLogin}>Demo Login</button>
            <button onClick={toggleLoginForm}>Login</button>
            <button onClick={toggleSignupForm}>Sign Up</button>
          </div>
        </div>
        <div id="forms">
          {/* Show login form if showLoginForm is true */}
          {showLoginForm && <LoginForm />}

          {/* Show signup form if showSignupForm is true */}
          {showSignupForm && <SignupForm />}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
