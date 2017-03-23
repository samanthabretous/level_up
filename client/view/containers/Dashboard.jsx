import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Button } from 'semantic-ui-react';

const mapDispatchToProps = dispatch => (
  bindActionCreators({

  }, dispatch)
);

const mapStateToProps = state => ({
  applications: state.application.applications,
});

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
        <Button animated="fade" positive onClick={this.addApplication}>
          <Button.Content visible>
            Add Application
          </Button.Content>
          <Button.Content hidden>
            Get That Job Girl
          </Button.Content>
        </Button>
        {this.props.children}
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node,
  router: PropTypes.objectOf(PropTypes.any).isRequired,
};

Dashboard.defaultProps = {
  children: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
