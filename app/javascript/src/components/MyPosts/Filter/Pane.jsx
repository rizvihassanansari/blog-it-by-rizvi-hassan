import React from "react";

import {
  Button,
  Input,
  Pane as NeetoPane,
  Select,
  Typography,
} from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import { useFetchCategories } from "../../../hooks/reactQueries/useCategoriesApi";
import { DEFAULT_FILTER_OPTIONS, DEFAULT_STATUS_OPTIONS } from "../constants";

const Pane = ({
  isPaneOpen,
  setIsPaneOpen,
  filterOptions,
  setFilterOptions,
  refetch: refetchPosts,
}) => {
  const { t } = useTranslation();
  const { data: { categories = [] } = {} } = useFetchCategories();

  const categoryOptions = categories.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const handleSubmit = () => {
    refetchPosts();
    setIsPaneOpen(false);
  };

  const resetFilters = async () => {
    await setFilterOptions(DEFAULT_FILTER_OPTIONS);
    refetchPosts();
    setIsPaneOpen(false);
  };

  return (
    <NeetoPane
      isOpen={isPaneOpen}
      size="small"
      onClose={() => setIsPaneOpen(false)}
    >
      <NeetoPane.Header>
        <Typography style="h2" weight="bold">
          {t("titles.filters")}
        </Typography>
      </NeetoPane.Header>
      <NeetoPane.Body>
        <div className="flex w-full flex-col gap-4">
          <Input
            label={t("labels.title")}
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
            label={t("labels.categories")}
            options={categoryOptions}
            placeholder={t("placeholders.categories")}
            value={filterOptions.categories}
            onChange={values =>
              setFilterOptions(previous => ({
                ...previous,
                ["categories"]: values,
              }))
            }
          />
          <Select
            label={t("labels.status")}
            options={DEFAULT_STATUS_OPTIONS}
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
          label={t("labels.done")}
          onClick={handleSubmit}
        />
        <Button
          className="black-button--secondary"
          label={t("labels.clearFilters")}
          onClick={resetFilters}
        />
      </NeetoPane.Footer>
    </NeetoPane>
  );
};

export default Pane;
