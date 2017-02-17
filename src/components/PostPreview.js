import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import Moment from 'moment';

import { renderer } from '../utils';

class PostPreview extends React.Component {

  render() {
    const { data: post } = this.props;

    return (
      <article className="article-preview">
        <header>
          <Link to={`/articles/${post.slug}`}><h1>{post.title}</h1></Link>
          <h6>{Moment(post.created).format('dddd, Do of MMMM YYYY')}</h6>
        </header>
        <section className="article-ingress">
          <div dangerouslySetInnerHTML={{ __html: marked(post.ingress, { sanitize: true, renderer }) }} />
        </section>
      </article>
    );
  };
}

export default PostPreview;
