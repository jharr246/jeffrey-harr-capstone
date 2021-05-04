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
        <div className="title-header">
          <h1 className="logo">DogSpace</h1>
          <div className="iframe">
            <iframe
              className="iframe-dogs"
              src="https://giphy.com/embed/l4HogV6533Je2oG40"
              width="280"
              height="200"
              frameBorder="0"
              class="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="desktop-login">
          <form className="login__form" onSubmit={this.handleSubmit}>
            <div className="login__header">
              <h2 className="login__title">Please Login</h2>
              <img className="login-paw" src={paw} alt="paw" />
            </div>
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
          </form>
          <div className="login__img">
            <div className="opacity">
              <p className="img-letters">Social Media for Dogs</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
