import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// palette import 
import palette from '../../lib/styles/palette';
// Button component import
import Button from '../common/Button';

// 회원가입 or 로그인폼 보여줌.

const AuthFormBlock = styled.div`
    h3{
        margin: 0;
        color:${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

// button margin
const ButtonWithMarinTop = styled(Button)`
margin-top: 1rem;
`

// styled input

const StyledInput = styled.input`
    font-size:1rem;
    border:none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus{
        color: $oc-teal-7;
        border-bottom:1px solid ${palette.gray[7]} ;
    }
    /* Scss 에서 쓰는 요소가 서로 반복될 때 margin-top 을 줌 >>> input 과 input 사이에 margin-top 줌. */
    &+&{
        margin-top: 1rem;
    }
`
// 폼 하단에 회원가입 링크 style
const Footer = styled.div`
    margin-top:2rem;
    text-align : right;
    a {
        color : 1px solid ${palette.gray[6]};
        text-decoration:underline;
        &:hover{
            color:1px solid ${palette.gray[9]}
        }
    }

`

// 에러 보여주는 UI
const ErrorMessage = styled.div`
    color:red;
    text-align:center;
    font-size: 0.875rem;
    margin-top : 1rem;
`

const textMap = {
    login:'로그인',
    register : '회원가입'
}

const AuthForm = ({type , form , onChange, onSubmit, error }) => {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                {/* autocomplete 속성 >> 인풋에 자동완성하는 속성 
                 username 은 사용자 이름 , new-password 는 보통 비밀번호 자동완성 막기 위해서 새로운 비밀번호나 비밀번호 확인란에 들어간다는뎅 ㅎ.. 
                 머 일단 책은 이렇고 나는 나중에 보고 current-password 가 더 맞을거 같아서 임의로 바꿨음. */}
                <StyledInput 
                autoComplete="username" 
                name="username" 
                placeholder="아이디"
                onChange={onChange}
                value = {form.username}
                 />
                <StyledInput 
                autoComplete="current-password" 
                name="password" 
                placeholder="비밀번호" 
                type="password"
                onChange={onChange} 
                value ={form.password}
                
                />
                {/* type 이 회원가입이면, 비밀번호 확인 인풋 추가 */}
                {type === 'register' &&(
                        <StyledInput 
                         autoComplete="new-password" 
                         name="passwordConfirm" 
                         placeholder="비밀번호 확인" 
                         type="password" 
                         onChange={onChange}
                         value={form.passwordConfirm}
                        />
                    )
                }
               {error && <ErrorMessage>{error}</ErrorMessage>} 
                <ButtonWithMarinTop fullWidth>{text}</ButtonWithMarinTop>
            </form>
            <Footer>
                {type === 'login' ? (
                    <Link to="/register">회원가입</Link>
                ):(
                    <Link to="/login">로그인</Link>
                )
                }
               
            </Footer>
        </AuthFormBlock>
       
    );
};

export default AuthForm;