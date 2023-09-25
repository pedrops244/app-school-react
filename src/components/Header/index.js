import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaRegistered, FaIdBadge } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';
import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const name = useSelector((state) => state.auth.user.nome);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  };
  return (
    <Nav>
      {isLoggedIn ? <h1>Olá, {name}</h1> : <div className="empty-div" />}
      <div>
        <Link to="/">
          <FaHome size={24} />
        </Link>
        {isLoggedIn ? (
          <Link to="/register">
            <FaIdBadge size={22} />
          </Link>
        ) : (
          <Link to="/register">
            <FaRegistered size={24} />
          </Link>
        )}

        {isLoggedIn ? (
          <Link onClick={handleLogout} to="/logout">
            <FaSignInAlt size={24} />
          </Link>
        ) : (
          <Link to="/login">
            <FaUserAlt size={22} />
          </Link>
        )}
      </div>
    </Nav>
  );
}
