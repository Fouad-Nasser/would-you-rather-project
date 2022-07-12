import React, { Component } from "react";
import { connect } from "react-redux";
import LeaderStatistics from "./LeaderStatistics";

class Leaderboard extends Component {
  render() {
    const{usersId} = this.props; 
    return (
      <div>
        {
        usersId.map((user) => {
          return (
            <LeaderStatistics key={user} id={user}/>
          );
        })}
      </div>
    );
  }
}

const getCount = (user) => {
  return user.questions.length + Object.keys(user.answers).length;
};

const mapStateToProps = ({ users }) => {
  return {
    authedUser: users.authedUser,
    usersId: Object.keys(users).sort(
      (a, b) => getCount(users[b]) - getCount(users[a])
    ),
  };
};

export default connect(mapStateToProps)(Leaderboard);
