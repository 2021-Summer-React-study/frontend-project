import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
// PostActionButton import
import PostActionButton from '../../components/post/PostActionButton';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = ({ match, history }) => {
  //  match 객체를 사용하면 해당 객체의 params 값을 참조할 수 있음
  // 요 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어있음
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(({ post, loading ,user}) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
    user:user.user
  }));

  useEffect(() => {
    dispatch(readPost(postId));
    // 언마운트 될 때 리덕스에서 포트스 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  }

  const ownPost = (user && user._id) === (post && post.user._id);

  const onRemove = async () =>{
    try{
      await removePost(postId);
      // 삭제 후 홈화면으로 이동
      history.push('/');
    }catch(e){
      console.log(e);
    }
  }
  return <PostViewer post={post} loading={loading} error={error} actionButtons={ownPost && <PostActionButton onEdit={onEdit} onRemove={onRemove} />} />;
};

// url 파라미터로 받아온 id 값을 조회하는 match 객체에 접근하기 위해 withRouter 사용
export default withRouter(PostViewerContainer) ;

