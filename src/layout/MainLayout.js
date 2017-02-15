import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';

class MainLayout extends Component {

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object.isRequired
};

export default MainLayout;
