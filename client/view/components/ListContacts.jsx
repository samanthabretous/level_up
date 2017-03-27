import React, { PropTypes } from 'react';
import { Menu } from 'semantic-ui-react';

const ListContacts = ({ id, name, position, email, phone }) => (
  <Menu fluid vertical key={id}>
    <Menu.Item>{name}</Menu.Item>
    <Menu.Item>{position.type}</Menu.Item>
    <Menu.Item>{email}</Menu.Item>
    <Menu.Item>{phone}</Menu.Item>
  </Menu>
);

ListContacts.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.objectOf(PropTypes.any).isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default ListContacts;
