import * as actionTypes from "./actionTypes";

export const findQuestionsStart = () => {
    return {
        type: actionTypes.FIND_QUESTIONS_START
    };
};

export const findQuestionsSuccess = (questions) => {
    return {
        type: actionTypes.FIND_QUESTIONS_SUCCESS,
        questions: questions
    };
};

export const findQuestionsFail = (error) => {
    return {
        type: actionTypes.FIND_QUESTIONS_FAIL,
        error: error
    };
};

export const findQuestions = () => {
    console.log("1");
    return {
        type: actionTypes.FIND_QUESTIONS
    }
};