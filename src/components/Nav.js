import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser"
import { connect } from 'react-redux';

class Nav extends Component{
  // make authedUser equal null to logout
    logOut = () => {
      this.props.dispatch(setAuthedUser(null));
      };

    render(){
      const {authedUser, users} = this.props
        return(
         <div className="nav">   
            <div className="nav-links">
                <NavLink
                  className="nav-link"
                  activeClassName="nav-link-active"
                  exact  to="/"
                >
                Home
                </NavLink>

                <NavLink
                  className="nav-link"
                  activeClassName="nav-link-active"
                  to="/leaderboard"
                >
                Leader Board
                </NavLink>

                <NavLink
                  className="nav-link"
                  activeClassName="nav-link-active"
                  to="/add"
                >
                New Question
                </NavLink>
            </div>
            <div className="logout">
            <img
                alt="user-logout-avatar"
                src={users[authedUser].avatarURL}
                className={"user-logout-avatar"}
              />
              <span className="user-logout-avatar-name">
                {users[authedUser].name}
              </span>
              <button onClick={this.logOut} className="logout-btn">
                 Logout
              </button>
            </div>
    </div>);
    }
}

const mapStateToProps = ({authedUser, users}) => {
    return {
      authedUser,
      users
    };
  };

  export default connect(mapStateToProps)(Nav);
