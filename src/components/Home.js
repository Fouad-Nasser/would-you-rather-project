import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Home extends Component {
  state = {
    items: [
      {
        name: "Unanswered",
      },
      {
        name: "Answered",
      }
    ],
    active: "Unanswered"
  };

  changeTab = (item) => {
    this.setState({
      active: item,
    });
  };

  render() {
    const {answeredQuestionIds, unansweredQuestionIds} = this.props;
    const isAnswered = this.state.active === "Answered";
    return (
      <div>
        <nav className="tab-link">
          {this.state.items.map((item) => (
            <div
              key={item.name}
              className={
                item.name === this.state.active
                  ? "tab-link-item-active"
                  : "tab-link-item"
              }
              onClick={() => this.changeTab(item.name)}
            >
              {
                // print question category name and number of questions
                `${item.name} : ${item.name==="Answered"?
                answeredQuestionIds.length
                :unansweredQuestionIds.length}`
              }
            </div>
          ))}
        </nav>
        <div className="questions">
          {isAnswered
            ? this.props.answeredQuestionIds.map((question) => (
                <Question
                  key={question}
                  id={question}
                  isAnswered={isAnswered}
                />
              ))
            : this.props.unansweredQuestionIds.map((question) => (
                <Question
                  key={question}
                  id={question}
                  isAnswered={isAnswered}
                />
              ))}
        </div>
      </div>
    );
  }
}


function mapStateToProps({ authedUser, questions, users }) {
  // arrange answered question ids from the most recently created (top) to the least recently created (bottom).
	const answeredQuestionIds = Object.keys(questions)
		.filter((id) => users[authedUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  // arrange unanswered question ids from the most recently created (top) to the least recently created (bottom).
	const unansweredQuestionIds = Object.keys(questions)
		.filter((id) => !users[authedUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

	return {
		answeredQuestionIds,
		unansweredQuestionIds
	};
}

export default connect(mapStateToProps)(Home);
