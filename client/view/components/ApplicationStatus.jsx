import React, { PropTypes } from 'react';
import { Step } from 'semantic-ui-react';

const ApplicationStatus = ({ value, icon, title, applicationStatus }) => (
  <Step
    key={value}
    active={value === JSON.parse(applicationStatus)}
    completed={value < applicationStatus}
    icon={icon}
    title={title}
  />
);

ApplicationStatus.propTypes = {
  value: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  applicationStatus: PropTypes.number.isRequired,
};

export default ApplicationStatus;
