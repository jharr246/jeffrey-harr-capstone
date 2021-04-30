import React, { Component } from "react";
import axios from "axios";
import paw from "../../assets/Paw_Print.svg";
import "./ViewProfile.scss";
import swal from "@sweetalert/with-react";

export default class ViewProfile extends Component {
  state = {
    currentProfile: "",
    meets: "",
    currentUser: "",
    parkName: "",
    date: "",
    time: "",
    parkAddress: "",
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");
    //get the current user data so the user id can be used to join a meet.
    axios
      .get("http://localhost:8080/users/current", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({ currentUser: res.data.user.id });
        console.log(res.data.user.id);
      });

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

  joinHandler = (meet) => {
    console.log(meet);
    console.log(meet.parkName);

    console.log(meet.date);
    console.log(meet.time);
    console.log(meet.parkAddress);
    // console.log(e.target.value);
    // console.log(e.target.id);
    // console.log(e.target.data);
    // axios.post("http://localhost:8080/meets", meetData).then((res) => {
    swal({
      title: "Join?",
      text: `Join ${this.state.currentProfile.dogName} at ${meet.parkName}?`,
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((join) => {
      if (join) {
        this.setState({
          parkName: meet.parkName,
          date: meet.date,
          time: meet.time,
          parkAddress: meet.parkAddress,
        });
        let joinData = {
          date: this.state.date,
          time: this.state.time,
          parkName: this.state.parkName,
          parkAddress: this.state.parkAddress,
          profile_id: this.state.currentUser,
        };
        console.log(joinData);
        axios.post("http://localhost:8080/meets", joinData).then((res) => {
          swal("Meet Joined!");
          this.props.history.push("/");
        });
      } else {
        swal("Join Canceled");
      }
    });
  };

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
        {this.state.meets ? (
          <div>
            {this.state.meets.map((meet) => {
              return (
                <>
                  <h1>{meet.parkName}</h1>
                  <button
                    onClick={this.joinHandler.bind(this, meet)}
                    name={meet.parkName}
                    id={meet.time}
                    value={meet.date}
                    data={meet.address}
                  >
                    Join
                  </button>
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
