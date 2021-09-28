import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
// SubInfo,Tags import
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

// const SubInfo = styled.div`
//   margin-top: 1rem;
//   color: ${palette.gray[6]};
//   /* span 사이에 가운데점 문자 보여주기 */
//   span + span:before {
//     color: ${palette.gray[5]};
//     padding-left: 0.25rem;
//     padding-right: 0.25rem;
//     /* 가운데점 문자 */
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

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  // error 발생시
  if (error) {
    // 404 not found error
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock> 존재하지 않는 포스트입니다. </PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!!!!!!!!!!!!!!!!!</PostViewerBlock>;
  }
  // 로딩중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    return null;
  }
  const { title, body, user, publishedDate, tags } = post;
  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title} - Korin's project</title>
      </Helmet>
      <PostHead>
        <h1>{title}</h1>

        {/* <SubInfo>
          <span>
            <p>{user.userame}</p>
          </span>
          {/* 사용자의 문화권에 맞는 시간 표현법으로 현재 시간을 리턴 */}
        {/* <span>{new Date(publishedDate).toLocaleDateString()}</span>
        </SubInfo> */}
        <SubInfo
          username={user.username}
          publishedDate={publishedDate}
          // margin-top props
          hasMarginTop
        />
        {/* <Tags>
          {tags.map((tag) => (
            <div className="tag">#{tag} </div>
          ))}
        </Tags> */}
        <Tags tags={tags} />
      </PostHead>
      {actionButtons}
      <PostContent
        //   리액트에서는 HTML 을 그대로 렌더링하는 형태로 작성하면 일반텍스트 형태로 나타나므로, HTML 적용할 때는  dangerouslySetInnerHTML 이라는 props 설정
        // innerHTML 을 DOM 에서 사용하기위한 대체방법. 사이트간에 스크립팅 공격에 쉽게 노출될 수 있기 때문에 앞에 dangerous 키워드가 붙은 것.
        // 그래서 위험함을 상기시키기 위해 키워드와 함께 __html 키로 객체를 전달함
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </PostViewerBlock>
  );
};

export default PostViewer;
