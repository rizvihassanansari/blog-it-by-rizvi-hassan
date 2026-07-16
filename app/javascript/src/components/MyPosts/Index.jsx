import React, { useState } from "react";

import { Filter } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import { DEFAULT_FILTER_OPTIONS } from "./constants";
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
  const [filterOptions, setFilterOptions] = useState(DEFAULT_FILTER_OPTIONS);

  const { t } = useTranslation();
  const { data: { posts = [] } = {}, refetch } = useFetchMyPosts(filterOptions);

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
      <Title titleText={t("titles.myBlogPosts")} />
      <div className="my-4 flex w-full items-center justify-between gap-2">
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
      <Pane
        {...{
          isPaneOpen,
          setIsPaneOpen,
          filterOptions,
          setFilterOptions,
          refetch,
        }}
      />
    </>
  );
};

export default Index;
