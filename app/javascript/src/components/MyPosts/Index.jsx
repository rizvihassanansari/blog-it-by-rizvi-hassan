import React, { useState } from "react";

import { ActionDropdown, Checkbox, Typography } from "@bigbinary/neetoui";

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
      <div className="my-4 flex w-full items-center justify-between">
        <Typography style="body2" weight="semibold">
          14 Articles
        </Typography>
        <ActionDropdown buttonStyle="secondary" label="Columns">
          <ActionDropdown.Menu>
            <ActionDropdown.MenuItem>
              <Checkbox
                checked
                disabled
                className="neetix-checkbox px-4 py-2"
                label="Title"
              />
            </ActionDropdown.MenuItem>
            <ActionDropdown.MenuItem>
              <Checkbox
                checked={visibleColumns.category}
                className="neetix-checkbox px-4 py-2"
                id="category"
                label="Categories"
                onChange={handleToggleVisibleColumns}
              />
            </ActionDropdown.MenuItem>
            <ActionDropdown.MenuItem>
              <Checkbox
                checked={visibleColumns.updatedAt}
                className="neetix-checkbox px-4 py-2"
                id="updatedAt"
                label="Last Published at"
                onChange={handleToggleVisibleColumns}
              />
            </ActionDropdown.MenuItem>
            <ActionDropdown.MenuItem>
              <Checkbox
                checked={visibleColumns.status}
                className="neetix-checkbox px-4 py-2"
                id="status"
                label="Status"
                onChange={handleToggleVisibleColumns}
              />
            </ActionDropdown.MenuItem>
          </ActionDropdown.Menu>
        </ActionDropdown>
      </div>
      <Table {...{ posts, refetch, visibleColumns }} />
    </>
  );
};

export default Index;
