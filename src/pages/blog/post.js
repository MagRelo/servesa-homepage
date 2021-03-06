import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';

import { getPost } from 'api/ghost';

import NextPost from 'components/blog/nextPost';
// import Subscribe from 'pages/blog/subscribe';

function Post({ slug }) {
  const [error, setError] = useState([]);
  const [post, setPost] = useState({});

  useEffect(() => {
    getPost(slug)
      .then((post) => setPost(post))
      .catch((error) => setError(error.toString()));
  }, [slug]);

  return (
    <div className="diagonal-box bg-five">
      <div className="container">
        {error ? <div>{error}</div> : null}
        {post.title ? (
          <div className="post">
            {/* Date */}
            <div className="date">{formatDate(post.created_at)}</div>

            {/* Title */}
            <h1>{post.title}</h1>
            <div className="spacer-2"></div>

            {/* Content */}
            <div
              className="content"
              dangerouslySetInnerHTML={createMarkup(post.html)}
            />

            {/*  */}
            <div className="spacer-2"></div>
            <div className="dots">· · ·</div>
            <NextPost currentPost={post} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default Post;

// export function PostHeader({ post }) {
//   return (
//     <div className="post-header">
//       {/* <div className="breadcrumbs">
//         <Link to="/blog">Home </Link> <b>»</b> {post.title}
//       </div> */}

//       {/* Excerpt */}
//       {/* {post.excerpt ? <p className="excerpt">{post.excerpt}</p> : null} */}

//       {/* {post.tags.length ? (
//         <div className="byline">
//           <div className="tag-container">
//             {post.tags.map((tag) => {
//               return (
//                 <Link to={'/tag/' + tag.slug} className="tag" key={tag.id}>
//                   {tag.name}
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       ) : null}
//        */}
//     </div>
//   );
// }

// export function PostFooter({ post }) {
//   return (
//     <div className="post-header">
//       {post.tags.length ? (
//         <div className="byline">
//           <div className="tag-container">
//             {post.tags.map((tag) => {
//               return (
//                 <Link to={'/tag/' + tag.slug} className="tag" key={tag.id}>
//                   {tag.name}
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }

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
