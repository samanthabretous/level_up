import React, { Component, PropTypes } from 'react';
import { Modal, Button, Dropdown, Input, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postInterview } from '../../redux/application';
import statusOptions from '../utils/statusOptions';
import { AddContact } from '../components';


const interviewContent = [
  { value: 'HR', key: 1, text: 'HR' },
  { value: 'Behavioral', key: 2, text: 'Behavioral' },
  { value: 'Technical', key: 3, text: 'Technical' },
  { value: 'Behavioral & Technical', key: 4, text: 'Behavioral & Technical' },
];

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    postInterview,
  }, dispatch)
);

class AddInterview extends Component {
  constructor() {
    super();
    this.state = {
      phrase: 0,
      content: null,
      when: null,
      time: null,
      codeChallenge: false,
      codeChallengeNotes: '',
      thankYou: false,
      feedBack: '',
      reminder: false,
      reminderNotes: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }
  handleSubmit() {
    this.props.postInterview(Object.assign(this.state, { applicationId: this.props.appId }))
  }
  handleDropdown(e, { value, name }) {
    this.setState({ [name]: value });
  }
  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleCheckbox(e, { name }) {
    this.setState(prevState => ({ [name]: !prevState[name] }));
  }
  render() {
    const { codeChallenge, reminder } = this.state;
    console.log(this.state)
    return (
      <Modal closeOnDocumentClick trigger={<Button>Add Interview</Button>}>
        <Modal.Header>New Interview Form</Modal.Header>
        <Modal.Content>
          <label htmlFor="phrase">Phrase:</label>
          <Dropdown
            button closeOnBlur
            options={statusOptions.slice(2)}
            placeholder="Phrase"
            name="phrase"
            onChange={this.handleDropdown}
          />
          <label htmlFor="content">Interview Content</label>
          <Dropdown
            button closeOnBlur
            options={interviewContent}
            placeholder="Interview Content"
            name="content"
            onChange={this.handleDropdown}
          />
          <Input
            label="Interview Date"
            onChange={this.handleInput}
            name="when"
            type="date"
          />
          <Input
            label="Interview Time"
            onChange={this.handleInput}
            name="time"
            type="time"
          />
          <Checkbox
            toggle
            label="CodeChallenge?"
            name="codeChallenge"
            onClick={this.handleCheckbox}
          />
          {codeChallenge && <Input
            label="Code Challenge Notes"
            onChange={this.handleInput}
            name="codeChallengeNotes"
            type="text"
          />}
          <Checkbox
            toggle
            label="Sent Thank You Note?"
            name="thankYou"
            onClick={this.handleCheckbox}
          />
          <Input
            label="Feed Back"
            onChange={this.handleInput}
            name="feedBack"
            type="text"
          />
          <Checkbox
            toggle
            label="Reminder"
            name="reminder"
            onClick={this.handleCheckbox}
          />
          {reminder && <Input
            label="Reminder Notes"
            onChange={this.handleInput}
            name="reminderNotes"
            type="text"
          />}
        </Modal.Content>
        <Button onClick={this.handleSubmit}>Sumbit</Button>
      </Modal>
    );
  }
}

AddInterview.propTypes = {
  appId: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(AddInterview);
