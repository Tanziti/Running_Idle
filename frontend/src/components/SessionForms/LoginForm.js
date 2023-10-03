// src/components/SessionForms/LoginForm.js

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import NavBar from "../NavBar/NavBar";
import { Link, useHistory } from "react-router-dom";

import { login, clearSessionErrors } from "../../store/session";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(login({ email, password }));

    if (success) {
      // Redirect to the desired URL after successful login
      history.push("/user/characters");
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 id="log-title">Log In Form</h2>

        <div className="input-container">
          <input
            type="text"
            value={email}
            onChange={update("email")}
            placeholder="Email"
            className="input-field"
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
            className="input-field"
          />
        </div>{/*changed from label*/}
        {/* <Link to="/user/characters"> */}
          <input id="lg-bt" type="submit" value="Submit" disabled={!email || !password} />
        {/* </Link> */}
      </form>
      <div>
        <div className="errors">{errors?.email}</div>
        <div className="errors">{errors?.password}</div>
      </div>
    </>
  );
}

export default LoginForm;
