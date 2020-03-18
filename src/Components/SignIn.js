import React, { useState, useEffect } from "react";
import "../App.css";
import logo from "../logo.png";
import logo1 from "../logo1.png";
import signinback from "../Images/signinback.png";
import Axios from "axios";
import { Redirect } from "react-router-dom";
function SignIn() {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [UserNameError, setUSerNameError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [LogInError, setLogInError] = useState("");
  const changehandler = event => {
    switch (event.target.name) {
      case "UserName":
        setUserName(event.target.value);
        event.target.value.length < 3
          ? setUSerNameError("Please Provide Valid UserName")
          : setUSerNameError("");
        return;
      case "Password":
        setPassword(event.target.value);
        event.target.value.length < 6
          ? setPasswordError("Atleast 6 chars Needed")
          : setPasswordError("");
        return;
    }
  };

  const formValid = () => {
    var valid = true;
    if (
      UserNameError.length > 0 ||
      PasswordError.length > 0 ||
      UserName.length < 1 ||
      Password.length < 1
    ) {
      valid = false;
    }
    return valid;
  };

  const redirectToHome = () => {
    if (redirect) {
      return <Redirect to="/home" />;
    }
  };

  const submitHandler = async event => {
    event.preventDefault();
    const valid = formValid();
    const body = {
      UserName,
      Password
    };
    if (valid) {
      const res = await Axios.post("http://localhost:3001/user/login", body);
      if (res.status == 200) {
        sessionStorage.setItem("UserDetails", JSON.stringify(res.data));
        setLogInError("");
        setRedirect(true);
      }
    }
  };
  useEffect(() => {
    redirectToHome();
  }, [redirect]);

  useEffect(() => {
    console.log(LogInError);
  }, [LogInError]);

  return (
    <React.Fragment>
      {redirectToHome()}
      <div className="SignIn-Main-Container">
        <div className="signin-background">
          <img src={signinback} alt="" />
        </div>
        <div className="signin-container">
          <div className="signin-form-container">
            <div className="form-Image">
              <img src={logo1} alt="" />
              <h3>Sign In Here</h3>
            </div>
            <h2>Sign In Here</h2>
            <div className="icons-container">
              <div className="icon">
                <i className="fa fa-facebook-f"></i>
              </div>
              <div className="icon">
                <i className="fa fa-google-plus"></i>
              </div>
              <div className="icon">
                <i className="fa fa-linkedin"></i>
              </div>
            </div>
            <div className="inputs-container">
              <span>or use UserName to Sign In</span>
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="UserName"
                  name="UserName"
                  onChange={changehandler}
                />
                {UserNameError.length > 0 ? (
                  <span style={{ color: "red", marginTop: "-12px" }}>
                    {UserNameError}
                  </span>
                ) : null}
                <input
                  type="password"
                  placeholder="Password"
                  name="Password"
                  onChange={changehandler}
                />
                {PasswordError.length > 0 ? (
                  <span style={{ color: "red", marginTop: "-12px" }}>
                    {PasswordError}
                  </span>
                ) : null}
                <button type="submit">Sign In!</button>
                {LogInError.length > 0 ? (
                  <span style={{ color: "red", marginTop: "-12px" }}>
                    {LogInError}
                  </span>
                ) : null}
              </form>
            </div>
          </div>
          <div className="signin-form-intro">
            <img src={logo} alt="" />
            <h3>Welcome Back!</h3>
            <p>
              To keep connected with us please login with your Personal Info
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignIn;
