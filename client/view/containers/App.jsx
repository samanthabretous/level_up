import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { Navbar } from '../components/index';

class App extends Component {
  componentDidMount() {
    axios.get('/auth')
    .then((username) => {
      if (username && username[0] !== '<') {
        this.setState({ username });
      }
    });
  }
  render() {
    return (
      <div>
        <Navbar items={[{ text: 'Home', url: '/' }, { text: 'Login', url: '/login' }]} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
