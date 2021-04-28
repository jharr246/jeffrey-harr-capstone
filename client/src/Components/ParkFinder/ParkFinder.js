import React, { Component } from "react";
import axios from "axios";
import "./ParkFinder.scss";

export default class ParkFinder extends Component {
  state = {
    parkList: "",
    city: "",
    st: "",
    formDetails: false,
  };

  parkFinderHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=dogpark+in+${this.state.city}+${this.state.st}&key=AIzaSyDIOdpFuixBdQIFMkjmgFUPc-KvD2u7Q44`
      )
      .then((res) => {
        this.setState({ parkList: res.data.results });

        console.log(this.state.parkList);
      });
  };

  handleClose = (e) => {
    this.setState({ parkList: "", city: "", state: "" });
  };
  handleFormDetails = (e) => {
    this.setState({ formDetails: true });
  };
  formDetailsClose = (e) => {
    this.setState({ formDetails: false, parkList: "" });
  };

  render() {
    return (
      <div className="park-container">
        <div>
          <div className="options-container">
            <p className="park-label">ParkFinder:</p>

            {!this.state.formDetails ? (
              <>
                <form onSubmit={this.parkFinderHandler}>
                  <input
                    className="finder-submit"
                    type="submit"
                    value="Near Me"
                  />
                </form>
                <p className="options">OR</p>
                <button
                  className="finder-submit city-submit"
                  onClick={this.handleFormDetails}
                >
                  City Search
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
          {this.state.formDetails ? (
            <>
              <form className="park-finder" onSubmit={this.parkFinderHandler}>
                <input
                  className="finder-city"
                  type="text"
                  placeholder="City"
                  onChange={(e) => this.setState({ city: e.target.value })}
                />
                <input
                  className="finder-state"
                  type="text"
                  placeholder="State"
                  onChange={(e) => this.setState({ st: e.target.value })}
                />
                <div>
                  <input
                    className="finder-submit details-submit"
                    type="submit"
                    value="Search"
                  />
                  <button
                    className="finder-submit"
                    onClick={this.formDetailsClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <></>
          )}
        </div>
        {!this.state.formDetails ? <div className="park__border"></div> : <></>}
        {this.state.parkList ? (
          <>
            <div className="parklist__header">
              <p className="parklist__header--close" onClick={this.handleClose}>
                X CLOSE
              </p>
              <p>{this.state.parkList.length} Results</p>
            </div>
            <div className="park-iframe">
              <iframe
                src="https://giphy.com/embed/QXhSr6NDR4F5t69GL8"
                width="180"
                height="180"
                frameBorder="0"
                class="giphy-embed"
                allowFullScreen
              ></iframe>
            </div>
          </>
        ) : (
          <></>
        )}

        {this.state.parkList ? (
          this.state.parkList.map((park) => {
            return (
              <div
                className="results-list"
                value={park.name}
                name={park.name}
                address={park.address}
                onClick={this.props.parkSelect}
                id={park.place_id}
              >
                <div>
                  <p className="results results__name">{park.name}</p>
                  <p className="results results__rating">
                    Rating: {park.rating}
                  </p>
                </div>
                <p className="results results__address">
                  {park.formatted_address}
                </p>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    );
  }
}
