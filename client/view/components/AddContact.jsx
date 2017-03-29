import React, { Component, PropTypes } from 'react';
import { Grid, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addContact } from '../../redux/application';
import { getPositionsAsync } from '../../redux/position';
import { PositionDropDown } from '../components';

const mapStateToProps = state => ({
  pickedPositionId: state.position.pickedPositionId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addContact,
    getPositionsAsync,
  }, dispatch)
);

class AddContact extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getPositionsAsync()
  }
  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit() {
    const { applicationId, companyId, addContact, pickedPositionId } = this.props;
    addContact(Object.assign(this.state, { applicationId, companyId, positionId: pickedPositionId }));
  }
  render() {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <h1>New Contact Form</h1>
          </Grid.Row>
          <Grid.Row>
            <PositionDropDown />
          </Grid.Row>
          <Grid.Row>
            <Input
              label="Name"
              type="text"
              onChange={this.handleInput}
              name="name"
            />
          </Grid.Row>
          <Grid.Row>
            <Input
              label="Email"
              type="text"
              onChange={this.handleInput}
              name="email"
            />
          </Grid.Row>
          <Grid.Row>
            <Input
              label="Phone"
              type="text"
              onChange={this.handleInput}
              name="phone"
            />
          </Grid.Row>
          <Grid.Row>
            <Button onClick={this.handleSubmit}>Create New Contact</Button>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

AddContact.propTypes = {
  applicationId: PropTypes.number,
  companyId: PropTypes.number,
  pickedPositionId: PropTypes.number,
};

AddContact.defaultProps = {
  applicationId: null,
  companyId: null,
  pickedPositionId: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
