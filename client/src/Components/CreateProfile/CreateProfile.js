import axios from "axios";
import React, { Component } from "react";
import { storage } from "../../firebase/firebase";
import "./CreateProfile.scss";
import paw from "../../assets/Paw_Print.svg";
import swal from "@sweetalert/with-react";

export default class createProfile extends Component {
  state = {
    formData: null,
    file: null,
    profileUrl: null,
    uploadProgress: 0,
  };

  // captures data to be sent on handleSubmit function

  handleChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
        dogAvatar: this.state.profileUrl,
        user_id: this.props.user.user.id,
      },
    });
  };

  //handle state of file to then pass to firebase. Resets profile preview if user chooses to upload a different photo.
  handleProfileImg = (e) => {
    this.setState({ file: e.target.files[0] });
    this.setState({ profileUrl: null });
  };

  // upload image to firebase storage and set state of profileURL to get image url. Will also display progress bar by setting state of uploadProgess
  handleAvatar = (e) => {
    const uploadTask = storage
      .ref(`profiles/${this.state.file.name}`)
      .put(this.state.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ uploadProgress: progress });
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("profiles")
          .child(this.state.file.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ profileUrl: url });
            console.log(this.state.profileUrl);
            this.setState({ file: null });
            this.setState({ uploadProgress: 0 });
          });
      }
    );
  };

  //submit to backend

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/profiles", this.state.formData)
      .then((res) => {
        swal({
          title: res.data,
          text: "Lets sniff some butts!",
          icon: "success",
          button: "See My Profile",
        });
        this.props.close();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    if (this.props.modal) {
      return null;
    }

    return (
      <div className="background">
        <div className="create-profile">
          <h1 className="create-profile__title">
            Lets Complete Your Dog's Profile!
          </h1>
          <form onSubmit={this.handleSubmit}>
            <label
              className="create-profile__label create-profile__label--avatar "
              htmlFor="dogAvatar"
            >
              Profile Photo - DOGS ONLY!
              <img
                className={this.state.profileUrl ? "create-profile__img" : " "}
                src={this.state.profileUrl}
                alt=""
              />
              <div className="upload-button">
                Select <img className="upload-button__img" src={paw} />
              </div>
              <input
                className="create-profile__img--upload"
                type="file"
                accept="image/*"
                id="dogAvatar"
                name="dogAvatar"
                onChange={this.handleProfileImg}
              />
            </label>
            {this.state.file ? (
              <>
                <div className="file-name">{this.state.file.name}</div>
                <progress
                  className="file-upload"
                  value={this.state.uploadProgress}
                  max="100"
                />
                <button
                  type="button"
                  className="upload-button upload-firebase"
                  onClick={this.handleAvatar}
                >
                  Upload
                  <img className="upload-button__img" src={paw} />
                </button>
              </>
            ) : (
              <div></div>
            )}
            <label className="create-profile__label" htmlFor="dogName">
              Your Dog's Name
              <input
                className="create-profile__input"
                type="text"
                name="dogName"
                onChange={this.handleChange}
              />
            </label>
            <label className="create-profile__label" htmlFor="dogBio">
              Tell us about your dog
              <textarea
                className="create-profile__input create-profile__input--bio"
                name="dogBio"
                onChange={this.handleChange}
              ></textarea>
            </label>
            <label className="create-profile__label" htmlFor="breed">
              Breed
              <input
                className="create-profile__input"
                type="text"
                name="breed"
                onChange={this.handleChange}
              />
            </label>
            <label className="create-profile__label" htmlFor="city">
              City
              <input
                className="create-profile__input"
                name="city"
                type="text"
                onChange={this.handleChange}
              />
            </label>
            <label className="create-profile__label" htmlFor="state">
              State
              <input
                className="create-profile__input"
                name="state"
                type="text"
                onChange={this.handleChange}
              />
            </label>
            <input
              className="create-profile__submit"
              type="submit"
              value="Create Profile"
            />
          </form>
        </div>
      </div>
    );
  }
}
