import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import PostItem from "./Item";

import postsApi from "../../../apis/posts";
import { Container, PageLoader } from "../../commons";
import Title from "../../commons/Title";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { t } = useTranslation();

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
        buttonProps={{ label: t("labels.newBlogPost"), onClick: handleClick }}
        titleText={t("titles.blogPosts")}
      />
      <ul className="mt-4">
        {posts.map(post => (
          <PostItem key={post.id} {...post} />
        ))}
      </ul>
    </Container>
  );
};

export default Index;
