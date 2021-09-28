import { call, put } from 'redux-saga/effects';
import { startLoading,finishLoading } from '../modules/loading';




// 타입 정의 함수
export const createRequestActionTypes = type =>{
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return [type,SUCCESS,FAILURE]
};


// request 제너레이터 함수 >> 사가라고 함.
 // 파라미터로 action을 받아오면 액션의 정보 조회 가능.
export default function createRequestSaga(type, request){
    const SUCCESS = `${type}_SUCCESS`
    const FAILURE = `${type}_FAILURE`

    return function*(action){
        yield put(startLoading(type)); // 로딩 시작
        try{
            // call 사용시 Promise 를 반환하는 함수를ㄹ 호출하고, 기다릴 수 있음.
            // 첫번째 파라미터에는 함수, 나머지 파라미터는 해당 함수에 넣을 인수.
            const response = yield call(request, action.payload);
            // put 은 특정 액션을 디스패치함.
            yield put({
                type:SUCCESS,
                payload:response.data,
                // meta 값을 response 로 넣어서 HTTP 헤더 및 상태 코드를 쉽게 조회할 수 있도록 함.
                meta:response,
            });
            // try catch 문으로 에러 잡기.
        }catch(e){
            yield put({
                type:FAILURE,
                payload:e,
                error:true,
            });
        }
        yield put(finishLoading(type)); // 로딩 완료
    }
};
    

