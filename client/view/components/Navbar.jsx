import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const style = {
  navbar: {
    width: '100vw',
    height: '10vh',
    background: 'blue',
    padding: '0 5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menu_item: {
    color: 'white',
    fontSize: 24,
  },
};

const Navbar = ({ userId }) => (
  <nav style={style.navbar}>
    <div>
      <Link style={style.menu_item} to={`/dashboard/${userId}/`}>Home</Link>
    </div>
    <div>
      <Link style={style.menu_item} to="/">Add Application</Link>
    </div>
  </nav>
);
Navbar.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Navbar;
