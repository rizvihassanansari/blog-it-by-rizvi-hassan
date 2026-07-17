import React, { useState } from "react";

import { Delete, Filter } from "@bigbinary/neeto-icons";
import {
  Dropdown as ActionDropdown,
  Button,
  Typography,
} from "@bigbinary/neetoui";
import { isNotEmpty, without } from "ramda";
import { Trans, useTranslation } from "react-i18next";

import { DEFAULT_FILTER_OPTIONS } from "./constants";
import CategoryTags from "./Filter/CategoryTags";
import FilterColumns from "./Filter/Columns";
import Pane from "./Filter/Pane";
import StatusTag from "./Filter/StatusTag";
import Table from "./Table";

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
          <div className="flex items-center gap-2">
            <Trans
              components={{ bold: <b /> }}
              i18nKey="messages.articles.selected"
              values={{ count: selectedRowsSlug.length, total: posts.length }}
            />
            <ActionDropdown
              buttonStyle="secondary"
              label={t("labels.changeStatus")}
            >
              <ActionDropdown.MenuItem onClick={() => handleBulkUpdate(false)}>
                <Typography className="px-4 py-2" style="body2">
                  {t("labels.draft")}
                </Typography>
              </ActionDropdown.MenuItem>
              <ActionDropdown.MenuItem onClick={() => handleBulkUpdate(true)}>
                <Typography className="px-4 py-2" style="body2">
                  {t("labels.publish")}
                </Typography>
              </ActionDropdown.MenuItem>
            </ActionDropdown>
            <Button
              icon={Delete}
              label={t("labels.delete")}
              style="danger"
              onClick={handleBulkDelete}
            />
          </div>
        ) : (
          <div className="flex">
            <Typography style="body2" weight="semibold">
              {`${t("messages.results.resultCount", {
                count: posts?.length,
              })}`}
              {!isPaneOpen && filterOptions.title !== ""
                ? ` for "${filterOptions.title}"`
                : ""}
            </Typography>
            <CategoryTags
              {...{
                items: filterOptions?.categories,
                handleDeleteTag,
                isHidden: isPaneOpen,
              }}
            />
            <StatusTag
              {...{
                status: filterOptions?.status?.label,
                isHidden: isPaneOpen,
                handleDeleteTag: handleRemoveStatus,
              }}
            />
          </div>
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
    </>
  );
};

export default Index;
