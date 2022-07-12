import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions" 

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
  };

  addQuestion = (e) => {
    e.preventDefault();
    const { authedUser,history } = this.props;

    this.props
      .dispatch(
        handleSaveQuestion(this.state.optionOne, this.state.optionTwo, authedUser)
      )
      .then(() => {
        // go to home page after save question
        history.push("/");
      });
  };

  changeOptionOne = (e) => {
    const optionOne = e.target.value;
    this.setState({
      optionOne,
    });
  };

  changeOptionTwo = (e) => {
    const optionTwo = e.target.value;
    this.setState({
      optionTwo,
    });
  };

  render() {
    return (
      <div className="add-new-question">
        <h2 className="add-new-question-header">create a new question</h2>
        <h3 className="add-new-question-title">would you rather ?</h3>
        <form onSubmit={this.addQuestion}>
          <input
            type="text"
            className="input-field"
            value={this.state.optionOne}
            onChange={this.changeOptionOne}
            placeholder="Enter Option One"
            required
          />
          <input
            type="text"
            className="input-field"
            value={this.state.optionTwo}
            onChange={this.changeOptionTwo}
            placeholder="Enter Option Two"
            required
          />
          <button type="submit" className="btn">
            Create Question
          </button>
        </form>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

export default connect(mapStateToProps)(NewQuestion);
