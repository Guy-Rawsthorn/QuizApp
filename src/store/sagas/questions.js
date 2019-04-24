import {put} from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* findQuestionsSaga(action){
    console.log("find questions saga");
    yield put(actions.findQuestionsStart());
    try {
        let requestBody = {
            query: `
                query questions{
                    questions {
                        _id
                        question
                        answer
                        isCorrect
                    }
                }
            `,
            // variables
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.findQuestionsFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            console.log("hello");
            yield put(actions.findQuestionsSuccess(response.data.data))
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findQuestionsFail(err));
    }
}

export function* updateQuestionSaga(action){
    console.log("update question saga");
    yield put(actions.updateQuestionStart());
    const questionId = action.questionId;
    console.log(questionId);
    try {
        let requestBody = {
            query: `
                mutation updateQuestion($questionId: ID!, $isCorrect: Boolean!) {
                    updateQuestion(updateQuestionInput: {
                        questionId: $questionId
                        isCorrect: $isCorrect
                        }) {
                        _id
                        question
                        answer
                        isCorrect
                    }
                }
            `,
            variables: {
                questionId: questionId,
                isCorrect: true
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        console.log("response",response);
        if (response.data.errors) {
            console.log("errors")
            yield put(actions.updateQuestionFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            console.log("hello");
            yield put(actions.updateQuestionSuccess(response.data.data))
        }
    } catch (err) {
        console.log(err);
        yield put(actions.updateQuestionFail(err));
    }
}



