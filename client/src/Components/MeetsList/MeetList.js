import React, { Component } from "react";

export default class MeetList extends Component {
  render() {
    return (
      <div>
        {this.props.meets.map((meet) => {
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
    );
  }
}
