import React from "react";

import {
  Button,
  Input,
  Pane as NeetoPane,
  Select,
  Typography,
} from "@bigbinary/neetoui";

import { useFetchCategories } from "../../../hooks/reactQueries/useCategoriesApi";

const Pane = ({
  isPaneOpen,
  setIsPaneOpen,
  filterOptions,
  setFilterOptions,
  refetch: refetchPosts,
}) => {
  const { data: { categories = [] } = {} } = useFetchCategories();

  const categoryOptions = categories.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const statusOptions = [
    { label: "Both", value: null },
    { label: "Draft", value: false },
    { label: "Published", value: true },
  ];

  const handleSubmit = () => {
    refetchPosts();
    setIsPaneOpen(false);
  };

  const resetFilters = () => {
    setFilterOptions({
      title: "",
      categories: [],
      status: { label: "Both", value: null },
    });
  };

  return (
    <NeetoPane
      isOpen={isPaneOpen}
      size="small"
      onClose={() => setIsPaneOpen(false)}
    >
      <NeetoPane.Header>
        <Typography style="h2" weight="bold">
          Filters
        </Typography>
      </NeetoPane.Header>
      <NeetoPane.Body>
        <div className="flex w-full flex-col gap-4">
          <Input
            label="Title"
            type="text"
            value={filterOptions.title}
            onChange={event =>
              setFilterOptions(previous => ({
                ...previous,
                ["title"]: event.target.value,
              }))
            }
          />
          <Select
            isMulti
            label="Categories"
            options={categoryOptions}
            placeholder="Filter categories"
            value={filterOptions.categories}
            onChange={values =>
              setFilterOptions(previous => ({
                ...previous,
                ["categories"]: values,
              }))
            }
          />
          <Select
            label="Status"
            options={statusOptions}
            value={filterOptions.status}
            onChange={value =>
              setFilterOptions(previous => ({
                ...previous,
                ["status"]: value,
              }))
            }
          />
        </div>
      </NeetoPane.Body>
      <NeetoPane.Footer className="flex gap-4">
        <Button
          className="black-button--primary"
          label="Done"
          onClick={handleSubmit}
        />
        <Button
          className="black-button--secondary"
          label="Clear Filters"
          onClick={resetFilters}
        />
      </NeetoPane.Footer>
    </NeetoPane>
  );
};

export default Pane;
