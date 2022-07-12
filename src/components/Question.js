import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Question extends Component {
  render() {
    const { name, avatarURL } = this.props.author;
    const { id, optionOne, optionTwo } = this.props.question;
    const { isAnswered } = this.props;
    return (
      <div className="question-item">
        <div className="question-item-author">created by {name}</div>
        <div className="question-item-content">
          <div>
            <img src={avatarURL} alt="avatar" className="user-avatar" />
          </div>
          <span className="vertical-hr" />
          <div>
            <span className="question-title">Would you rather</span>
            <p
              className="question-parag"
            >
              {optionOne.text}
            </p>
            <p
              className="question-parag"
            >
              {optionTwo.text}
            </p>
            <Link className="poll-btn" to={`questions/${id}`}>
              {!isAnswered ? "Answer" : "View Results"}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, questions }, { id }) => {
  const question = questions[id];
  let { author } = question;
  author = users[author];

  return {
    question,
    author
  };
};

export default connect(mapStateToProps)(Question);
