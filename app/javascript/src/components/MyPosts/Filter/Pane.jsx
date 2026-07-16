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
}) => {
  const { data: { categories = [] } = {} } = useFetchCategories();

  const categoryOptions = categories.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const statusOptions = [
    { label: "Both", value: "both" },
    { label: "Draft", value: "draft" },
    { label: "Unpublished", value: "unpublished" },
  ];

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
                ["title"]: event.target.values,
              }))
            }
          />
          <Select
            isMulti
            label="Categories"
            options={categoryOptions}
            placeholder="Filter categories"
            value={filterOptions.categories}
            onChange={value =>
              setFilterOptions(previous => ({
                ...previous,
                ["categories"]: value,
              }))
            }
          />
          <Select
            className="neetix-select"
            defaultOption={{ label: "Both", value: "both" }}
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
        <Button className="black-button--primary" label="Done" />
        <Button
          className="black-button--secondary"
          label="Cancel"
          onClick={() => setIsPaneOpen(false)}
        />
      </NeetoPane.Footer>
    </NeetoPane>
  );
};

export default Pane;
