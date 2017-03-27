import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Button, Input, Grid, Dropdown } from 'semantic-ui-react';
import { CompaniesDropDown, PositionDropDown, SourceDropDown } from '../components';
import statusOptions from '../utils/statusOptions';

const mapDispatchToProps = dispatch => (
  bindActionCreators({

  }, dispatch)
);

const mapStateToProps = state => ({
  pickedCompanyId: state.company.pickedCompanyId,
  pickedPositionId: state.position.pickedPositionId,
  pickedSourceId: state.source.pickedSourceId,
});

class AddApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postURL: '',
      location: '',
      dateApplied: '',
      status: null,
      coverLetter: false,
      rank: null,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleCoverLetterButton = this.handleCoverLetterButton.bind(this);
    this.postApplication = this.postApplication.bind(this);
  }
  handleInput(e) {
    return this.setState({ [e.target.name]: e.target.value });
  }
  handleCoverLetterButton() {
    return this.setState(prevState => ({
      coverLetter: !prevState.coverLetter,
    }));
  }
  postApplication() {
    axios.post('/api/application', _.assign(this.state, {
      companyId: this.props.pickedCompanyId,
      positionId: this.props.pickedPositionId,
      sourceId: this.props.pickedSourceId,
    }))
    .then(() => {
      this.props.router.push(`dashboard/${this.props.params.userId}`);
    });
  }
  render() {
    const { postURL, location, dateApplied, status, coverLetter } = this.state;
    return (
      <Grid divided size="large" onSubmit={e => e.preventDefault}>
        <Grid.Row>
          <Grid.Column width={6}>
            <label htmlFor="company">Company</label>
            <CompaniesDropDown />
          </Grid.Column>
          <Grid.Column width={5}>
            <label htmlFor="position">Position</label>
            <PositionDropDown />
          </Grid.Column>
          <Grid.Column width={5}>
            <label htmlFor="source">Source</label>
            <SourceDropDown />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <label htmlFor="postURL">Enter Job Post URL</label>
            <Input
              fluid
              placeholder="enter job post url" onChange={this.handleInput}
              value={postURL}
              name="postURL"
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <Dropdown
              button fluid
              onChange={(e, data) => this.setState({ status: data.value })}
              placeholder="Choose Status of Application"
              options={statusOptions}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <label htmlFor="location">Enter Job Post Location</label>
            <Input
              fluid
              placeholder="enter job location"
              onChange={this.handleInput}
              value={location}
              name="location"
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <label htmlFor="dateApplied">Enter Date Applied</label>
            <Input
              fluid
              placeholder="enter date applied"
              onChange={this.handleInput}
              value={dateApplied}
              name="dateApplied"
              type="date"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Button onClick={this.handleCoverLetterButton}>
            Submitted Cover Letter?
            <span>{coverLetter ? 'NO' : 'YES'}</span>
          </Button>
          <div>
            Rank:
            {_.times(5, rank => (
              <Button key={rank + 1} onClick={() => this.setState({ rank: rank + 1 })}>
                {rank + 1}
              </Button>
            ))}
          </div>
        </Grid.Row>
        <Grid.Row>
          <Button color="teal" type="submit" onClick={this.postApplication}>Submit Application</Button>
        </Grid.Row>
      </Grid>
    );
  }
}

AddApplication.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  pickedCompanyId: PropTypes.number,
  pickedPositionId: PropTypes.number,
  pickedSourceId: PropTypes.number,
};

AddApplication.defaultProps = {
  pickedCompanyId: null,
  pickedPositionId: null,
  pickedSourceId: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddApplication);
