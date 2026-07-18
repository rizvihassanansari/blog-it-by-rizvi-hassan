import React, { useState } from "react";

import { Filter } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { DEFAULT_FILTER_OPTIONS } from "components/MyPosts/constants";
import DeleteModal from "components/MyPosts/DeleteModal";
import FilterColumns from "components/MyPosts/Filter/Columns";
import Pane from "components/MyPosts/Filter/Pane";
import Table from "components/MyPosts/Table";
import { isNotEmpty, without } from "ramda";
import { useTranslation } from "react-i18next";

import SelectedRowsAction from "./SelectedRowsAction";
import ShowSelectedFilters from "./ShowSelectedFilters";

import {
  useBulkDeletePosts,
  useBulkUpdatePosts,
  useFetchMyPosts,
} from "../../hooks/reactQueries/usePostsApi";
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
  const [selectedRowsSlug, setSelectedRowsSlug] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { t } = useTranslation();
  const { data: { posts = [] } = {}, refetch } = useFetchMyPosts(filterOptions);

  const { mutateAsync: bulkUpdate } = useBulkUpdatePosts();
  const { mutateAsync: bulkDelete } = useBulkDeletePosts();

  const handleToggleVisibleColumns = event => {
    event.stopPropagation();
    event.preventDefault();

    setVisibleColumns(previous => ({
      ...previous,
      [event.target.id]: !!event.target.checked,
    }));
  };

  const handleDeleteTag = async tag => {
    await setFilterOptions(previous => ({
      ...previous,
      ["categories"]: without([tag], previous.categories),
    }));

    refetch();
  };

  const handleRemoveStatus = async () => {
    await setFilterOptions(previous => ({
      ...previous,
      ["status"]: DEFAULT_FILTER_OPTIONS.status,
    }));

    refetch();
  };

  const handleBulkUpdate = async status => {
    const filteredSlugs = posts
      .filter(
        post =>
          selectedRowsSlug.includes(post.slug) && post.isPublished !== status
      )
      .map(post => post.slug);

    await bulkUpdate({ slugs: filteredSlugs, status });

    refetch();
  };

  const handleBulkDelete = async () => {
    await bulkDelete(selectedRowsSlug);

    refetch();
  };

  return (
    <>
      <Title titleText={t("titles.myBlogPosts")} />
      <div className="my-4 flex w-full items-center justify-between gap-2">
        {isNotEmpty(selectedRowsSlug) ? (
          <SelectedRowsAction
            {...{
              selectedPostsCount: selectedRowsSlug.length,
              totalPostsCount: posts.length,
              handleBulkUpdate,
              setIsDeleteModalOpen,
            }}
          />
        ) : (
          <ShowSelectedFilters
            {...{
              count: posts?.length,
              isPaneOpen,
              filterOptions,
              handleDeleteTag,
              handleRemoveStatus,
            }}
          />
        )}
        <FilterColumns {...{ visibleColumns, handleToggleVisibleColumns }} />
        <Button
          icon={Filter}
          style="text"
          onClick={() => setIsPaneOpen(true)}
        />
      </div>
      <Table {...{ posts, refetch, visibleColumns, setSelectedRowsSlug }} />
      <Pane
        {...{
          isPaneOpen,
          setIsPaneOpen,
          filterOptions,
          setFilterOptions,
          refetch,
        }}
      />
      <DeleteModal
        {...{
          isDeleteModalOpen,
          setIsDeleteModalOpen,
          handleBulkDelete,
          postsCount: selectedRowsSlug.length,
        }}
      />
    </>
  );
};

export default Index;
