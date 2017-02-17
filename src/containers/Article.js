import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import PostDetail from '../components/PostDetail';

import { fetchPost } from '../actions/blog';


class Article extends React.Component {
  static fetchData({ store, params }) {
    return store.dispatch(fetchPost(params.slug));
  }

  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div id="main-content" className="container">
        {this.props.post &&
          <section id="article-container">
            <PostDetail data={this.props.post} />
          </section>
        }
        <Link to="/">home</Link>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.blog.articles[ownProps.params.slug],
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: () => dispatch(fetchPost(ownProps.params.slug)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Article);
