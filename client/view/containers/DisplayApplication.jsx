import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { Grid, Segment, Step, Accordion, Divider, Checkbox, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import statusOptions from '../utils/statusOptions';
import { AddContact, AddInterview, ApplicationStatus, AppMainInfo, DisplayInterviewDetails, ListContacts } from '../components';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

const mapStateToProps = state => ({
  application: state.application.application,
});

class DisplayApplication extends Component {
  constructor() {
    super();
    this.state = {
      showContactForm: false,
    };
    this.goToAppPage = this.goToAppPage.bind(this);
    this.showContactForm = this.showContactForm.bind(this);
  }
  goToAppPage(id) {
    this.props.router.push(`/dashboard/${this.props.params.userId}/application/${id}`);
  }
  showContactForm() {
    this.setState(prevState => ({
      showContactForm: !prevState.showContactForm,
    }))
  }
  render() {
    const { application, params: { appId } } = this.props;
    return (
      <div>
        {application &&
        <Grid>
          <Grid.Row centered>
            <Step.Group>
              {_.map(statusOptions, status => (
                <ApplicationStatus applicationStatus={application.status} {...status} />
              ))}
            </Step.Group>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column width={4}>
              <AppMainInfo {...application} />
              <h1>Contacts</h1>
              {_.map(application.contacts, contact => (
                <ListContacts key={contact.id} {...contact} />
              ))}
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                <Segment.Group stacked horizontal>
                  <Segment>Last Updated: {moment(application.updatedAt).calendar()}</Segment>
                  <Segment>Created At: {moment(application.createdAt).format('MMM Do YY')}</Segment>
                </Segment.Group>
              </Grid.Row>
              <Grid.Row>
                <h3>Date Applied: {application.dateApplied
                  ? moment(application.dateApplied).format('MMM Do')
                  : 'Apply My Friend. Apply'}
                </h3>
                <h3>Sent Cover Letter: {application.coverLetter ? 'Nice' : 'No Worries'}</h3>
                <Checkbox label="Rejected" defaultChecked={application.rejected} />
              </Grid.Row>
              <Grid.Row>
                <Button onClick={this.showContactForm}>Add Contact</Button>
                {this.state.showContactForm &&
                <AddContact
                  companyId={application.company.id}
                  applicationId={application.id}
                />}
              </Grid.Row>
              <Grid.Row>
                <AddInterview appId={appId} />
                <h1>Interviews</h1>
                <Accordion styled fluid>
                  {_.map(application.interviews, interview => (
                    <DisplayInterviewDetails key={interview.id} {...interview} />
                  ))}
                </Accordion>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>}
      </div>
    );
  }
}

DisplayApplication.propTypes = {
  application: PropTypes.objectOf(PropTypes.any),
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  params: PropTypes.objectOf(PropTypes.any).isRequired,
};

DisplayApplication.defaultProps = {
  application: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayApplication);
