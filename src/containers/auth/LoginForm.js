// useEffect,useState import 
import React,{useEffect , useState} from 'react';
// useSelector, useDispatch import
import { useDispatch, useSelector } from 'react-redux';
// auth module 액션 생성함수, login import 
import { changeField, initializeForm,login } from '../../modules/auth';
// AuthForm import
import AuthForm from '../../components/auth/AuthForm';

//withRouter import
import { withRouter } from 'react-router-dom';
// user import
import { check } from '../../modules/user';

const LoginForm = ({history}) => {
    const [ error, setError ] = useState(null);
    const dispatch = useDispatch();
    const { form,auth, authError, user } = useSelector( ({ auth,user }) => ( {
        form : auth.login,
        auth:auth.auth,
        authError: auth.authError,
        user:user.user
    }));
    // input change event 로 액션 디스패치. 디스패치 : 액션을 발생시키는 것.
    const onChange = e => {
        const { value, name } = e.target;
        // 액션 생성 함수 import
        dispatch(
            changeField({
                form:'login',
                key:name,
                value
            })
        );
    };
    // form submit event
    // form submit event 로 login 함수에 현재 username, password 를 파라미터로 넣어서 액션 디스패치. 
    // 사가에 대한 API 요청 처리후, 이에 대한 결과를 auth/authError 를 통해 조회
    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form ;
        // login 함수 디스패치
        dispatch(login({username, password}));
    }
    // 컴포넌트 초기 렌더링시 form 초기화
    useEffect(()=>{
        // 액션 생성 함수 import
        dispatch(initializeForm('login'));
    },[dispatch]);

    useEffect(()=>{
        if (authError){
            console.log('오류 발생');
            console.log(authError);
            setError('로그인 실패. 아이디 또는 비밀번호를 확인해주세요.');
            return ;
        }
        if (auth){
            console.log('로그인 성공')
            // login 성공하면 check 디스패치
            dispatch(check());
        }
    },[auth,authError, dispatch])


    useEffect(()=>{
        if (user){
            // user 값이 제대로 들어갔으면 인덱스 페이지로
            history.push('/');
            try{
                // 리액트 앱에 브라우저에서 맨 처음 렌더링 될 때 localoStorage 에서 값을 불러와 리덕스 스토어 안에 넣도록 구현.
                // 첫 렌더링 시이기 떄문에 최상위 App 컴포넌트에서 useEffect를 사용하여 처리하거나, 클래스형 컴포넌트라면 componentDidMount 메서드에서 구현해도 됨.
                // 여기서는 엔트리 파일인 index.js 에서 처리할 것임. 
                // 왜 ?? >> componentDidMount, useEffect 는 컴포넌트가 한 번 렌더링 된 이후에 실행 되기 떄문. 그러면 사용자에게는 아주 잠깐의 깜짝임 현상 ( 로그인이 나타났다가 로그아웃이 나타나는 현상) 이 나타남. 
                // index에서 구현하게 되면 이러한 깜빡임 현상 나타나지 않음.
                localStorage.setItem('user', JSON.stringify(user));
            }catch(e){
                console.log('localStorage is not working')
            }
        }
    },[history,user]);



    return (
        
       <AuthForm
       type="login"
       form={form}
       onChange={onChange}
       onSubmit={onSubmit} 
    //    error props add 
       error={error}
       />
    );
};

// withRouter 로 컴포넌트 감싸기
export default withRouter(LoginForm);

