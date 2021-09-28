import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// palette import
import palette from '../../lib/styles/palette';

// 회원가입 / 로그인 페이지의 레이아웃 담당
const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  right:0;
  /* 내가 설정해놓은 paltte 에서 2번째 회색을 쓰겠어 */
  background : ${palette.gray[2]};
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`;


// white box

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align:center;
    font-weight: bold;
    /* 글자 간격 */
    letter-spacing:2px;
  }
  /* 윤곽선 4면 전부 그림자로 입체감줌 */
  box-shadow: 0 0 8px rgba(0,0,0,0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`



const AuthTemplate = ({children}) => {
  // 부모 컴포넌트 안에 있는 자식 컴포넌트 요소 띄우기
  return (
  <AuthTemplateBlock>
    <WhiteBox>
      {/* 전부 스타일 컴포넌트로 만들어주지 않고 가독성을 위해 css selector 사용 */}
      <div className="logo-area">
    <Link to='/'>TITLE</Link>
    </div>
    {children}
    </WhiteBox>
    </AuthTemplateBlock>
    
    )
    ;

};

export default AuthTemplate;
