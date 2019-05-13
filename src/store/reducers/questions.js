import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";
import {updateQuestion} from "../helper";

const initialState = {
    loading: null,
    error: null,
    questions: []
};

const findQuestionsStart = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: true
    });
};

const findQuestionsSuccess = (state, action) => {
    return updateObject(state, {
        questions: action.questions.questions,
        error: false,
        loading: false,
        saved: true
    })
};

const findQuestionsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        saved: true
    })
};

const updateQuestionsStart = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: true
    });
};
const updateQuestionsSuccess = (state, action) => {
    console.log("success", state, action)
    return updateObject(state, {
        error: false,
        questions: updateQuestion(state.questions, action.questions.updateQuestion),
        loading: true
    });
};
const updateQuestionsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        saved: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_QUESTIONS_FAIL:
            return findQuestionsFail(state, action);
        case actionTypes.FIND_QUESTIONS_START:
            return findQuestionsStart(state, action);
        case actionTypes.FIND_QUESTIONS_SUCCESS:
            return findQuestionsSuccess(state, action);
        case actionTypes.UPDATE_QUESTIONS_START:
            return updateQuestionsStart(state, action);
        case actionTypes.UPDATE_QUESTIONS_SUCCESS:
            return updateQuestionsSuccess(state, action);
        case actionTypes.UPDATE_QUESTIONS_FAIL:
            return updateQuestionsFail(state, action);
            default: return state;
    }
};

export default reducer;



