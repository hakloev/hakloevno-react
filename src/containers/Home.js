import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Posts from '../components/Posts';
import { postFetchData } from '../actions/blog';


class Home extends React.Component {

  static fetchData({ store }) {
    return store.dispatch(postFetchData());
  }

  render() {
    return (
      <div id="main-content" className="container">
        <Posts
          fetchData={this.props.fetchData}
          posts={this.props.post}
        />
      </div>
    );
  }
};


const mapStateToProps = state => {
  return {
    post: state.blog.post,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(postFetchData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
