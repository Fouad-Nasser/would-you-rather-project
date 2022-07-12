import React, { Component } from "react";
import { connect } from "react-redux";

class LeaderStatistics extends Component {
  render() {
    const {name, avatarURL, questions, answers } = this.props.user;
    const answeredQuestions = Object.keys(answers).length;
    const createdQuestions = questions.length;
    const totalPoints = answeredQuestions + createdQuestions;
    return (
      <div className="leaderboard-item">
        <img src={avatarURL} alt="avatar" className="user-avatar" />
        <span className="vertical-hr" />
        <div>
          <span className="leader-title">{name}</span>
          <p>Created Questions : {createdQuestions}</p>
          <hr />
          <p>Answered Questions : {answeredQuestions}</p>
        </div>
        <div className="score-board">
          <p>
            Score <br />
            <br /> {totalPoints}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }, { id }) => {
  return {
    user: users[id],
  };
};

export default connect(mapStateToProps)(LeaderStatistics);
