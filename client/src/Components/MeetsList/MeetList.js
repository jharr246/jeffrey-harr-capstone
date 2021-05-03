import React, { Component } from "react";
import "./MeetList.scss";

export default class MeetList extends Component {
  render() {
    return (
      <div>
        {this.props.meets.map((meet) => {
          return (
            <div className="meets__container">
              <h1 className="meets__park">{meet.parkName}</h1>
              <div className="meets__details">
                <div className="meets__date">
                  <p className="meets__day">{meet.date}</p>
                  <p className="meets__time">{meet.time}</p>
                </div>
                <p className="meets__address">{meet.parkAddress}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
