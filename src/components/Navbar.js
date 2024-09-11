import React, { useCallback, useEffect, useState } from 'react';

import { jwtDecode } from 'jwt-decode';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

import { navMenus } from '../utils/data';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Navbar = ({ menuIdx }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { name } = user || {};
  const googleClientId = process.env.REACT_APP_AUTH_CLIENT_ID;
  const [isAuth, setIsAuth] = useState(false);

  const handleLoginSucess = useCallback((response) => {
    const decoded = jwtDecode(response.credential);
    dispatch(login({ authData: decoded }));
    setIsAuth(true);
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('authData'));
    if (storedData) {
      dispatch(login({ authData: storedData }));
      setIsAuth(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (window.google) {
      // 구글 아이디가 가져와 졌을 때
      window.google.accounts.id.initialize({
        // 구글 값 초기화
        client_id: googleClientId,
        callback: handleLoginSucess,
      });
    }
  }, [googleClientId, handleLoginSucess]);

  const handleLoginClick = () => {
    window.google.accounts.id.prompt(); // 로그인 팝업 띄우기
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setIsAuth(false);
  };

  return (
    <nav className="navi bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500 py-10 px-4 flex flex-col justify-between items-center overflow-auto">
      <div className="logo-wrapper flex w-full items-center justify-center gap-6">
        <div className="logo"></div>
        <h2 className="font-semibold text-xl">
          <Link to={'/'} className="font-customFontEn">
            MINGYEONG
          </Link>
        </h2>
      </div>

      <ul className="menus">
        {navMenus.map((menu, idx) => (
          <li
            key={idx}
            className={`${
              menu.idx === menuIdx ? 'bg-gray-950' : ''
            } border border-gray-700 mb-3 rounded-md hover:bg-gray-950 transition-all`}
          >
            <Link to={menu.to} className="flex gap-x-4 items-center px-10 py-2">
              {menu.icon}
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
      {isAuth ? (
        <div className="w-4/5">
          <button
            onClick={handleLogoutClick}
            className="flex justify-center items-center gap-2 bg-gray-300 text-black py-2 px-4 rounded-md  font-semibold w-full"
          >
            <FcGoogle className="h-5 w-5" />
            <span className="text-sm">{name}님 Logout</span>
          </button>
        </div>
      ) : (
        <div className="w-4/5">
          <button
            onClick={handleLoginClick}
            className="flex justify-center items-center gap-2 bg-gray-300 text-black py-2 px-4 rounded-md w-full font-semibold"
          >
            <FcGoogle className="h-5 w-5" />
            Login Width Google
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
