import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  state = {
    user: ""
  };

  selectUser = (user) => {
    // update state user by selected user id 
    this.setState({
      user: user.id
    });

    // change login-btn style after select user to start app
    let btn = document.querySelector('.login-btn');
    btn.classList.remove("Disabled");
  };

  // create function to change authedUser in store
  login = () => {
    if (this.state.user==="") {
      return;
    }
    this.props.dispatch(setAuthedUser(this.state.user));
  };

  render() {
    return (
      <div className="container">
        <p className="login-parag">Please, select user to start</p>
        <div className="select-user-cont">
          {Object.keys(this.props.users).map((keyName) => (
            <div
              className="select-user-item"
              onClick={() => this.selectUser(this.props.users[keyName])}
              key={keyName}
            >
              <img
                alt="user-avatar"
                src={this.props.users[keyName].avatarURL}
                className={
                  this.props.users[keyName].id === this.state.user
                    ? "select-user-avatar active-user-avatar"
                    : "select-user-avatar"
                }
              />
              <span className="select-user-avatar-name">
                {this.props.users[keyName].name}
              </span>
            </div>
          ))}
        </div>
       
        <button
          className="login-btn btn Disabled"
          onClick={this.login}
        >Start App</button>
      </div>      
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  };
};

export default connect(mapStateToProps)(Login);
