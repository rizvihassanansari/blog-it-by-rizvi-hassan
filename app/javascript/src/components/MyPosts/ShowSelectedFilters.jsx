import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import CategoryTags from "./Filter/CategoryTags";
import StatusTag from "./Filter/StatusTag";

const ShowSelectedFilters = ({
  count,
  isPaneOpen,
  filterOptions,
  handleDeleteTag,
  handleRemoveStatus,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <Typography style="body2" weight="semibold">
        {`${t("messages.results.resultCount", {
          count,
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
  );
};

export default ShowSelectedFilters;
