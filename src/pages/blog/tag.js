import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';

import { getTag } from 'api/ghost';

function TagPage({ slug }) {
  const [error, setError] = useState([]);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getTag(slug)
      .then((posts) => setPostList(posts))
      .catch((error) => setError(error.toString()));
  }, []);

  return (
    <section style={{ marginTop: '60px' }}>
      <div className="container" style={{ margin: '0 auto', maxWidth: '42em' }}>
        <div className="breadcrumbs">
          <Link to="/blog">Blog </Link> ▸ Tag ▸ {slug}
        </div>

        <div className="spacer-1"></div>

        {error ? <div>{error}</div> : null}
        <SearchResults path="/" posts={postList} />
      </div>
    </section>
  );
}

export default TagPage;

// function SearchForm(params) {
//   return (
//     <div className="panel">
//       <form action="">
//         <fieldset>
//           <div className="form-group">
//             <label htmlFor="">Filter By Topic</label>

//             <div>
//               <label>
//                 <input
//                   className="form-radio"
//                   name="paymentSourceCheck"
//                   id="usePaymentSource"
//                   type="checkbox"
//                   checked={false}
//                   onChange={(e) => {
//                     // setUsePaymentSource(e.target.checked);
//                     console.log(e.target.checked);
//                   }}
//                 />
//                 Tech
//               </label>
//             </div>

//             <div>
//               <label>
//                 <input
//                   className="form-radio"
//                   name="paymentSourceCheck"
//                   id="usePaymentSource"
//                   type="checkbox"
//                   checked={false}
//                   onChange={(e) => {
//                     // setUsePaymentSource(e.target.checked);
//                     console.log(e.target.checked);
//                   }}
//                 />
//                 Software Design
//               </label>
//             </div>

//             <div>
//               <label>
//                 <input
//                   className="form-radio"
//                   name="paymentSourceCheck"
//                   id="usePaymentSource"
//                   type="checkbox"
//                   checked={false}
//                   onChange={(e) => {
//                     // setUsePaymentSource(e.target.checked);
//                     console.log(e.target.checked);
//                   }}
//                 />
//                 Future of Work
//               </label>
//             </div>

//             <div>
//               <label>
//                 <input
//                   className="form-radio"
//                   name="paymentSourceCheck"
//                   id="usePaymentSource"
//                   type="checkbox"
//                   checked={false}
//                   onChange={(e) => {
//                     // setUsePaymentSource(e.target.checked);
//                     console.log(e.target.checked);
//                   }}
//                 />
//                 Mechanism Design
//               </label>
//             </div>
//           </div>
//         </fieldset>

//         <fieldset>
//           <div className="form-group">
//             <label htmlFor="">Search</label>
//             <input className="form-control" type="text" />
//             <small>Enter a term to search</small>
//           </div>
//         </fieldset>

//         <button className="btn btn-primary">Search </button>
//       </form>
//     </div>
//   );
// }

function SearchResults({ posts }) {
  return (
    <div className="">
      {posts.map((post) => {
        return (
          <Link to={'/blog/' + post.slug} key={post.id}>
            <div className="panel">
              <PostHeader post={post} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function PostHeader({ post }) {
  return (
    <div className="post-header">
      <div className="breadcrumbs">
        <div className="date">{formatDate(post.created_at)}</div>
        {/* <Link to="/blog">Blog </Link> ▸ {post.title} */}
      </div>

      <h1>{post.title}</h1>

      {/* Excerpt */}
      {post.excerpt ? <p className="excerpt">{post.excerpt}</p> : null}

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
    </div>
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
