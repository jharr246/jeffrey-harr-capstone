import React, { Component } from "react";
import axios from "axios";
import paw from "../../assets/Paw_Print.svg";
import "./ViewProfile.scss";
import ProfileMeetList from "../../Components/ProfileMeetList/ProfileMeetList";

export default class ViewProfile extends Component {
  state = { currentProfile: "", meets: "" };

  componentDidMount() {
    this.setState({ profileMeets: true });
    axios
      .get(`http://localhost:8080/profiles/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data);

        this.setState({
          currentProfile: res.data.current,
          meets: res.data.meets,
        });
        console.log(this.state.meets);
      });
  }

  goBackHandler = () => {
    this.props.history.push("/");
  };

  render() {
    console.log(this.state.profileMeets);
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
        {this.state.meets ? (
          <div>
            {this.state.meets.map((meet) => {
              return (
                <>
                  <h1>{meet.parkName}</h1>
                  <p>{meet.date}</p>
                  <p>{meet.time}</p>
                  <p>{meet.parkAddress}</p>
                </>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
