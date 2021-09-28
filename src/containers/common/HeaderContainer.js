import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
    // user 리덕스 연결
    const { user } = useSelector(({user}) => ({ user : user.user}));
    const dispatch = useDispatch();

    const onLogout = ()=>{
        // logout 액션 생성함수 디스패치
        dispatch(logout());
    }
    return (
        <div>
            <Header user = {user} onLogout={onLogout} />
        </div>
    );
};

export default HeaderContainer;