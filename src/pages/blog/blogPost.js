import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';

import { getPost } from 'api/ghost';

var images = document.querySelectorAll('.kg-gallery-image img');
images.forEach(function(image) {
  var container = image.closest('.kg-gallery-image');
  var width = image.attributes.width.value;
  var height = image.attributes.height.value;
  var ratio = width / height;
  container.style.flex = ratio + ' 1 0%';
});

function Post({ slug }) {
  const [error, setError] = useState([]);
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(slug)
      .then((post) => setPost(post))
      .catch((error) => setError(error.toString()));
  }, [slug]);

  return (
    <section className="skew-padding">
      <div className="container">
        {error ? <div>{error}</div> : null}
        {post ? (
          <div className="post">
            <PostHeader post={post} />
            <div className="spacer-2"></div>

            <div
              className="content"
              dangerouslySetInnerHTML={createMarkup(post.html)}
            />
            <div className="spacer-2"></div>
            <PostFooter post={post} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
export default Post;

export function PostHeader({ post }) {
  return (
    <div className="post-header">
      <div className="breadcrumbs">
        <div className="date">{formatDate(post.created_at)}</div>
        <Link to="/blog">Blog </Link> ▸ {post.title}
      </div>

      <h1>{post.title}</h1>

      {/* Excerpt */}
      {post.excerpt ? <p className="excerpt">{post.excerpt}</p> : null}

      <div className="byline">
        <div className="tag-container">
          {post.tags.map((tag) => {
            return (
              <Link to={'/tag/' + tag.slug} className="tag" key={tag.id}>
                {tag.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function PostFooter({ post }) {
  return (
    <div className="post-header">
      <div className="byline">
        <div className="tag-container">
          {post.tags.map((tag) => {
            return (
              <Link to={'/tag/' + tag.slug} className="tag" key={tag.id}>
                {tag.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function CTA({ post }) {
  return (
    <div className="post-header">
      <div className="byline">
        <div className="tag-container">
          {post.tags.map((tag) => {
            return (
              <Link to={'/tag/' + tag.slug} className="tag" key={tag.id}>
                {tag.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function createMarkup(input) {
  return { __html: input };
}

export function formatDate(input) {
  if (input instanceof Date) {
    return input.toLocaleDateString('en-US');
  } else {
    const date = new Date(input);
    return date.toLocaleDateString('en-US');
  }
}
