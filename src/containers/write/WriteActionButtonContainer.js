import React, { useEffect } from 'react';
import WriteActionButton from '../../components/write/WriteActionButton';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writePost,updatePost } from '../../modules/write';
import { write } from '../../../node_modules/ieee754/index';

const WriteActionButtonContainer = ({history}) => {
  const dispatch = useDispatch();

  const { title, body, tags, post, postError,originalPostId } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
    originalPostId : write.originalPostId,
  }));
  //  컴포넌트에서 onClick 이벤트로 호출할 함수
  const onPublish = () => {
    // postid 가 있으면 업데이트 액션 생성 함수 실행
    if ( originalPostId ){
      dispatch(updatePost({ title, body,tags, id: originalPostId}));
      return;
    }
    dispatch(
      // 리덕스 스토어 안에 들어있는 값을 사용.
      writePost({
        title,
        body,
        tags,
      }),
    );
  };

  const onCancel = () =>{
    // history 객체 사용으로 뒤로 가기
      history.goBack()
  };

  useEffect(()=>{
    // post 작성이 성공하면 
      if(post){
          const {_id, user } = post;
          // _id, username 값을 참조해서 포스트를 읽을 수 있는 detail 경로를 만듬. 그리고 해당 경로로 이동
          history.push(`/@${user.username}/${_id}`);
      }

  if(postError){
      console.log(postError)
  }
},[history, post, postError]);

  return (
    // ! 는 하나쓰면 한번 부정, !! 는 한번 더 즉, 이중 부정. 그래서 해당 postid 값이 있냐에 따라서 버튼의 텍스트 값 바꿀 것임
    // 얘를 왜 쓰냐, 불리언으로 형변환을 위해 씀. 1 을 true 로, 0을 false 로 와 같은..!
  <WriteActionButton onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId} />
  
  );
};
// 라우트가 아닌 컴포넌트에서 history 객체를 사용하기 위해서 컴포넌트를 withRouter 로 감싸줌
export default withRouter(WriteActionButtonContainer);


 