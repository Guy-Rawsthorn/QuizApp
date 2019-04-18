import {put} from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* findQuestionsSaga(action){
    yield put(actions.findQuestionsStart());
    try {
        let requestBody = {
            query: `
                query questions{
                    questions {
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
            yield put(actions.findQuestionsSuccess(response.data.data))
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findQuestionsFail(err));
    }
}


