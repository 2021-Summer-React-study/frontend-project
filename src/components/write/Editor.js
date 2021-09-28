import React, { useEffect, useRef } from 'react';
// editor import
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';


// styled-component import
import styled from 'styled-components';

// pallet import
import palette from '../../lib/styles/palette';

// responsive component import
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
  /* 페이지 위아래 여백 지정 */
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;


const QuillWrapper = styled.div`
    .ql-editor{
        padding:0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
/* 첫번째 자식요소에 스타일링 css */
    .ql-editor .ql-blank::before{
        left: 0;
    }
`;

// redux props
const Editor = ({ title, body, onChangeField }) => {
    // quill 적용 div element 를 설정
    const quillElement = useRef(null);
    // quill instance 설정
    const quillInstance = useRef(null);

    useEffect(()=>{
        // useRef 로 DOM 요소에 접근하려면 .current 사용
        quillInstance.current = new Quill(quillElement.current,{
            // 테마 snow, bubble 두 가지가 있으며 불러올 때  'quill/dist/quill.snow.css', 'quill/dist/quill.bubble.css' 두 가지중 골라서 사용
            theme:'bubble',
            placeholder:'내용을 작성하세요..',
            modules:{
                toolbar:[
                    // toolbar option
                    [{header : '1'},{header: '2'}], //custom button values
                    // strike : 글씨에 밑줄
                    ['bold','italic','underline','strike','link'] , //toggle btn option
                    [{list: 'ordered'},{list:'bullet'}], // list option
                    ['blockquote','code-block','link','image'], // toggle btn option 
                ]
            }
        });
        // text-change event handler
        const quill = quillInstance.current;
        quill.on('text-change', ( delta, oldDelta, source) =>{
            if (source === 'user'){
                onChangeField({ key : 'body' ,value: quill.root.innerHTML})
            }
        });
    },[onChangeField]);
    // useEffect 는 마운트가 될 때 한번 실행되는데 그때는 mountRef 의 값 false >> 즉 처음 마운트 될 때를 이용
    const mounted = useRef(false);

    useEffect(()=>{
        // 마운트의 상태에 따라 작업을 처리
        // ref 값 사용시에는 current 로 접근
        if (mounted.current) return;
        // true 로 바꾸면 다음 리렌더링에서부터 if 문 실행. 
        mounted.current = true;
        quillInstance.current.root.innerHTML = body;
        
    },[body]);

    // input 은 e.target.value 로 설정
    const onChangeTitle = e =>{
        onChangeField({ key: 'title' , value : e.target.value})
    }

 
  return (
  
  <EditorBlock>
      <TitleInput 
      placeholder="제목을 입력하세요.."
      onChange={onChangeTitle}
      value={title}
       />
      <QuillWrapper>
          {/* 컴포넌트 내부의 DOM 을 외부에서도 사용하기 위해 컴포넌트에 직접 ref 전달 == DOM 에 ref 를 다는 것과 같음 */}
          <div ref={quillElement} />
      </QuillWrapper>
  </EditorBlock>
  
  
  );
};

export default Editor;
