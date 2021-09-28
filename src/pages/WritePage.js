// create
import React from 'react';
import Responsive from '../components/common/Responsive';
// EditorContainer import
import EditorContainer from '../containers/write/EditorContainer';
import WriteActionButton from '../components/write/WriteActionButton';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonContainer from '../containers/write/WriteActionButtonContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
  return (
    <div>
      <Responsive>
        <Helmet><title>글 작성하기</title></Helmet>
        <EditorContainer />
          
        <TagBoxContainer />
         {/* 교체 */}
        <WriteActionButtonContainer />
      </Responsive>
    </div>
  );
};

export default WritePage;
