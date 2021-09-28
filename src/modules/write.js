import { createAction, handleActions } from 'redux-actions';
import createRequestSaga,{
    createRequestActionTypes,
} from '../lib/createRequestSaga';
 
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// 액션 타입 정의

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
// createRequestSaga 에서는 반복되는 부분을 함수화해서 정리해주기 위해서 createRequestActionTypes 사용해서 한번에 적음.
// 글쓰기 관련
const [ WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAIURE] = createRequestActionTypes('write/WRITE_POST')
// 현재 보고 있는 포스트의 정보의 상태를 가져오는 액션
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';

//post 수정 관련 액션타입 정의
const [ UPDATE_POST, UPDATE_POST_SUCCESS,UPDATE_POST_FAILURE] =createRequestActionTypes('write/UPDATE_POST')

// 액션 생성 함수
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD,({ key, value })=>({
    key,
    value
}));

export const writePost = createAction(WRITE_POST, ({title,body, tags}) =>({
    title,
    body,
    tags,
}))

export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post)

export const updatePost = createAction(
    UPDATE_POST,
    ({ id, title, body, tags }) =>({
        id,
        title,
        body,
        tags,
    })
)

// saga 생성
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);
export function* writeSaga(){
    yield takeLatest(WRITE_POST,writePostSaga);
    yield takeLatest(UPDATE_POST,updatePostSaga);
}
// 초기 상태 정의
const initialState = {
    title:'',
    body:'',
    tags:[],
    originalPostId: null,
};


// 리듀서 함수

const write = handleActions(
    {
        [INITIALIZE]: state => initialState, // initialState 를 넣으면 초기 상태로 바뀜
        [CHANGE_FIELD] : (state,{payload: { key,value }}) =>({
            ...state,
            [key] : value, // 특정 key 값 업데이트
        }),
        [WRITE_POST]: state =>({
            ...state,
            // post, postError 초기화
            post:null,
            postError:null
        }),
        // post success
        [WRITE_POST_SUCCESS] : ( state, {payload : post}) =>({
            ...state,
            post
        }) ,
        //post fail
        [WRITE_POST_FAIURE] : (state, {payload:postError}) =>({
            ...state,
            postError
        }) ,
        [SET_ORIGINAL_POST]: (state, {payload: post} )=> ({
            ...state,
            title:post.title,
            body:post.body,
            tags: post.tags,
            originalPostId:post._id,
        }),
        [UPDATE_POST_SUCCESS] : (state,{payload:post}) =>({
            ...state,
            post
        }),
        [UPDATE_POST_FAILURE] : (state, {payload :postError}) =>({
            ...state,
            postError
        })
    },
    initialState
)


export default write;