import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = props => (
  <ul>
    {props.items.map((item, index) => (
      <li key={index}><Link to={item.url}>{item.text}</Link></li>
    ))}
  </ul>
);
Navbar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Navbar.defaultProps = {
  items: null,
};

export default Navbar;
