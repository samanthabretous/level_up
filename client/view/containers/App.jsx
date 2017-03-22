import React, { Component, PropTypes } from 'react';
import axios from 'axios';

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
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
