import React, { useState } from "react";
import LoginForm from "../SessionForms/LoginForm";
import SignupForm from "../SessionForms/SignupForm";
import "./MainPage.css";
import "../SessionForms/LoginForm.css";
import "../SessionForms/SignupForm.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom";
import sakura from "./sakuraGif.gif";

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

  const toggleDemoLogin = async () => {
    // Implement logic for demo login here if needed
    await dispatch(login({ email: "demo-user@appacademy.io", password: "password" }));
    history.push("/user/characters");
  };

  return (
    <div className="main-page">
      
      <img
        className="img-cont"
        src="https://wallpapers.com/images/hd/cute-aesthetic-tree-8-bit-aqw5erehju889dx6.jpg"
        alt="Blue Mountains"
      />
      <img className="sakura-gif" src={sakura} alt="Sakura GIF" />
      <div className="flex-container">
        <div className="cont">
          {/* Add the animated "Running Idle" text */}
          <p id="title">Running Idle</p>
          <div id="btns">
            <button onClick={toggleDemoLogin} className="special-button">
              Demo Login
            </button>
            <button onClick={toggleLoginForm} className="special-button">
              Login
            </button>
            <button onClick={toggleSignupForm} className="special-button">
              Sign Up
            </button>
           
          </div>
        </div>
      </div>
      <div className="links" id='actual-links'>
         Zi<a href="https://www.linkedin.com/in/tanzitian/"><img id='links1' src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"/>
      </a>
      <a href="https://github.com/Tanziti"><img id='links1' src=" https://img.icons8.com/sf-ultralight/52/000000/github.png"/>
      </a>
      Mo<a  href="https://www.linkedin.com/in/muhammad-amray-b94983207/"><img id='links2' src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"/>
      </a>
      <a href="https://github.com/muhammadamray"><img id='links2' src=" https://img.icons8.com/sf-ultralight/52/000000/github.png"/>
      </a>
      Avery<a href="https://www.linkedin.com/in/avery-berry-6a562a253/"><img id='links3'  src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"/>
      </a>
      <a  href="https://github.com/AveryRBerry"><img id='links3'  src=" https://img.icons8.com/sf-ultralight/52/000000/github.png"/>
      </a>
      Alex<a href="https://www.linkedin.com/in/alex-brown-85a330198/"><img id='links4' src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"/>
      </a>
      <a href="https://github.com/ajb-4"><img id='links4' src=" https://img.icons8.com/sf-ultralight/52/000000/github.png"/>
      </a>
      </div>
      <div className="links" id="char-pic-container">
      <img id="bio-pic"src='/assets/green_Outfit/green_Outfit_yellow_Shoes3.png'/>
      <img id="bio-pic1"src='/assets/red_Outfit/red_Outfit_red_Shoes7.png'/>
      <img id="bio-pic2"src='/assets/yellow_Outfit/yellow_Outfit_red_Shoes5.png'/>
      <img id="bio-pic"src='/assets/red_Outfit/red_Outfit_green_Shoes2.png'/>
      </div>
      <div className="leaderboard-button">
      <button id='runs-index-home-button' className="special-button" onClick={(e) => (history.push('/runs/'))}>Leaderboard</button>
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
