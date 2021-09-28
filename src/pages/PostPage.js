// read,detail
import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';

const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      {/* 교체 */}
      <PostViewerContainer />
    </>
  );
};

export default PostPage;
