import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Button, Input, Grid, Dropdown } from 'semantic-ui-react';
import { CompaniesDropDown, PositionDropDown } from '../components';
import statusOptions from '../utils/statusOptions';

const mapDispatchToProps = dispatch => (
  bindActionCreators({

  }, dispatch)
);

const mapStateToProps = state => ({
  pickedCompanyId: state.company.pickedCompanyId,
  pickedPositionId: state.position.pickedPositionId,
});

class AddApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postURL: '', // string
      location: '', // string
      dateApplied: '', // date
      status: null, // int
      coverLetter: false, // bool
      rank: null, // int
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
    }))
    .then(() => {
      this.props.router.push(`dashboard/${this.props.params.userId}`);
    });
  }
  render() {
    const { postURL, location, dateApplied, status, coverLetter } = this.state;
    console.log(_.assign(this.state, {
      companyId: this.props.pickedCompanyId,
      positionId: this.props.pickedPositionId,
      userId: this.props.params.userId,
    }))
    return (
      <Grid size="large" widths="equal" onSubmit={e => e.preventDefault}>
        <Grid.Row>
          <Grid.Column width={6}>
            <CompaniesDropDown />
          </Grid.Column>
          <Grid.Column width={6}>
            <PositionDropDown />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <label htmlFor="postURL">Enter Job Post URL</label>
          <Input
            placeholder="enter job post url" onChange={this.handleInput}
            value={postURL}
            name="postURL"
            type="text"
          />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <label htmlFor="location">Enter Job Post Location</label>
            <Input
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
            {_.range(1, 6).map(rank => (
              <Button key={rank} onClick={() => this.setState({ rank })}>{rank}</Button>
            ))}
          </div>
          <Dropdown
            onChange={(e, data) => this.setState({ status: data.value })}
            placeholder="Add Status"
            options={statusOptions}
          />
        </Grid.Row>
        <Grid.Row>
          <Button color="teal" type="submit" onClick={this.postApplication}>Add Application</Button>
        </Grid.Row>
      </Grid>
    );
  }
}

AddApplication.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  pickedCompanyId: PropTypes.number,
  pickedPositionId: PropTypes.number,
};

AddApplication.defaultProps = {
  pickedCompanyId: null,
  pickedPositionId: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddApplication);
