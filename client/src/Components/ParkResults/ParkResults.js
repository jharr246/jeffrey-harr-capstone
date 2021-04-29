import React, { Component } from "react";

export default class ParkResults extends Component {
  render() {
    return (
      <div className="results-list" id={this.props.id}>
        <div>
          {this.props.parkButton ? (
            <button
              onClick={this.props.parkSelect}
              id={this.props.address}
              name={this.props.name}
            >
              select
            </button>
          ) : (
            <></>
          )}
          <p className="results results__name">{this.props.name}</p>
          <p className="results results__rating">Rating: {this.props.rating}</p>
        </div>
        <p className="results results__address">{this.props.address}</p>
      </div>
    );
  }
}
