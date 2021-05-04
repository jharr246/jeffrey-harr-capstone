import React, { Component } from "react";
import swal from "@sweetalert/with-react";
import paw from "../../assets/Paw_Print.svg";
import "./Navbar.scss";

export default class navbar extends Component {
  logout = (e) => {
    sessionStorage.setItem("token", null);
    this.props.history.push("/login");
  };

  logoutHandler = (e) => {
    swal({
      title: "Log Out?",
      text: "Select okay to log out now",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((logout) => {
      if (logout) {
        this.logout();
        swal("Come back soon!", {
          icon: "success",
        });
      }
    });
  };

  render() {
    return (
      <div>
        <div className="home__bar">
          <p className="home__welcome">Hello {this.props.user}</p>
          <img className="home-img" src={paw} alt="paw" />
          <button className="logout" onClick={this.logoutHandler} type="button">
            Logout
          </button>
        </div>
      </div>
    );
  }
}
