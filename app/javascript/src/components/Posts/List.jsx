import React from "react";

import PostItem from "./Item";

const List = ({ posts }) => (
  <ul className="mt-4">
    {posts.map(post => (
      <PostItem key={post.id} {...post} />
    ))}
  </ul>
);

export default List;
