import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
// SubInfo,Tags import
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
//Link import
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 처음 요소 스타일링 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    /* h2:hover 와 같은 의미 */
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

// const SubInfo = styled.div`
//   color: ${palette.gray[6]};

//   span + span:before {
//     color: ${palette.gray[4]};
//     padding-left: 0.25rem;
//     padding-right: 0.25rem;
//     /* span */
//     content: '\\B7';
//   }
// `;

// const Tags = styled.div`
//   margin-top: 0.5rem;
//   .tag {
//     display: inline-block;
//     color: ${palette.violet[7]};
//     text-decoration: none;
//     margin-right: 0.5rem;
//     &:hover {
//       color: ${palette.violet[2]};
//     }
//   }
// `;

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post;
  return (
    <PostItemBlock>
      <h2>
      {/*  @username/post_id 값을 받아서 detail page 로 이동 */}
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>

      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
      />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && (
          // user 객체가 있으면 해당 버튼 보여주기
          <Button gray to="/write">
            새글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      {/* 로딩중이 아니고, 포스트 배열이 존재할 때마 해당 UI 띄우기 */}
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;
