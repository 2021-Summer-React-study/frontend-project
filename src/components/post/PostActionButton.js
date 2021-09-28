import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import AskRemoveModal from './AskRemoveModal';
const PostActionButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.violet[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

const PostActionButton = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);
// 삭제 버튼을 누르면 모달이 보임
  const onRemoveClick = () => {
    setModal(true);
  };
// 취소 버튼을 누르면 모달이 안보임
  const onCancel = () => {
    setModal(false);
  };
// 모달에서 확인을 누르면 삭제가 되면서 모달이 안보임
  const onConfirm = () => {
    setModal(false);
    // onRemove 함수 호출
    onRemove();
  };
  return (
    <>
      <PostActionButtonBlock>
        <ActionButton onClick={onEdit}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default PostActionButton;
