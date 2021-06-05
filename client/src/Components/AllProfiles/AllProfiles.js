import React, { Component } from "react";
import axios from "axios";
import "./AllProfiles.scss";
import { Link } from "react-router-dom";

export default class AllUsers extends Component {
  state = { profileList: [], search: "" };

  componentDidMount() {
    axios.get("http://localhost:8080/profiles/all").then((res) => {
      this.setState({ profileList: res.data });
    });
  }

  render() {
    console.log(this.props.profile);

    return (
      <div className="profile__list">
        <div className="search-container">
          <p className="search-title">DogFinder :</p>
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            onChange={(e) => this.setState({ search: e.target.value })}
          />
        </div>
        {this.state.search ? (
          <div className="search-active">
            <iframe
              src="https://giphy.com/embed/YURoWBin6OOfBd9Uv8"
              width="150"
              height="156"
              frameBorder="0"
              class="giphy-embed"
              allowFullScreen
            ></iframe>
            <div className="search-active__description">
              <p>Search by: </p>
              <p>Breed</p>
              <p>Dog Name</p>
              <p>{this.state.profileList.length}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        {this.state.profileList
          .filter((value) => {
            if (this.state.search == "") {
              return null;
            } else if (
              value.dogName
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
            ) {
              return value;
            } else if (
              value.breed
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
            ) {
              return value;
            }
          })
          .map((profile) => {
            return (
              <div className="profile__container">
                <div>
                  <h1 className="profile__dog-name">{profile.dogName}</h1>

                  <h2 className="profile__breed">{profile.breed}</h2>
                  <Link to={`/profile/${profile.id}`}>
                    <h3 className="profile__link">More Info</h3>
                  </Link>
                </div>
                <div>
                  <img className="profile__list-img" src={profile.dogAvatar} />
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
