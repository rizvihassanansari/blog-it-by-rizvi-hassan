import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";

import { Container, PageLoader } from "./commons";

import postsApi from "../apis/posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <Typography style="h1" weight="bold">
        Blog posts
      </Typography>
      {posts.map(post => (
        <p key={post.id}>{post.title}</p>
      ))}
    </Container>
  );
};

export default Home;
