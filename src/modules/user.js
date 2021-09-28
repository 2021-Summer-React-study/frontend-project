import { createAction, handleActions } from "redux-actions";
import { takeLatest,call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga,{
    createRequestActionTypes
} from "../lib/createRequestSaga";


//액션 타입 정의
const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
// 액션 타입 정의 함수 가져와서 한번에 적어주기
const [CHECK,CHECK_SUCCESS,CHECK_FAILURE ] = createRequestActionTypes(
    'user/CHECK',
);


// 로그아웃 액션
const LOGOUT = 'user/LOGOUT';


// 액션 생성 함수
export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);
// logout 생성 함수
export const logout = createAction(LOGOUT);

// saga 생성
const checkSaga = createRequestSaga(CHECK,authAPI.check);

// 로그인 정보 만료시 처리해줄 부분
function checkFailureSaga(){
    try{
        localStorage.removeItem('user') // localStorage 에서 user 를 제거
    }catch(e){
        console.log('localStorage is not working')
    }
}

// 로그아웃 사가 생성
function* logoutSaga(){
    try{
        yield call(authAPI.logout);
        localStorage.removeItem('user');
    }catch(e){
        console.log(e)
    }
}

export function* userSaga(){
    // takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리 하고 가장 마지막으로 실행된 작업만 수행.
    yield takeLatest(CHECK,checkSaga);
    // check localStorage user
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    // logout user
    yield takeLatest(LOGOUT, logoutSaga);
};

// 초기 상태 정의
const initailState = {
    user: null,
    checkError: null
};


// 리듀서 함수
export default handleActions(
    {
        [TEMP_SET_USER]:(state, {payload: user}) =>({
            ...state,
            user,
        }),

        [CHECK_SUCCESS]:(state, {payload : user }) => ({
            ...state,
            user,
            checkError: null,
        }),
        [CHECK_FAILURE]:(state, {payload : error }) => ({
            ...state,
            user: null,
            checkError: null,
        }),
        [LOGOUT]:(state,{payload:user}) =>({
            ...state,
            user:null,
        }),
    },
    initailState,
)