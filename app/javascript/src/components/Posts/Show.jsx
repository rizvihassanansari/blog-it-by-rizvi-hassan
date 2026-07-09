import React, { useEffect, useState } from "react";

import List from "./List";

import postsApi from "../../apis/posts";
import { Container, PageLoader } from "../commons";
import Title from "../commons/Title";

const Show = () => {
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
      <Title titleText="Blog posts" />
      <List {...{ posts }} />
    </Container>
  );
};

export default Show;
