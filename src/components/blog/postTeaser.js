import React from 'react';
import { Link } from '@reach/router';

export default PostTeaser;

export function PostTeaser({ post }) {
  return (
    <Link to={'/blog/' + post.slug} key={post.id}>
      <div className="panel">
        <div className="post-teaser">
          <div className="breadcrumbs">
            <div className="date">{formatDate(post.created_at)}</div>
          </div>

          <div className="h2">{post.title}</div>

          {/* Excerpt */}
          {post.excerpt ? <p className="excerpt">{post.excerpt}</p> : null}

          {post.tags && post.tags.length ? (
            <div className="byline">
              <div className="tag-container">
                {post.tags.map((tag) => {
                  return (
                    <span className="tag" key={tag.id}>
                      {tag.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function formatDate(input) {
  if (input instanceof Date) {
    return input.toLocaleDateString('en-US');
  } else {
    const date = new Date(input);
    return date.toLocaleDateString('en-US');
  }
}
