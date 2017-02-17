import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Posts from '../components/Posts';
import { fetchPosts } from '../actions/blog';


class Home extends React.Component {

  static fetchData({ store }) {
    return store.dispatch(fetchPosts());
  }

  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div id="main-content" className="container">
        <Posts
          fetchData={this.props.fetchData}
          posts={this.props.posts}
        />
      </div>
    );
  }
};


const mapStateToProps = state => {
  return {
    posts: state.blog.ids.map(id => state.blog.articles[id]),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchPosts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
