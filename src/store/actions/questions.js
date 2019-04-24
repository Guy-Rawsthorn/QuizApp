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
    return {
        type: actionTypes.FIND_QUESTIONS
    }
};

export const updateQuestion = (questionId) => {
    return {
        questionId: questionId,
        type: actionTypes.UPDATE_QUESTIONS
    }
};

export const updateQuestionSuccess = (questions) => {
    return {
        type: actionTypes.UPDATE_QUESTIONS_SUCCESS,
        questions: questions
    }
};

export const updateQuestionStart = () => {
    return {
        type: actionTypes.UPDATE_QUESTIONS_START
    }
};

export const updateQuestionFail = (error) => {
    return {
        type: actionTypes.UPDATE_QUESTIONS_FAIL,
        error: error
    }
};