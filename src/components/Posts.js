import React from 'react';
import PostPreview from './PostPreview';

class Posts extends React.Component {

  render() {
    const { posts } = this.props;

    if (posts.length === 0) {
      <h1>Unfortunately, I can't seem to find any posts...</h1>
    }

    return (
      <section id="article-container">
        {posts
          .filter(post => post.publish)
          .map(post => {
            return <PostPreview
              key={post.url}
              data={post}
            />
          })
        }
      </section>
    )
  }
}

export default Posts;
