import React, { PropTypes } from 'react';
import { Grid, Menu, Rating } from 'semantic-ui-react';

const AppMainInfo = (props) => (
  <Menu fluid vertical>
    <Menu.Item className="header">{props.position.type}</Menu.Item>
    <Menu.Item>{props.company.name}</Menu.Item>
    <Menu.Item>{props.location}</Menu.Item>
    <Menu.Item>
      <a href={props.postURL}>Job Posting</a>
      <p>Source: {props.source.type}</p>
    </Menu.Item>
    <Menu.Item>
      <Rating icon="star" defaultRating={props.rank} maxRating={5} size="huge" />
    </Menu.Item>
  </Menu>
);

AppMainInfo.propTypes = {
  position: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
  postURL: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
};

export default AppMainInfo;
