import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dogImage from "../../assets/cookie-the-pom-siNDDi9RpVY-unsplash.jpg";
import paw from "../../assets/Paw_Print.svg";
import "./Login.scss";
import swal from "@sweetalert/with-react";

export default class Login extends Component {
  state = {
    formData: null,
  };

  handleChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
    console.log(this.state.formData);
    this.setState({ input: e.target.value });
  };
  //Alerts if form is blank
  validate = (e) => {
    if (!this.state.formData) {
      swal("Please Sign-Up", "Use the sign-up button to get started", "info");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //checks if form is blank
    this.validate();

    axios
      .post("http://localhost:8080/users/login", this.state.formData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        this.props.history.push("/");
      })
      .catch((err) => {
        swal("Try Again!", "Your Passowrd was Incorrect ", "error");
      });
  };

  render() {
    return (
      <div className="login">
        <h1 className="logo">DogSpace</h1>
        <div className="iframe">
          <iframe
            src="https://giphy.com/embed/l4HogV6533Je2oG40"
            width="280"
            height="205"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>

        <img className="paw" src={paw} alt="paw" />
        <form className="login__form" onSubmit={this.handleSubmit}>
          <h2 className="login__title">Please Login</h2>
          <label className="login__labels" htmlFor="email">
            Email
            <input
              className="login__input"
              type="email"
              name="email"
              onChange={this.handleChange}
            />
          </label>
          <label className="login__labels" htmlFor="password">
            Password
            <input
              className="login__input"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </label>
          <div>
            <input className="login__button" type="submit" value="Login" />
            <Link to="/createUser">
              <button className="signUp">Sign-Up!</button>
            </Link>
          </div>
          <img className="login__img" src={dogImage} alt="dog" />
        </form>
      </div>
    );
  }
}
