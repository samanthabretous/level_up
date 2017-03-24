import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { Table, Dropdown, Checkbox, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { ListHeader } from '../components';
import statusOptions from '../utils/statusOptions';
import { updateRankStatusOrRejected } from '../../redux/application';


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateRankStatusOrRejected
  }, dispatch)
);

const mapStateToProps = state => ({
  applications: state.application.applications,
});

class ListUserApplication extends Component {
  constructor() {
    super();
    this.goToAppPage = this.goToAppPage.bind(this);
  }
  goToAppPage(id) {
    this.props.router.push(`/dashboard/${this.props.params.userId}/application/${id}`);
  }
  render() {
    const { applications, updateRankStatusOrRejected, params: { userId } } = this.props;
    const rankOptions = _.range(0, 6).map(num => ({ text: num, value: num }));
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
        <Table color="blue">
          <ListHeader />
          <Table.Body>
            {applications && _.map(applications, app => (
              <Table.Row key={app.id}>
                <Table.Cell>
                  <Dropdown
                    onChange={(e, data) =>
                      updateRankStatusOrRejected(app.id, userId, data.value, app.status, app.rejected)
                    }
                    options={rankOptions}
                    defaultValue={app.rank}
                  />
                </Table.Cell>
                <Table.Cell>
                  <h3 onClick={() => this.goToAppPage(app.id)}>
                    {app.company.name}
                  </h3>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    onChange={(e, data) =>
                      updateRankStatusOrRejected(app.id, userId, app.rank, data.value, app.rejected)
                    }
                    options={statusOptions}
                    defaultValue={parseInt(app.status)}
                  />
                  <Checkbox
                    toggle
                    onClick={() =>
                      updateRankStatusOrRejected(app.id, userId, app.rank, app.status, !app.rejected)
                    }
                    label="Rejected?"
                    defaultChecked={app.rejected}
                  />
                </Table.Cell>
                <Table.Cell>
                  {moment(app.updatedAt).calendar()}
                </Table.Cell>
                <Table.Cell>
                  {moment(app.createdAt).format('MMM Do YY')}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

ListUserApplication.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.object),
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  params: PropTypes.object.isRequired,
  updateRankStatusOrRejected: PropTypes.func.isRequired,
};

ListUserApplication.defaultProps = {
  applications: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUserApplication);
