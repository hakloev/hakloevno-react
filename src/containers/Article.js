import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Article extends React.Component {
  static fetchData({ store }) {
    return Promise.resolve();
  }

  render() {
    return (
      <div id="main-content" className="container">
        <h1>{this.props.params.slug}</h1>
        <Link to="/">home</Link>
      </div>
    );
  }
};

export default connect()(Article);
