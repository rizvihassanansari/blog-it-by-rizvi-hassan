import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { useParams, useHistory } from "react-router-dom";
import routes from "routes";

import postsApi from "../../apis/posts";
import { Container, PageLoader } from "../commons";
import Title from "../commons/Title";

const Show = () => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();
  const history = useHistory();

  const fetchPost = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
    } catch {
      history.replace(routes.root);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Title titleText={post.title} />
      <Typography className="mt-8">{post.description}</Typography>
    </Container>
  );
};

export default Show;
