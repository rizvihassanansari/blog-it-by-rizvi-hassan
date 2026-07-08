import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";

import List from "./List";

import postsApi from "../../apis/posts";
import { Container, PageLoader } from "../commons";

const Posts = () => {
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
      <Typography className="mt-4" style="h1" weight="bold">
        Blog posts
      </Typography>
      <List {...{ posts }} />
    </Container>
  );
};

export default Posts;
