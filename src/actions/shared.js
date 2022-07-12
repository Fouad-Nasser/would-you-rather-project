import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { _getUsers, _getQuestions } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";


function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      dispatch(hideLoading());

    });
  };
}
