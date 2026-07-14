import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom";

import Tags from "./commons/Tags";

import { useShowPost } from "../../hooks/reactQueries/usePostsApi";
import { PageLoader } from "../commons";
import UserAvatar from "../commons/Avatar";
import Title from "../commons/Title";

const Show = () => {
  const { slug } = useParams();

  const { data: { post = {} } = {}, isLoading } = useShowPost(slug);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Tags categories={post?.categories} />
      <Title titleText={post?.title} />
      <UserAvatar
        showName
        className="my-3"
        date={post?.createdAt}
        size="large"
        user={post?.user}
      />
      <Typography className="my-8 whitespace-pre-wrap break-words">
        {post?.description}
      </Typography>
    </>
  );
};

export default Show;
