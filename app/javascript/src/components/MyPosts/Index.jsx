import React from "react";

import { Typography } from "@bigbinary/neetoui";

import Table from "./Table";

import { useFetchMyPosts } from "../../hooks/reactQueries/usePostsApi";
import Title from "../commons/Title";

const Index = () => {
  const { data: { posts = [] } = {} } = useFetchMyPosts();

  return (
    <>
      <Title titleText="My blog posts" />
      <Typography className="my-4" style="body2" weight="semibold">
        14 Articles
      </Typography>
      <Table {...{ posts }} />
    </>
  );
};

export default Index;
