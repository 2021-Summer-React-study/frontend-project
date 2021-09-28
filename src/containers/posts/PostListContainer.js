import React from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { useEffect } from 'react';

// withRouter 로 location 객체 접근 가능
const PostListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );

  useEffect(() => {
    //   location.search ? 뒤의 쿼리스트링을 값으로 하는 DOMstring.
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
    console.log(location)
  }, [dispatch, location, location.search]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
    //   user 객체가 유효할 때 (user 객체는 현재 로그인 중인 사용자의 정보를 가지고 있음 .) 
      showWriteButton={user}
    />
  );
};

export default withRouter(PostListContainer);
