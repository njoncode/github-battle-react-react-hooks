import React from 'react';
import { FaRegBell } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ThemeContext from '../contexts/theme';

const activeStyle = {
  color: 'rgb(187, 46, 31)',
};

export default function Nav({ toggleTheme }) {
  const theme = React.useContext(ThemeContext);
  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink
            to="/"
            exact // only add the styles when the path of the current url matches exactly.
            activeStyle={activeStyle}
            className="nav-link"
          >
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle" activeStyle={activeStyle} className="nav-link">
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        style={{ fontSize: 30 }}
        className="btn-clear"
        onClick={toggleTheme}
      >
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  );
}

// When the curent theme is set to light mode, then we want to render the flashlight emoji.
// And when the current theme is dark, then we want to render the light bulb emoji.
