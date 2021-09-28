import React from 'react';
import styled from 'styled-components';
// button component import
import Button from '../common/Button';

const WriteActionButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  /* button 끼리 붙어있을 때의 style */
  button + button {
    margin-left: 0.5rem;
  }
`;

// button 컴포넌트를 가져와서 새 컴포넌트로 만듬
// tagBox 와 동일한 높이로 설정한 후 서로 간의 여백 지정
const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;
const WriteActionButton = ({ onCancel, onPublish,isEdit }) => {
  return (
    <WriteActionButtonBlock>
        {/* click event props settings */}
      <StyledButton onClick={onPublish}>포스트 {isEdit ? '수정' : '등록'} </StyledButton>
       {/* button color props,click event props settings */}
      <StyledButton gray onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonBlock>
  );
};

export default WriteActionButton;
