import React from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { Dropdown, Button, Typography } from "@bigbinary/neetoui";
import { Trans, useTranslation } from "react-i18next";

const SelectedRowsAction = ({
  selectedPostsCount,
  totalPostsCount,
  handleBulkUpdate,
  setIsDeleteModalOpen,
}) => {
  const { t } = useTranslation();

  const { MenuItem } = Dropdown;

  return (
    <div className="flex items-center gap-2">
      <Trans
        components={{ bold: <b /> }}
        i18nKey="messages.articles.selected"
        values={{ count: selectedPostsCount, total: totalPostsCount }}
      />
      <Dropdown buttonStyle="secondary" label={t("labels.changeStatus")}>
        <MenuItem onClick={() => handleBulkUpdate(false)}>
          <Typography className="px-4 py-2" style="body2">
            {t("labels.draft")}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleBulkUpdate(true)}>
          <Typography className="px-4 py-2" style="body2">
            {t("labels.publish")}
          </Typography>
        </MenuItem>
      </Dropdown>
      <Button
        icon={Delete}
        label={t("labels.delete")}
        style="danger"
        onClick={() => setIsDeleteModalOpen(true)}
      />
    </div>
  );
};

export default SelectedRowsAction;
