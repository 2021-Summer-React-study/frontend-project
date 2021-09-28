import client from './client';
import qs from 'qs';
// post create
export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

// post read id 값 가져오기 위해서 backtic 사용
export const readPost = (id) => client.get(`/api/posts/${id}`);

// post list api with qs
export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  //   예시 >>> '/api/posts?username=tester&page=2'
  return client.get(`/api/posts?${queryString}`);
};

// update api
export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, { title, body, tags });

//delete api
export const removePost = id => client.delete(`/api/posts/${id}`);
