import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { useParams, useHistory } from "react-router-dom";
import routes from "routes";

import Tags from "./commons/Tags";

import postsApi from "../../apis/posts";
import { PageLoader } from "../commons";
import UserAvatar from "../commons/Avatar";
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
    <>
      <Tags categories={post.categories} />
      <Title titleText={post.title} />
      <UserAvatar
        showName
        date={post.created_at}
        size="large"
        user={post.user}
      />
      <Typography className="mt-8">{post.description}</Typography>
    </>
  );
};

export default Show;
