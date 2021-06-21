import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup, signin } from "../action/auth";

function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const [formErrors, setFormErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    ConfirmPasswordError: "",
  });

  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach((val) => {
      val === null && (valid = false);
    });

    return valid;
  };

  const switchMode = () => {
    setIsSignUp(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      console.log("signup");
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    switch (e.target.name) {
      case "firstName":
        formErrors.firstNameError =
          e.target.value.length < 4 ? "minimum 4 characaters required" : "";
        break;

      case "email":
        formErrors.emailError = emailRegex.test(e.target.value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.passwordError =
          e.target.value.length < 5 ? "minimum 5 characaters required" : "";
        break;
      case "confirmPassword":
        formErrors.ConfirmPasswordError =
          e.target.value.length < 5
            ? "minimum 5 characaters required and password should match"
            : "";
        break;
      default:
        break;
    }

    setFormErrors({ ...formErrors, [e.target.name]: e.target.value });
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        {isSignup ? (
          <>
            <h1>Create Account</h1>
          </>
        ) : (
          <h1>Sign in</h1>
        )}
        <form onSubmit={handleSubmit} noValidate>
          {isSignup && (
            <>
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  className={
                    formErrors.firstNameError.length > 0 ? "error" : null
                  }
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  noValidate
                  onChange={handleChange}
                />
                {formErrors.firstNameError.length > 0 && (
                  <span className="errorMessage">
                    {formErrors.firstNameError}
                  </span>
                )}
              </div>
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className={
                    formErrors.lastNameError.length > 0 ? "error" : null
                  }
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  noValidate
                  onChange={handleChange}
                />
                {formErrors.lastNameError.length > 0 && (
                  <span className="errorMessage">
                    {formErrors.lastNameError}
                  </span>
                )}
              </div>
            </>
          )}
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              className={formErrors.emailError.length > 0 ? "error" : null}
              placeholder="Email"
              type="email"
              name="email"
              noValidate
              onChange={handleChange}
            />
            {formErrors.emailError.length > 0 && (
              <span className="errorMessage">{formErrors.emailError}</span>
            )}
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              className={formErrors.passwordError.length > 0 ? "error" : null}
              placeholder="Password"
              type="password"
              name="password"
              noValidate
              onChange={handleChange}
            />
            {formErrors.passwordError.length > 0 && (
              <span className="errorMessage">{formErrors.passwordError}</span>
            )}
          </div>
          {isSignup && (
            <div className="ConfirmPassword">
              <label htmlFor="confirmPassword">ConfirmPassword</label>
              <input
                className={
                  formErrors.ConfirmPasswordError.length > 0 ? "error" : null
                }
                placeholder="ConfirmPassword"
                type="password"
                name="confirmPassword"
                noValidate
                onChange={handleChange}
              />
              {formErrors.ConfirmPasswordError.length > 0 && (
                <span className="errorMessage">
                  {formErrors.ConfirmPasswordError}
                </span>
              )}
            </div>
          )}

          <div className="createAccount">
            <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
          </div>
        </form>
        <div className="createAccount">
          <button onClick={switchMode}>
            {isSignup
              ? "Already have an Account ? Sign In"
              : "Don't have an Account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
