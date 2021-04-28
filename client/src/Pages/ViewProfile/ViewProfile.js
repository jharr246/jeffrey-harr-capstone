import React, { Component } from "react";
import axios from "axios";
import paw from "../../assets/Paw_Print.svg";
import "./ViewProfile.scss";

export default class ViewProfile extends Component {
  state = { currentProfile: "" };

  componentDidMount() {
    axios.get("http://localhost:8080/profiles/all").then((res) => {
      console.log(res.data);
      let findProfile = res.data.find((profile) => {
        return profile.id == this.props.match.params.id;
      });
      console.log(this.props.match.params);
      console.log(findProfile);
      this.setState({ currentProfile: findProfile });
      console.log(this.state.currentProfile.user.firstName);
    });
  }

  goBackHandler = () => {
    this.props.history.push("/");
  };

  render() {
    const { currentProfile } = this.state;
    return (
      <>
        <div className="home__bar">
          <p onClick={this.goBackHandler} className="home__welcome">
            Back
          </p>
          <img className="home-img" src={paw} alt="paw" />
          <button className="logout" onClick={this.logoutHandler} type="button">
            Logout
          </button>
        </div>
        <div className="profile">
          <div className="profile__name-img">
            <h1 className="profile__name">{currentProfile.dogName}</h1>
            <img
              className="profile__img"
              src={currentProfile.dogAvatar}
              alt="dog image"
            />
          </div>
          <div className="profile__details-container">
            <p className="profile__details">Breed: {currentProfile.breed}</p>

            <p className="profile__details">City: {currentProfile.city} </p>
            <p className="profile__details">State: {currentProfile.state}</p>
          </div>
        </div>
        <p className="profile__bio">About :</p>
        <p className="profile__bio">{currentProfile.dogBio}</p>
        <p className="profile__owner">
          Owner: {currentProfile.user?.firstName}
        </p>
      </>
    );
  }
}
