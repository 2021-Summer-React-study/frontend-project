import { createAction, handleActions } from 'redux-actions';
// // produce import
import produce from 'immer';
// // takeLatest import
import { takeLatest } from 'redux-saga/effects';
// // saga import
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga';

// // api import
import * as authAPI from '../lib/api/auth';


// // // sample 액션 타입 정의
// // // module/ACTION_TYPE. 액션 타입은 대문자로, 앞에 모듈을 붙여주어야 액션 이름 중첩을 방지할 수 있음.
// // const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';


// // react-saga api 요청 action
// // 회원가입
// // const REGISTER = 'auth/REGISTER';
// // const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
// // const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

// // //로그인
// // const LOGIN = 'auth/LOGIN';
// // const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
// // const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';


const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER'
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);


// // // 액션 생성자. createAction 함수는 매번 객체를 직접 만들어 줄 필요 없이 더욱 간단하게 액션 생성 함수를 선언할 수 있음. 사용으로 액션 추가 데이터는 payload 사용. 
// // // 액션 생성자는 export
// // export const sampleAction = createAction(SAMPLE_ACTION);


export const changeField = createAction(
  // 추가 데이터 생성은 payload
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register / login
export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password
}));

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password
}));



// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  // takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리 하고 가장 마지막으로 실행된 작업만 수행.
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

// // 초기 상태 정의

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  login: {
    username: '',
    password: ''
  },
  auth: null,
  authError: null
};




// // 리듀서 함수
// // 리듀서 함수도 더 간단하고 가독성 높게 사용하기 위해 handleActions 함수 사용
// // 리듀서 함수는 export default 로 
const auth = handleActions(
  {
//     // 전부 다 추가 데이터가 payload 면 헷갈리니까 객체 비구조화 할당으로 좀 더 직관적으로 사용
      [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      // 불변성 유지를 위해 immer 라이브러리 사용
      produce(state, draft => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),

      [INITIALIZE_FORM]: (state, { payload: form }) => ({
        ...state,
        [form]: initialState[form],
        authError: null // 폼 전환 시 회원 인증 에러 초기화
      }),

      // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    })
  },
  initialState
);

export default auth;

