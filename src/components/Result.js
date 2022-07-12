import React, { Component } from "react";
import { Line } from 'rc-progress';


class Result extends Component{
    render(){
    const { text, optionOneVote, optionTowVote, isoptionOneVote, vote } = this.props;
    const totalVotes = optionOneVote + optionTowVote;
    
    // calculate vote Percentage to total votes
    const percentage = ( (isoptionOneVote ? optionOneVote : optionTowVote) / totalVotes ) * 100

    return (
        <div className={vote ? "progress-item-active" : "progress-item"}>
            {vote ? (
            <div className="your-choice">
                Your Choice
            </div>
            ) : (
            ""
            )}
            <p>{text}</p>
            <Line 
                percent={percentage} 
                strokeWidth="3" 
                strokeColor="#15c806" />
            <div className="vote-perc">
                <p>
                {isoptionOneVote
                    ?`${optionOneVote} out of ${totalVotes} vote(s)`
                    : `${optionTowVote} out of ${totalVotes} vote(s)`}
                </p>
                <span>{`percentage: ${Math.round(percentage)}%`}</span>
            </div>
        </div>
        );
    }
}

export default Result;