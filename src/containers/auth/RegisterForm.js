// useEffect import 
import React,{useEffect ,useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// auth module register import
import { changeField, initializeForm,register } from '../../modules/auth';

import AuthForm from '../../components/auth/AuthForm';

import { check } from '../../modules/user'

//withRouter import
import { withRouter } from 'react-router-dom';

const RegisterForm = ({history}) => {
  // error props null setting
    const [ error , setError ] = useState(null);
    const dispatch = useDispatch();
    // user add
    const { form, auth, authError, user } = useSelector(({ auth,user }) => ({
      form: auth.register,
      auth: auth.auth,
      authError: auth.authError,
    //   add
      user: user.user,
     
    }));
    // input change event 로 액션 디스패치. 디스패치 : 액션을 발생시키는 것.
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
          changeField({
            form: 'register',
            key: name,
            value,
          }),
        );
      };
    // form submit event 로 register 함수에 현재 username, password 를 파라미터로 넣어서 액션 디스패치. 
    // 사가에 대한 API 요청 처리후, 이에 대한 결과를 auth/authError 를 통해 조회
    const onSubmit = e => {
        e.preventDefault();
        // form 입력시 에러 처리
        const { username, password, passwordConfirm } = form;
        // 값이 하나라도 비어있다면
        if ([username, password, passwordConfirm].includes('')){
          setError('빈 칸을 모두 입력하세요.');
          return;
        }
        // 비밀번호가 일치하지 않는다면
      if (password !== passwordConfirm) {
        setError('비밀번호가 일치하지 않습니다.');
          // 에러를 발생시키고 비밀번호, 비밀번호 확인 인풋 공백 (초기화) 처리
        dispatch(changeField({ form: 'register', key: 'password', value: '' }));
        dispatch(
          changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
        );
        return;
      }
      dispatch(register({ username, password }));
    };



    // 컴포넌트 초기 렌더링시 form 초기화
    useEffect(()=>{
        // 액션 생성 함수 import
        dispatch(initializeForm('register'));
    },[dispatch]);

    // auth, authError 값 중에서 무엇이 유효한지에 따라 다른 작업을 함.
    // 회원가입 실패
    useEffect(() => {
      if (authError) {
        // 계정명이 이미 존재할 때
        // confict 409
        if (authError.response.status === 409) {
          setError('이미 존재하는 계정명입니다.');
          return;
        }
        // 기타 이유
        setError('회원가입 실패. 다시 시도해주세요.');
        return;
      }

      // 회원가입 성공
      if(auth){
            console.log('회원가입 성공');
            console.log(auth);
            // 회원가입이 성공하면 check 액션 디스패치.
            dispatch(check());
        }
    },[auth,authError,dispatch])
    // user check API 확인
    useEffect(() => {
      if (user) {
        console.log('check API 성공');
        console.log(user);
        history.push('/'); // 홈 화면으로 이동
        try{
          localStorage.setItem('user', JSON.stringify(user));
      }catch(e){
          console.log('localStorage is not working')
      }
  
      }
    }, [history, user]);
    return (
        
       <AuthForm
       type="register"
       form={form}
       onChange={onChange}
       onSubmit={onSubmit} 
      //  error props add
       error={error}
       />
    );
};

export default withRouter(RegisterForm);


