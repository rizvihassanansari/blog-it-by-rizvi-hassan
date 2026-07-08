import React from "react";

import Post from "./Post";

const List = ({ posts }) => (
  <ul className="mt-4">
    {posts.map(post => (
      <Post key={post.id} {...post} />
    ))}
  </ul>
);

export default List;
