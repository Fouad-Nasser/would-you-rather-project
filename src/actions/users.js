import { addAnswerToQuestion } from '../actions/questions';
import { _saveQuestionAnswer } from '../utils/_DATA';
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function addQuestionToUser(author, id) {
  return {
    type: ADD_QUESTION_TO_USER,
    author,
    id
  };
}

function addAnswerToUser(authedUser, qid, option) {
    return {
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        option,
    };
}

export function handleSaveQuestionAnswer(authUser, qid, option) {
	return (dispatch) => {
    dispatch(showLoading());
		return _saveQuestionAnswer({ authedUser: authUser, qid, answer: option })
			.then(() =>{
        dispatch(addAnswerToUser(authUser, qid, option));
        dispatch(addAnswerToQuestion(authUser, qid, option));
        dispatch(hideLoading());
      })
      .catch(() => {
        alert("Error, please try again");
      });
	};
}

