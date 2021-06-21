import React, { Component } from "react";


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;


  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });



  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};



class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      ConfirmPassword: null,

      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        ConfirmPassword: ""

      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
        ConfirmPassword: ${this.state.ConfirmPassword}

      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 5 ? "minimum 5 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 5 ? "minimum 5 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
        case "ConfirmPassword":
        formErrors.ConfirmPassword =
          value.length < 6? "minimum 6 characaters required and password should match" : "";


      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="ConfirmPassword">
              <label htmlFor="ConfirmPassword">ConfirmPassword</label>
              <input
                className={formErrors.ConfirmPassword.length > 0 ? "error" : null}
                placeholder="ConfirmPassword"
                type="password"
                name="ConfirmPassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.ConfirmPassword.length > 0 && (
                <span className="errorMessage">{formErrors.ConfirmPassword}</span>
              )}
            </div>


            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?Goto SignIn.</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupScreen;