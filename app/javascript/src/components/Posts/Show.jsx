import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import routes from "routes";

import List from "./List";

import postsApi from "../../apis/posts";
import { Container, PageLoader } from "../commons";
import Title from "../commons/Title";

const Show = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

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

  const handleClick = () => {
    history.push(routes.posts.create);
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
      <Title
        buttonProps={{ label: "Add a new blog post", onClick: handleClick }}
        titleText="Blog posts"
      />
      <List {...{ posts }} />
    </Container>
  );
};

export default Show;
