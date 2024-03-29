import { _saveQuestion } from '../utils/_DATA';
import { addQuestionToUser } from '../actions/users';
import { showLoading, hideLoading } from "react-redux-loading";


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_ANSWER_TO_QUESTIONS = 'ADD_ANSWER_TO_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addAnswerToQuestion(authedUser, qid, option) {
  return {
    type: ADD_ANSWER_TO_QUESTIONS,
    authedUser,
    qid,
    option
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    dispatch(showLoading());
    return _saveQuestion({ optionOneText, optionTwoText, author })
        .then((question) => {
            dispatch(addQuestion(question));
            dispatch(addQuestionToUser(author, question.id ));
            dispatch(hideLoading());
        });
  };
}


