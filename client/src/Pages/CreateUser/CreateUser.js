import React, { Component } from "react";
import axios from "axios";
import paw from "../../assets/Paw_Print.svg";
import "./CreateUser.scss";

export default class createUser extends Component {
  state = {
    formData: null,
  };

  handleChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users", this.state.formData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        this.props.history.push("/");
      })
      .catch((err) => alert(err));
  };

  render() {
    return (
      <div className="create">
        <h1 className="title">Create Account</h1>
        <form className="create__form" onSubmit={this.handleSubmit}>
          <div className="paw-container">
            <img className="paw" src={paw} alt="paw" />
            <label className="create__label" htmlFor="firstName">
              First name
              <input
                className="create__input"
                type="text"
                name="firstName"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <label className="create__label" htmlFor="lastName">
            Last name
            <input
              className="create__input"
              type="text"
              name="lastName"
              onChange={this.handleChange}
            />
          </label>
          <label className="create__label" htmlFor="email">
            Email
            <input
              className="create__input"
              type="email"
              name="email"
              onChange={this.handleChange}
            />
          </label>
          <label className="create__label" htmlFor="userName">
            User Name
            <input
              className="create__input"
              type="text"
              name="userName"
              onChange={this.handleChange}
            />
          </label>
          <label className="create__label" htmlFor="password">
            Password
            <input
              className="create__input"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </label>
          <input
            className="create__button"
            type="submit"
            value="Create Account"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
