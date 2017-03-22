import React, { Component, PropTypes } from 'react';

class Dashboard extends Component {
  constructor() {
    super();
    this.addApplication = this.addApplication.bind(this);
  }
  addApplication() {
    this.props.router.push(`/dashboard/${this.props.params.userId}/addApplication`);
  }
  render() {
    return (
      <div>
        <button onClick={this.addApplication}>Add Application</button>
        {this.props.children}
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node,
  router: PropTypes.object.isRequired,
};

Dashboard.defaultProps = {
  children: null,
};

export default Dashboard;
