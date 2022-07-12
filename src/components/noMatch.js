import React, { Component } from "react";
import { Link } from "react-router-dom";

class NoMatch extends Component{
  render(){
    return (
      <div className="nomatch-cont">
        <img src="/images/notfound.jpg" alt="not found" className="nomatch-img"/>
        <p> The page is not found</p>
        <Link to="/" className = "nomatch-btn">back to home page</Link>
      </div>
    );
  }
}

export default NoMatch;
