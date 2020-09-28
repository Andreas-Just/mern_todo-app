import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/authHook';
import './Nav.scss';

type Props = {
  isAuthenticated: boolean;
};

export const Nav: React.FC<Props> = ({ isAuthenticated }) => {
  const history = useHistory();
  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();
    history.push('/');
  };

  return (
    <nav className="Nav">
      <div className="Nav-Wrapper blue darken-4 nav-wrapper">
        <span className="Nav-Logo brand-logo center">Note Book</span>
        <ul id="nav-mobile" className="Nav-List right hide-on-med-and-down">
          {isAuthenticated
            ? (
              <>
                <li>
                  <NavLink
                    to="/todos"
                    className="Nav-Item"
                    activeClassName='Nav-Item_active'
                  >
                    List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/create"
                    className="Nav-Item"
                    activeClassName='Nav-Item_active'
                  >
                    Create
                  </NavLink>
                </li>
                <li>
                  <a onClick={logoutHandler} className="Nav-Item">Sing Owt</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/home"
                    className="Nav-Item"
                    activeClassName='Nav-Item_active'
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="Nav-Item"
                    activeClassName='Nav-Item_active'
                  >
                    Sing In
                  </NavLink>
                </li>
              </>
            )
          }
        </ul>
      </div>
    </nav>
  );
};

