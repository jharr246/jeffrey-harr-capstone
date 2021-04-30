import React, { Component } from "react";
import axios from "axios";
import "./home.scss";
import CreateProfile from "../../Components/CreateProfile/CreateProfile";
import swal from "@sweetalert/with-react";
import Search from "../../Components/AllProfiles/AllProfiles";
import paw from "../../assets/Paw_Print.svg";
import ParkFinder from "../../Components/ParkFinder/ParkFinder";
import { Link } from "react-router-dom";
import MeetList from "../../Components/MeetsList/MeetList";

export default class Home extends Component {
  state = {
    user: null,
    profile: [],
    search: "",
    meets: [],
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    axios
      .get("http://localhost:8080/users/current", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          user: res.data,
          profile: res.data.user.profile[0],
          meets: res.data.meets,
        });
        console.log(res.data);
      });
  }
  //function to logout user
  logout = (e) => {
    sessionStorage.setItem("token", null);
    this.props.history.push("/login");
  };
  //onClick alert to confirm user logout
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

  // close create profile modal by setting state of profile after profile form submit.

  close = (e) => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:8080/users/current", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          profile: res.data.user.profile[0],
        });
        console.log(res.data.user.profile[0]);
      });
  };

  render() {
    console.log(this.state.meets);
    return (
      <>
        <CreateProfile
          modal={this.state.profile}
          user={this.state.user}
          close={this.close}
        />
        <div className="home">
          <div className="home__bar">
            <p className="home__welcome">
              Hello {this.state.user?.user.firstName}
            </p>
            <img className="home-img" src={paw} alt="paw" />
            <button
              className="logout"
              onClick={this.logoutHandler}
              type="button"
            >
              Logout
            </button>
          </div>

          <h2 className="profile__title">Your Profile</h2>
        </div>
        {/* display profile data after profile form submit */}
        {this.state.profile ? (
          <>
            <div className="profile">
              <div className="profile__name-img">
                <h1 className="profile__name">{this.state.profile.dogName}</h1>
                <img
                  className="profile__img"
                  src={this.state.profile.dogAvatar}
                  alt=""
                />
              </div>
              <div className="profile__details-container">
                <p className="profile__details">
                  Breed: {this.state.profile.breed}
                </p>

                <p className="profile__details">
                  City: {this.state.profile.city}
                </p>
                <p className="profile__details">
                  State: {this.state.profile.state}
                </p>
              </div>
            </div>
            <p className="profile__bio">About {this.state.profile.dogName}:</p>
            <p className="profile__bio"> {this.state.profile.dogBio}</p>
            <p className="home__border"></p>
            <div className="search-container">
              <Search />
            </div>
            <p className="home__border"></p>
            <div className="search-park-container">
              <h1 className="home__park-title">Find Dog Parks!</h1>
              <ParkFinder />
            </div>
          </>
        ) : (
          <div></div>
        )}
        {this.state.profile ? (
          <div>
            <Link to={`/meet/${this.state.profile.id}`}>
              <p>Create Meet</p>
            </Link>

            <MeetList
              meets={this.state.meets}
              homeMeets={this.state.homeMeets}
            />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
