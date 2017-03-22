import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Button, Input, Form } from 'semantic-ui-react'
import { CompaniesDropDown } from '../components';

const mapDispatchToProps = dispatch => (
  bindActionCreators({

  }, dispatch)
);

const mapStateToProps = state => ({
  state,
});
class AddApplication extends Component {
  constructor() {
    super();
    this.state = {
      postURL: '', // string
      positionId: null, // int
      companyId: null, // int
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
    axios.post('/api/application', this.state)
    .then(({ data }) => {
      this.props.router.push(`dashboard/${this.params.userId}`)
    });
  }
  render() {
    const { postURL, location, dateApplied, status, coverLetter } = this.state;
    return (
      <Form size="large" widths="equal">
        <CompaniesDropDown />
        <Form.Field>
          <label htmlFor="postURL">Enter Job Post URL</label>
          <Input
            placeholder="enter job post url" onChange={this.handleInput}
            value={postURL}
            name="postURL"
            type="text"
          />
        </Form.Field>
        <Form.Group>
          <Form.Field>
            <label htmlFor="location">Enter Job Post URL</label>
            <Input
              placeholder="enter job location"
              onChange={this.handleInput}
              value={location}
              name="location"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dateApplied">Enter Job Post URL</label>
            <Input
              placeholder="enter date applied"
              onChange={this.handleInput}
              value={dateApplied}
              name="dateApplied"
              type="date"
            />
          </Form.Field>
        </Form.Group>
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
        <Button />
        <Button type="submit" onClick={this.postApplication}>Add Application</Button>
      </Form>
    );
  }
}

AddApplication.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddApplication);
