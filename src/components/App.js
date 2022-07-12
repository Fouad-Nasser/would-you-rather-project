import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; 
import {handleInitialData} from '../actions/shared'
import Header from './Header';
import Login from './Login'
import Nav from './Nav';
import Home from "./Home";
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import NoMatch from './noMatch';
import LoadBar from "react-redux-loading";


class App extends Component {
  componentDidMount() { 
    // get the Initial Data from "_Data.js"
    this.props.dispatch(handleInitialData()); 
  } 
  render() {
    return (
      <div>
      <Router>
        <div>
          <LoadBar style={{ backgroundColor: 'dodgerblue', height: '6px' }}/>
          <Header/>
          
          {/* check if authedUser equal null display login page else display home page*/}
          {this.props.authedUser === null ? (
                <Login/>
          ) : (
            <div className="main-home-grid">
              <Nav />
              <div className="main-home-container">
                <Switch>
                  <Route path="/questions/:question_id" component={QuestionPage} />
                  <Route exact path="/" component={Home} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route path="/error404" component={NoMatch} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </div>
          )}
        </div>
      </Router>
      </div>
      
    );
  }
}


function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(App);