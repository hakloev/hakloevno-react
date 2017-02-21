import React from 'react';
import { connect } from 'react-redux';


class NotFound extends React.Component {
  static fetchData({ store }) {
    return Promise.resolve();
  }

  render() {
    return (
      <section id="main-content" className="container">
        <h1>Unfortunately, you tried to access a non-existing page...</h1>
      </section>
    )
  }
}


export default connect()(NotFound);
