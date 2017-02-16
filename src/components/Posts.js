import React from 'react';
import Post from './Post';

class Posts extends React.Component {

  render() {
    const { posts } = this.props;

    if (!posts) {
      return <h1>No posts found...</h1>
    }

    return (
      <section id="article-container">
        {posts.map(post =>
          <Post
            key={post.url}
            data={post}
          />
        )}
      </section>
    )
  }
}

export default Posts;
