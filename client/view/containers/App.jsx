import React, { Component, PropTypes } from 'react';
import { Navbar } from '../components';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar userId={this.props.params.userId} />
        <section style={{ height: '90vh', padding: '5%' }}>
          {this.props.children}
        </section>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
};


export default App;
