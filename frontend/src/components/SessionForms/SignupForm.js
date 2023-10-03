// src/components/SessionForms/SignupForm.js

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearSessionErrors } from "../../store/session";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };

    dispatch(signup(user));
  };

  return (
    <form className="custom-signup-form" onSubmit={handleSubmit}>
      <h2 id="custom-signup-title">Sign Up Form</h2>

      <div className="signup-input-container">
        <input
          type="text"
          value={email}
          onChange={update("email")}
          placeholder="Email"
          className="signup-input-field"
        />
      </div>
      <div className="signup-input-container">
        <input
          type="text"
          value={username}
          onChange={update("username")}
          placeholder="Username"
          className="signup-input-field"
        />
      </div>
      <div className="signup-input-container">
        <input
          type="password"
          value={password}
          onChange={update("password")}
          placeholder="Password"
          className="signup-input-field"
        />
      </div>
      <div className="signup-input-container">
        <input
          type="password"
          value={password2}
          onChange={update("password2")}
          placeholder="Confirm Password"
          className="signup-input-field"
        />
      </div>
      <div>
        <input
          id="custom-signup-button"
          type="submit"
          value="Submit"
          disabled={!email || !username || !password || password !== password2}
        />
      </div>
      <div className="errors">{errors?.email}</div>
      <div className="errors">{errors?.username}</div>
      <div className="errors">{errors?.password}</div>
      <div className="errors">
        {password !== password2 && "Confirm Password field must match"}
      </div>
    </form>
  );
}

export default SignupForm;
