import './App.css';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
// Helmet import
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
    <Helmet><title>Korin's project</title></Helmet>
      {/* 배열에 넣어줌으로써 여러 개의 경로를 쉽게 설정. 리액트 v5 이후부터 이렇게 2번쓰지 않고 배열에 담기 가능 */}
      {/* @:username 방식은 http://localhost:3000/@korin 과 같이 username 을 파라미터로 읽을 수 있음.  */}
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
    </>
  );
}

export default App;
