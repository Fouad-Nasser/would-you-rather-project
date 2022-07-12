import { RECEIVE_USERS } from "../actions/users"
import { ADD_ANSWER_TO_USER } from "../actions/users"
import { ADD_QUESTION_TO_USER } from "../actions/users"

export default function users (state = {}, action){
    switch(action.type){
        case RECEIVE_USERS :
            return{
                ...state,
                ...action.users
            };

        case ADD_ANSWER_TO_USER:
            const { authedUser, qid, option } = action;
            return {
                ...state,
                [authedUser]: {
                ...state[authedUser],
                answers: {
                    ...state[authedUser].answers,
                    [qid]: option,
                },
                },
            };

        case ADD_QUESTION_TO_USER:
            const { id, author } = action;
            return {
                ...state,
                [author]: {
                ...state[author],
                questions: state[author].questions.concat(id)
                }
            };

            default :
                return state
    }
}

