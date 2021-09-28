import { createAction, handleActions } from 'redux-actions';

import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// 액션 타입 정의
const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] =
  createRequestActionTypes('post/READ_POST');

const UNLOAD_POST = 'post/UNLOAD_POST'; // 포스트 페이지에서 벗어날 때 데이터 비우기

// 액션 생성 함수
export const readPost = createAction(READ_POST, (id) => id);
export const unloadPost = createAction(UNLOAD_POST);

// 사가 생성
const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

//초기 상태 설정

const initialState = {
  post: null,
  error: null,
};

// 리듀서 함수

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    // page 를 벗어났을 때 리덕스의 상태 데이터 비움. 왜 ?? >> 안 비우면 특정 포스트를 읽고 뒤로 돌아가서 다시 다른 포스트를 읽을 때 이전 포스트의 데이터가 잠시 깜빡였다가 나타나는 현상이 발생
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default post;

