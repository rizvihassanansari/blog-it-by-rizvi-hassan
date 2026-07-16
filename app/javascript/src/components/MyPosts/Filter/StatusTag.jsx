import React from "react";

import { Tag } from "@bigbinary/neetoui";
import { withTranslation } from "react-i18next";

const StatusTag = ({ status, isHidden, handleDeleteTag, t }) => {
  if (isHidden || status === t("labels.both")) {
    return null;
  }

  return (
    <Tag
      className="ml-2"
      label={status}
      style={status === t("labels.draft") ? "danger" : "primary"}
      onClose={handleDeleteTag}
    />
  );
};

export default withTranslation()(StatusTag);
