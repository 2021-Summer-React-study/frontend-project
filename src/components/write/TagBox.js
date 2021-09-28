// useState,useEffect import
import React, { useCallback, useEffect, useState } from 'react';
// styled-components import
import styled from 'styled-components';
// palette import
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;

  h4 {
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  /* 넘치는 form hidden */
  overflow: hidden;
  display: flex;
  width: 256px;
  /* style 초기화 ( 위에서 준 border-top style ) */
  border: 1px solid ${palette.gray[9]};
  /* input, button에 똑같은 style 주기 */
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }
  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  /* 태그들을 가로로 정렬 */
  display: flex;
  margin-top: 0.5rem;
`;

// 렌더링을ㄹ 최적화하기 위해 TagItem ,TagList 로 두 가지 컴포넌트 분리. 만약 한 컴포넌트에서 직접 렌더링시  input 값이 바뀔 때 태그의 목록도 리렌더링됨. 또 태그 목록이 리렌더링 되면 태그하나하나 모두 리렌더링

// React.memo 사용으로 tag 값이(props 가 실제로 바뀔 때만) 바뀔 때만 리렌더링 되도록 처리
const TagItem = React.memo(({ tag, onRemove }) => (
  // tag 를 받아서 렌더링
  // 태그를 클릭할 때 onRemove 함수 실행
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

// 마찬가지로 React.memo 사용해서 tags 값이 바뀔 때만 리렌더링 되도록 처리
const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map((tag) => (
      //  map 을 사용하여 컴포넌트로 변환할 때는 key 값 필요. tag 값을 key 값으로 설정
      // tag 데이터를 통째로 props 로 전달할 거임. 객체 통째로 전달해주는게 나중에 여러 종류의 값을 전달해야 하는 경우 최적화가 편함.
      // onRemove 함수 props
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

const TagBox = ({ tags, onChangeTags }) => {
  // input, tags state
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  //   해당 2번째 인자로 받은 state 값들이 바뀔 때마다만 렌더링 해줘야 최적화기 떄문에 useCallback 사용

  const insertTag = useCallback(
    //   submit 했을 때 해당 함수 실행
    (tag) => {
      if (!tag) return; // 이면 추가하지 않음.
      if (localTags.includes(tag)) return; // 이미 존재하면 추가하지 않음.
      // //   state 에서는 배열, 객체를 바꿔줄 때 불변성 유지를 위해 spread 연산자를 사용해서 값을 업데이트 해야함.
      //   setLocalTags([...localTags, tag]);
      // },
      // [localTags],

      // onChangeTags 도 추가해서 컴포넌트 내부에서 상태기 바뀌면 리덕스 스토어에도 반영되고, 리덕스 스토어에 있는 값이 바뀌면 컴포넌트 내부의 상태도 바뀜.
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onRemove = useCallback(
    (tag) => {
      // 클릭한 해당 요소만 빼고 새로운 배열 반환하는 filter 함수
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback((e) => {
    //input onchange event 로 target value 를 상태값으로 업데이트
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      console.log(e);
      e.preventDefault();
      //  setInput 으로 업데이트된 값이 input 에 담겨져있을테니 얘를 앞뒤의 공백을 없애는 trim을 써서 tag 값 업데이트
      insertTag(input.trim());
      // input 초기화
      setInput('');
    },
    [input, insertTag],
  );

  // tags 값이 바뀔 때
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력하세요"
          value={input}
          onChange={onChange}
        />
        <button type="submit">글 추가</button>
      </TagForm>
      {/* 업데이트 된 state 값을 tags props로, 클릭했을 때 onRemove 함수 실행 */}
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;
