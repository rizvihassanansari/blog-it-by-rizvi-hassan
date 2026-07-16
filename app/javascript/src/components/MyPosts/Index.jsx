import React, { useState } from "react";

import { Filter } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";

import FilterColumns from "./Filter/Columns";
import Pane from "./Filter/Pane";
import Table from "./Table";

import { useFetchMyPosts } from "../../hooks/reactQueries/usePostsApi";
import Title from "../commons/Title";

const Index = () => {
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    category: true,
    updatedAt: true,
    status: true,
  });
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const { data: { posts = [] } = {}, refetch } = useFetchMyPosts();

  const handleToggleVisibleColumns = event => {
    event.stopPropagation();
    event.preventDefault();

    setVisibleColumns(previous => ({
      ...previous,
      [event.target.id]: !!event.target.checked,
    }));
  };

  return (
    <>
      <Title titleText="My blog posts" />
      <div className="my-4 flex w-full items-center justify-between gap-1">
        <Typography style="body2" weight="semibold">
          14 Articles
        </Typography>
        <FilterColumns {...{ visibleColumns, handleToggleVisibleColumns }} />
        <Button
          icon={Filter}
          style="text"
          onClick={() => setIsPaneOpen(true)}
        />
      </div>
      <Table {...{ posts, refetch, visibleColumns }} />
      <Pane {...{ isPaneOpen, setIsPaneOpen }} />
    </>
  );
};

export default Index;
