import { RECEIVE_QUESTIONS } from "../actions/questions"
import { ADD_ANSWER_TO_QUESTIONS } from "../actions/questions"
import { ADD_QUESTION } from "../actions/questions"

export default function questions (state = {}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions,
              };

        case ADD_ANSWER_TO_QUESTIONS:
            const {  authedUser, qid, option } = action;
            return {
              ...state,
              [qid]: {
                ...state[qid],
                [option]: {
                  ...state[qid][option],
                  votes: state[qid][option].votes.concat(authedUser),
                },
              },
            };

        case ADD_QUESTION:
            const { question } = action;
        return {
          ...state,
          [question.id]: question,
        };

            default :
                return state
    }
}

