import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapDispatchToProps = dispatch => (
  bindActionCreators({

  }, dispatch)
);

const mapStateToProps = state => ({
  state,
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.submitLoginInfo = this.submitLoginInfo.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }
  submitLoginInfo() {
    axios.post('/api/user/authentication', this.state)
    .then(({ data }) => {
      console.log(data)
    });
  }
  updateInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div>
        Username:
        <input name="username" onChange={this.updateInput} type="text" />
        Password:
        <input name="password" onChange={this.updateInput} type="password" />
        <button onClick={this.submitLoginInfo}>Submit</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
