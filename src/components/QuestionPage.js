import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/users";
import Result from "./Result";



class QuestionPage extends Component {
  handlePoll = (option) => {
    const { auth, question } = this.props;

    this.props.dispatch(
      handleSaveQuestionAnswer(auth, question.id, option)
    );
  };

  render() {
    const { isNotExists, history } = this.props;
    // if question is not exist go to not match page
    if (isNotExists) {
      history.push("/error404");
      return null;
    }
    const { question, author, isAnswered, vote } = this.props;
    const { name, avatarURL } = author;
    const { optionOne, optionTwo } = question;
    return (
      <div>
        <div className="question-item">
          <div className="question-item-author">created by {name}</div>
          <div className="question-item-content">
            <div>
              <img src={avatarURL} alt="avatar" className="user-avatar" />
            </div>
            <span className="vertical-hr" />
            <div>
              <span className="question-title">Would you rather</span>
              {isAnswered ? (
                <div>
                  <Result
                    text={optionOne.text}
                    optionOneVote={optionOne.votes.length}
                    optionTowVote={optionTwo.votes.length}
                    vote={vote === "optionOne"}
                    isoptionOneVote={true}
                  />
                  <Result
                    text={optionTwo.text}
                    optionOneVote={optionOne.votes.length}
                    optionTowVote={optionTwo.votes.length}
                    vote={vote === "optionTwo"}
                    isoptionOneVote={false}
                  />
                </div>
              ) : (
                <div className="answer-btn-div">
                  <button
                    className="answer-btn"
                    onClick={() => this.handlePoll("optionOne")}
                  >
                    {optionOne.text}
                  </button>
                  <button
                    className="answer-btn"
                    onClick={() => this.handlePoll("optionTwo")}
                  >
                    {optionTwo.text}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users, questions }, ownProps) => {
  const question_id = ownProps.match.params.question_id;
  const question = questions[question_id];

  if (!question) {
    return {
      isNotExists: true,
    };
  }

  const auth = users[authedUser];
  const isAnswered = Object.keys(auth.answers).includes(question_id);

  const authorId = questions[question_id].author;
  const author = users[authorId];

  return {
    question,
    author,
    auth: authedUser,
    isAnswered,
    isNotExists: false,
    vote: isAnswered ? auth.answers[question_id] : "",
  };
};

export default connect(mapStateToProps)(QuestionPage);
